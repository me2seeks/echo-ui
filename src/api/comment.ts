import service from '@/utils/request'
import type { ApiResponse } from '@/types'

import type {
  CreateCommentReq,
  CreateCommentResp,
  DeleteCommentReq,
  DeleteCommentResp,
  GetCommentByIDResp,
  GetCommentsByPageReq,
  GetCommentsByPageResp,
} from '@/types/comment'

//@Summary create comment
//@Produce application/json
//@Param body body CreateCommentReq true "Comment content"
//@Router /comment/ [post]
export const create = (data: CreateCommentReq): Promise<ApiResponse<CreateCommentResp>> => {
  return service({
    url: '/comment/',
    method: 'post',
    data,
  })
}

//@Summary delete comment
//@Produce application/json
//@Param body body DeleteCommentReq true "Comment ID"
//@Router /comment/ [delete]
export const del = (data: DeleteCommentReq): Promise<ApiResponse<DeleteCommentResp>> => {
  return service({
    url: '/comment/',
    method: 'delete',
    data,
  })
}

//@Summary get comment list by page
//@Produce application/json
//@Param commentID path string true "Comment ID"
//@Param page query int32 true "Page number"
//@Param page_size query int32 true "Page size"
//@Router /comments/{commentID} [get]
export const list = (commentID: string, data: GetCommentsByPageReq): Promise<ApiResponse<GetCommentsByPageResp>> => {
  return service({
    url: `/comments/${commentID}`,
    method: 'get',
    params: data,
  })
}

//@Summary get comment by ID
//@Produce application/json
//@Param commentID path string true "Comment ID"
//@Router /comment/{commentID} [get]
export const getCommentByID = (commentID: string): Promise<ApiResponse<GetCommentByIDResp>> => {
  return service({
    url: `/comment/${commentID}`,
    method: 'get',
  })
}
