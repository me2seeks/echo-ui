import service from '@/utils/request'
import type { GetContentCounterResp, GetUserCounterResp } from '@/types/counter'

//@Summary get comment counter
//@Produce application/json
//@Param id path string true "Comment ID"
//@Router /counter/comment/{id} [get]
export const getCommentCounter = (id: string): Promise<GetContentCounterResp> => {
  return service({
    url: `/counter/comment/${id}`,
    method: 'get',
  })
}

//@Summary get feed counter
//@Produce application/json
//@Param id path string true "Feed ID"
//@Router /counter/feed/{id} [get]
export const getFeedCounter = (id: string): Promise<GetContentCounterResp> => {
  return service({
    url: `/counter/feed/${id}`,
    method: 'get',
  })
}

//@Summary get user counter
//@Produce application/json
//@Param id path string true "User ID"
//@Router /counter/user/{id} [get]
export const getUserCounter = (id: string): Promise<GetUserCounterResp> => {
  return service({
    url: `/counter/user/${id}`,
    method: 'get',
  })
}
