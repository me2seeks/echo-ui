<script setup lang="ts">
  import { type WSMessage } from '@/types/webrtc'

  const status = ref<string>('未连接')
  const message = ref<WSMessage | null>(null)
  const msg = ref<string>('')
  let ws: WebSocket | null = null

  let pc: RTCPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: `stun:stun.syncthing.net:3478`,
      },
    ],
  })

  connectWebSocket()
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

  pc.ondatachannel = (event: RTCDataChannelEvent): void => {
    console.log('Data Channel:', event.channel)
  }

  pc.onconnectionstatechange = (): void => {
    console.log('Connection State:', pc.connectionState)
  }

  pc.oniceconnectionstatechange = (): void => {
    console.log('ICE Connection State:', pc.iceConnectionState)
  }

  pc.onicecandidateerror = (event: RTCPeerConnectionIceErrorEvent): void => {
    console.error('ICE 候选者错误:', event.errorText)
  }

  pc.onicecandidate = (event: RTCPeerConnectionIceEvent): void => {
    if (event.candidate === null && ws && ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ event: 'webrtc', payload: pc.localDescription }))
    }
  }

  pc.createOffer()
    .then((sdp) => pc.setLocalDescription(sdp))
    .catch((err) => {
      console.error('创建 Offer 失败:', err)
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
        console.error('消息解析错误:', err)
      }
    }

    ws.onerror = (event) => {
      console.error('WebSocket 错误:', (event as ErrorEvent).message)
    }

    ws.onclose = () => {
      status.value = '连接已关闭'
    }
  }

  const handleMessage = (data: WSMessage) => {
    msg.value = JSON.stringify(data)
    switch (data.event) {
      case 'webrtc':
        console.log('webrtc', data.payload)
        pc.setRemoteDescription(new RTCSessionDescription(data.payload as RTCSessionDescriptionInit)).catch((err) => {
          console.error('设置远程描述失败:', err)
        })
        break
      case 'candidate':
        pc.addIceCandidate(new RTCIceCandidate(data.payload as RTCIceCandidateInit))
        break
      default:
        console.log('未知事件:', data.event)
    }
  }
</script>

<template>
  <div>
    <div>
      <p>状态: {{ status }}</p>
      <p>消息: {{ message }}</p>
      <p>消息内容: {{ msg }}</p>
      <button @click="startSession">建立连接</button>
    </div>
    Video
    <br />
    <div id="remoteVideos"></div>
    <br />
  </div>
</template>
