<script setup lang="ts">
  const GEO_LOC_URL = 'https://raw.githubusercontent.com/pradt2/always-online-stun/master/geoip_cache.txt'
  const IPV4_URL = 'https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_ipv4s.txt'
  const GEO_USER_URL = 'https://geolocation-db.com/json/'

  let pc: RTCPeerConnection
  let closestAddr: string

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

  let log = (msg: string): void => {
    const div = document.getElementById('div')
    if (div) {
      div.innerHTML += msg + '<br>'
    }
  }

  onMounted(async () => {
    await fetchClosestStunServer()
    pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: `stun:${closestAddr}`,
        },
      ],
    })

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const videoElement = document.getElementById('video1') as HTMLVideoElement
        if (videoElement) {
          videoElement.srcObject = stream
        }
        stream.getTracks().forEach((track) => pc.addTrack(track, stream))

        pc.createOffer()
          .then((sd) => pc.setLocalDescription(sd))
          .catch(log)
      })
      .catch(log)

    pc.oniceconnectionstatechange = () => log(pc.iceConnectionState)

    pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
      if (event.candidate === null) {
        const localSessionDescription = document.getElementById('localSessionDescription') as HTMLInputElement
        if (localSessionDescription) {
          localSessionDescription.value = btoa(JSON.stringify(pc.localDescription))
        }
      }
    }
  })

  function startSession() {
    const remoteSessionDescription = document.getElementById('remoteSessionDescription') as HTMLInputElement
    if (remoteSessionDescription) {
      const sd = remoteSessionDescription.value
      if (sd === '') {
        return alert('Session Description must not be empty')
      }

      try {
        pc.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(sd))))
      } catch (err) {
        alert(err)
      }
    }
  }
</script>

<template>
  <video id="video1" width="160" height="120" autoplay muted></video>
  <br />
  Browser base64 Session Description
  <textarea id="localSessionDescription" readonly="true"></textarea>
  <br />
  Golang base64 Session Description:
  <textarea id="remoteSessionDescription"></textarea>
  <br />
  <button @click="startSession">Start Session</button>

  <div id="logs"></div>
</template>
