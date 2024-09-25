<script setup lang="ts">
  import { type WSMessage } from '@/types/webrtc'

  const GEO_LOC_URL = 'https://raw.githubusercontent.com/pradt2/always-online-stun/master/geoip_cache.txt'
  const IPV4_URL = 'https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_ipv4s.txt'
  const GEO_USER_URL = 'https://geolocation-db.com/json/'

  const status = ref<string>('未连接')
  const message = ref<WSMessage | null>(null)
  const error = ref<string | null>(null)
  const msg = ref<string>('')
  let ws: WebSocket | null = null
  const PcStatus = ref<string>('未连接')

  let pc: RTCPeerConnection
  let closestAddr: string

  onMounted(async () => {
    connectWebSocket()
    await fetchClosestStunServer()
    pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: `stun:${closestAddr}`,
        },
      ],
    })

    pc.ontrack = function (event: RTCTrackEvent): void {
      const el = document.createElement(event.track.kind) as HTMLMediaElement
      el.srcObject = event.streams[0]
      el.autoplay = true
      el.controls = true

      const remoteVideos = document.getElementById('remoteVideos')
      if (remoteVideos) {
        remoteVideos.appendChild(el)
      }
    }

    pc.addTransceiver('video', { direction: 'sendrecv' })
    pc.addTransceiver('audio', { direction: 'sendrecv' })

    pc.onconnectionstatechange = (): void => console.log(pc.connectionState)
    pc.onicecandidate = (event: RTCPeerConnectionIceEvent): void => {
      if (event.candidate === null && ws && ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify({ event: 'webrtc', payload: pc.localDescription }))
      }
    }

    pc.createOffer()
      .then((sdp) => pc.setLocalDescription(sdp))
      .catch((err) => {
        error.value = '创建 offer 失败: ' + err
      })
  })

  async function startSession() {
    console.log(pc.iceGatheringState)
    console.log(pc.iceConnectionState)
    console.log(pc)
    if (ws && pc.iceGatheringState === 'complete') {
      ws.send(JSON.stringify({ event: 'webrtc', payload: pc.localDescription }))
    }
  }

  onBeforeUnmount(() => {
    if (ws) {
      ws.close()
    }
  })

  function connectWebSocket() {
    ws = new WebSocket('ws://localhost:8080/ws/viewer')

    ws.onopen = () => {
      status.value = '已连接'
    }

    ws.onmessage = (event) => {
      try {
        const data: WSMessage = JSON.parse(event.data)
        message.value = data
        handleMessage(data)
      } catch (err) {
        error.value = '消息解析错误: ' + (err as Error).message
      }
    }

    ws.onerror = (event) => {
      error.value = 'WebSocket 错误: ' + (event as ErrorEvent).message
    }

    ws.onclose = () => {
      status.value = '连接已关闭'
    }
  }

  const handleMessage = (data: WSMessage) => {
    switch (data.event) {
      case 'webrtc':
        console.log('webrtc', data.payload)
        pc.setRemoteDescription(new RTCSessionDescription(data.payload as RTCSessionDescriptionInit))
        break
      case 'candidate':
        pc.addIceCandidate(new RTCIceCandidate(data.payload as RTCIceCandidateInit))
        break
      default:
        console.log('未知事件:', data.event)
    }
  }

  async function fetchClosestStunServer() {
    const geoLocs: Record<string, [number, number]> = await (await fetch(GEO_LOC_URL)).json()
    const { latitude, longitude }: { latitude: number; longitude: number } = await (await fetch(GEO_USER_URL)).json()
    const ipv4Text: string = await (await fetch(IPV4_URL)).text()
    closestAddr = ipv4Text
      .trim()
      .split('\n')
      .map((addr) => {
        const geoLoc = geoLocs[addr.split(':')[0]]
        if (!geoLoc) return [addr, Infinity] as [string, number] // 如果 geoLoc 不存在，返回一个无限大的距离
        const [stunLat, stunLon] = geoLoc
        const dist = Math.sqrt((latitude - stunLat) ** 2 + (longitude - stunLon) ** 2)
        return [addr, dist] as [string, number]
      })
      .reduce(([addrA, distA], [addrB, distB]) => (distA <= distB ? [addrA, distA] : [addrB, distB]))[0]
  }
</script>

<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <p>状态: {{ status }}</p>
      <p>消息: {{ message }}</p>
      <p>消息内容: {{ msg }}</p>
      <p>{{ PcStatus }}</p>
      <button @click="startSession">建立连接</button>
    </div>
    Video
    <br />
    <div id="remoteVideos"></div>
    <br />
  </div>
</template>
