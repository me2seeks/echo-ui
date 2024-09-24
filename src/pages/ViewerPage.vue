<script setup lang="ts">
  import { type WSMessage } from '@/types/webrtc'

  const status = ref<string>('未连接')
  const message = ref<WSMessage | null>(null)
  const error = ref<string | null>(null)
  const msg = ref<string>('')
  let ws: WebSocket | null = null
  const GEO_LOC_URL = 'https://raw.githubusercontent.com/pradt2/always-online-stun/master/geoip_cache.txt'
  const IPV4_URL = 'https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_ipv4s.txt'
  const GEO_USER_URL = 'https://geolocation-db.com/json/'

  let pc: RTCPeerConnection
  let closestAddr: string

  // /* eslint-env browser */

  // let pc = new RTCPeerConnection({
  //   iceServers: [
  //     {
  //       urls: 'stun:stun.l.google.com:19302'
  //     }
  //   ]
  // })
  // var log = msg => {
  //   document.getElementById('logs').innerHTML += msg + '<br>'
  // }

  // navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //   .then(stream => {

  //     document.getElementById('video1').srcObject = stream
  //     stream.getTracks().forEach(track => pc.addTrack(track, stream));

  //     pc.createOffer().then(d => pc.setLocalDescription(d)).catch(log)
  //   }).catch(log)

  // pc.oniceconnectionstatechange = e => log(pc.iceConnectionState)
  // pc.onicecandidate = event => {
  //   if (event.candidate === null) {
  //     document.getElementById('localSessionDescription').value = btoa(JSON.stringify(pc.localDescription))
  //   }
  // }

  // window.startSession = () => {
  //   let sd = document.getElementById('remoteSessionDescription').value
  //   if (sd === '') {
  //     return alert('Session Description must not be empty')
  //   }

  //   try {
  //     pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(sd))))
  //   } catch (e) {
  //     alert(e)
  //   }
  // }

  const connectWebSocket = () => {
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
      // case 'offer':
      //   pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(data.payload)))
      //   pc.createAnswer()
      //     .then((sd: RTCSessionDescriptionInit) => {
      //       pc.setLocalDescription(sd)
      //       ws?.send(JSON.stringify({ event: 'webrtc', payload: sd }))
      //     })
      //     .catch((err) => {
      //       error.value = '创建应答失败: ' + err
      //     })
      //   break
      // case 'answer':
      //   pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(data.payload)))
      //   break
      // case 'candidate':
      //   pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.payload)))
      //   break
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

    pc.oniceconnectionstatechange = (): void => console.log(pc.iceConnectionState)
    pc.onicegatheringstatechange = () => {
      msg.value = pc.iceGatheringState
      if (pc.iceGatheringState === 'complete') {
        // 当ICE收集完成时，可以安全地访问localDescription
        console.log('ICE gathering complete')
        msg.value = btoa(JSON.stringify(pc.localDescription))
        if (ws && ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ event: 'webrtc', payload: pc.localDescription }))
        }
      }
    }
    pc.onicecandidate = (event: RTCPeerConnectionIceEvent): void => {
      if (event.candidate) {
        console.log('ICE Candidate:', event.candidate)
        if (ws && ws.readyState === ws.OPEN) {
          ws.send(JSON.stringify({ event: 'candidate', payload: event.candidate }))
        }
      } else {
        console.log('All ICE candidates have been sent')
      }
    }

    try {
      const offer = await pc.createOffer()
      await pc.setLocalDescription(offer)
      console.log('Offer created and set as local description:', offer)
    } catch (error) {
      console.error('Error creating or setting offer:', error)
    }
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
</script>

<template>
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <p>状态: {{ status }}</p>
      <p>消息: {{ message }}</p>
      <p>消息内容: {{ msg }}</p>
      <button @click="startSession">建立连接</button>
    </div>
  </div>
</template>
