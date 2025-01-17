import service from '@/utils/request'
import type { ApiResponse } from '@/types'
import type {
  GetFeedsByPageReq,
  GetFeedsByPageResp,
  GetFeedCommentsByPageReq,
  GetFeedCommentsByPageResp,
  CreateFeedReq,
  CreateFeedResp,
  DeleteFeedReq,
  DeleteFeedResp,
  CreateFeedCommentReq,
  CreateFeedCommentResp,
  GetFollowingFeedsByPageReq,
  GetFollowingFeedsByPageResp,
  GetFeedByIDResp,
} from '@/types/feed'

//@Summary get feed list by page
//@Produce application/json
//@Param userID path string true "User ID"
//@Param page query int32 true "Page number"
//@Param pageSize query int32 true "Page size"
//@Router /feed/{userID} [get]
export const listFeedByUserID = (userID: string, data: GetFeedsByPageReq): Promise<ApiResponse<GetFeedsByPageResp>> => {
  return service({
    url: `/feeds/${userID}`,
    method: 'get',
    params: data,
  })
}

//@Summary get comment list by page
//@Produce application/json
//@Param feedID path string true "Feed ID"
//@Param page query int32 true "Page number"
//@Param pageSize query int32 true "Page size"
//@Router /feed/{feedID}/comment [get]
export const listComment = (
  feedID: string,
  data: GetFeedCommentsByPageReq
): Promise<ApiResponse<GetFeedCommentsByPageResp>> => {
  return service({
    url: `/feed/${feedID}/comment`,
    method: 'get',
    params: data,
  })
}

//@Summary create feed
//@Produce application/json
//@Param body body CreateFeedReq true "Feed content"
//@Router /feed/ [post]
export const create = (data: CreateFeedReq): Promise<ApiResponse<CreateFeedResp>> => {
  return service({
    url: '/feed/',
    method: 'post',
    data,
  })
}

//@Summary delete feed
//@Produce application/json
//@Param body body DeleteFeedReq true "Feed ID"
//@Router /feed/ [delete]
export const del = (data: DeleteFeedReq): Promise<ApiResponse<DeleteFeedResp>> => {
  return service({
    url: '/feed/',
    method: 'delete',
    data,
  })
}

//@Summary create feed comment
//@Produce application/json
//@Param feedID path string true "Feed ID"
//@Param body body CreateFeedCommentReq true "Feed comment content"
//@Router /feed/{feedID}/comment [post]
export const createComment = (
  feedID: string,
  data: CreateFeedCommentReq
): Promise<ApiResponse<CreateFeedCommentResp>> => {
  return service({
    url: `/feed/${feedID}/comment`,
    method: 'post',
    data,
  })
}

//@Summary get following feed list by page
//@Produce application/json
//@Param page query int32 true "Page number"
//@Param pageSize query int32 true "Page size"
//@Router /feed/following [get]
export const listFollowingFeed = (
  data: GetFollowingFeedsByPageReq
): Promise<ApiResponse<GetFollowingFeedsByPageResp>> => {
  return service({
    url: '/feed/following',
    method: 'get',
    params: data,
  })
}

// @Summary get feed list by page
// @Produce application/json
// @Param page query int32 true "Page number"
// @Param pageSize query int32 true "Page size"
// @Router /feed/ [get]
export const listFeed = (data: GetFeedsByPageReq): Promise<ApiResponse<GetFeedsByPageResp>> => {
  return service({
    url: '/feeds/',
    method: 'get',
    params: data,
  })
}

//@Summary get feed by feedID
//@Produce application/json
//@Param feedID path string true "Feed ID"
//@Router /feed/{feedID} [get]
export const getFeedByID = (feedID: string): Promise<ApiResponse<GetFeedByIDResp>> => {
  return service({
    url: `/feed/${feedID}`,
    method: 'get',
  })
}
