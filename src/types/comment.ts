export interface Comment {
  id: number
  feedID: number
  userID: number
  content: string
  media0: string
  media1: string
  media2: string
  media3: string
  createTime: number
}

export interface GetCommentsByPageReq {
  page: number
  pageSize: number
}

export interface GetCommentsByPageResp {
  comments: Comment[]
  total: number
}

export interface CreateCommentReq {
  commentID: number
  content: string
  media0: string
  media1: string
  media2: string
  media3: string
}

export interface CreateCommentResp {
  id: number
}

export interface DeleteCommentReq {
  id: number
  parentID: number
}

export interface DeleteCommentResp {}
