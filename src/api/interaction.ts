import type {
  CreateCommentLikeResp,
  CreateFeedLikeResp,
  DeleteCommentLikeResp,
  DeleteFeedLikeResp,
} from '@/types/interaction'
import service from '@/utils/request'
import type { ApiResponse } from '@/types'

//@Summary like
//@Produce application/json
//@Param body body CreateFeedLikeReq true "feed id"
//@Router /interaction/feed/like [post]
export const likeFeed = (id: string): Promise<ApiResponse<CreateFeedLikeResp>> => {
  return service({
    url: `/interaction/feed/${id}/like`,
    method: 'post',
  })
}

//@Summary unlike
//@Produce application/json
//@Param body body DeleteFeedLikeReq true "feed id"
//@Router /interaction/feed/like [delete]
export const unlikeFeed = (id: string): Promise<ApiResponse<DeleteFeedLikeResp>> => {
  return service({
    url: `/interaction/feed/${id}/like`,
    method: 'delete',
  })
}

//@Summary like
//@Produce application/json
//@Param body body CreateCommentLikeReq true "comment id"
//@Router /interaction/comment/like [post]
export const likeComment = (id: string): Promise<ApiResponse<CreateCommentLikeResp>> => {
  return service({
    url: `/interaction/comment/${id}/like`,
    method: 'post',
  })
}

//@Summary unlike
//@Produce application/json
//@Param body body DeleteCommentLikeReq true "comment id"
//@Router /interaction/comment/like [delete]
export const unlikeComment = (id: string): Promise<ApiResponse<DeleteCommentLikeResp>> => {
  return service({
    url: `/interaction/comment/${id}/like`,
    method: 'delete',
  })
}
