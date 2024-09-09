export interface Comment {
  id: string
  feedID: string
  userID: string
  content: string
  media0: string
  media1: string
  media2: string
  media3: string
  createTime: number
  isLiked: boolean
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
  commentID: string
  content: string
  media0: string
  media1: string
  media2: string
  media3: string
}

export interface CreateCommentResp {
  id: string
}

export interface DeleteCommentReq {
  id: string
  parentID: string
}

export interface DeleteCommentResp {}
