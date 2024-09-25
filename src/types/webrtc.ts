export interface WSMessage {
  event: string
  payload: RTCSessionDescriptionInit | RTCIceCandidateInit
}
