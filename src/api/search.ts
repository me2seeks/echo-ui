import service from '@/utils/request'
import type { ApiResponse } from '@/types'
import type { SearchReq, SearchUsersResp, SearchFeedsResp } from '@/types/search'

//@Summary search users
//@Produce application/json
//@Param keyword query string true "Search keyword"
//@Param page query int32 true "Page number"
//@Param pageSize query int32 true "Page size"
//@Router /search/users [post]
export const searchUsers = (data: SearchReq): Promise<ApiResponse<SearchUsersResp>> => {
  return service({
    url: '/search/users',
    method: 'get',
    params: data,
  })
}

//@Summary search feeds
//@Produce application/json
//@Param keyword query string true "Search keyword"
//@Param page query int32 true "Page number"
//@Param pageSize query int32 true "Page size"
//@Router /search/feeds [post]
export const searchFeeds = (data: SearchReq): Promise<ApiResponse<SearchFeedsResp>> => {
  return service({
    url: '/search/feeds',
    method: 'get',
    params: data,
  })
}
