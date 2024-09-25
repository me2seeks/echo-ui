<script setup lang="ts">
  import { type WSMessage } from '@/types/webrtc'

  const status = ref<string>('未连接')
  const message = ref<WSMessage | null>(null)
  const error = ref<string | null>(null)

  let ws: WebSocket | null = null
  let pc: RTCPeerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: `stun:stun.syncthing.net:3478`,
      },
    ],
  })

  connectWebSocket()
  pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: `stun:stun.syncthing.net:3478`,
      },
    ],
  })

  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      const videoElement = document.querySelector('video') as HTMLVideoElement | null
      if (videoElement) {
        videoElement.srcObject = stream
      } else {
        console.error('视频元素未找到')
      }
      stream.getTracks().forEach((track) => pc.addTrack(track, stream))
    })
    .catch((err) => {
      console.error('获取媒体流失败:', err)
    })

  // pc.addTransceiver('video', { direction: 'sendrecv' })
  // pc.addTransceiver('audio', { direction: 'sendrecv' })

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
      error.value = '创建 offer 失败: ' + err
    })

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
        pc.setRemoteDescription(new RTCSessionDescription(data.payload as RTCSessionDescriptionInit)).catch((err) => {
          error.value = '设置远程描述失败: ' + err
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
  <video id="video1" autoplay muted></video>
  <br />
  <div>error: {{ error }}</div>
</template>
