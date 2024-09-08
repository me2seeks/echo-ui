// type (
// 	PresignReq {
// 		Objects []Object `json:"objects"`
// 	}
// 	PresignResp {
// 		Urls []string `json:"urls"`
// 	}
// )

// type Object {
// 	FileName string `json:"fileName"`
// 	FileType int32  `json:"fileType"`
// }

export interface obj {
  fileName: string
  fileType: fileType
}

export interface PresignReq {
  objects: obj[]
}

export interface PresignResp {
  urls: string[]
}

export enum fileType {
  Avatar,
  FeedImg,
  FeedVideo,
  FeedGIF,
}
