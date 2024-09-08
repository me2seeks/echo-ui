import service from '@/utils/request'
import type { ApiResponse } from '@/types'
import type { PresignReq, PresignResp } from '@/types/upload'

// upload
//@Summary presign
//@Produce application/json
//@Param body body PresignReq true "presign request"
//@Router /upload/presign [post]
export const presign = (data: PresignReq): Promise<ApiResponse<PresignResp>> => {
  return service({
    url: '/upload/presign',
    method: 'post',
    data,
  })
}
