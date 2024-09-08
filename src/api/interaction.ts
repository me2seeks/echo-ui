import type {
  CreateCommentLikeReq,
  CreateCommentLikeResp,
  CreateFeedLikeReq,
  CreateFeedLikeResp,
  DeleteCommentLikeReq,
  DeleteCommentLikeResp,
  DeleteFeedLikeReq,
  DeleteFeedLikeResp,
} from '@/types/interaction'
import service from '@/utils/request'
import type { ApiResponse } from '@/types'

//@Summary like
//@Produce application/json
//@Param body body CreateFeedLikeReq true "feed id"
//@Router /interaction/feed/like [post]
export const likeFeed = (data: CreateFeedLikeReq): Promise<ApiResponse<CreateFeedLikeResp>> => {
  return service({
    url: '/interaction/feed/like',
    method: 'post',
    data,
  })
}

//@Summary unlike
//@Produce application/json
//@Param body body DeleteFeedLikeReq true "feed id"
//@Router /interaction/feed/like [delete]
export const unlikeFeed = (data: DeleteFeedLikeReq): Promise<ApiResponse<DeleteFeedLikeResp>> => {
  return service({
    url: '/interaction/feed/like',
    method: 'delete',
    data,
  })
}

//@Summary like
//@Produce application/json
//@Param body body CreateCommentLikeReq true "comment id"
//@Router /interaction/comment/like [post]
export const likeComment = (data: CreateCommentLikeReq): Promise<ApiResponse<CreateCommentLikeResp>> => {
  return service({
    url: '/interaction/comment/like',
    method: 'post',
    data,
  })
}

//@Summary unlike
//@Produce application/json
//@Param body body DeleteCommentLikeReq true "comment id"
//@Router /interaction/comment/like [delete]
export const unlikeComment = (data: DeleteCommentLikeReq): Promise<ApiResponse<DeleteCommentLikeResp>> => {
  return service({
    url: '/interaction/comment/like',
    method: 'delete',
    data,
  })
}

// {
//     "swagger": "2.0",
//     "info": {
//       "title": "",
//       "version": ""
//     },
//     "schemes": [
//       "http",
//       "https"
//     ],
//     "consumes": [
//       "application/json"
//     ],
//     "produces": [
//       "application/json"
//     ],
//     "paths": {
//       "/interaction/comment/like": {
//         "delete": {
//           "summary": "unlike",
//           "operationId": "unlike",
//           "responses": {
//             "200": {
//               "description": "A successful response.",
//               "schema": {
//                 "$ref": "#/definitions/DeleteCommentLikeResp"
//               }
//             }
//           },
//           "parameters": [
//             {
//               "name": "body",
//               "in": "body",
//               "required": true,
//               "schema": {
//                 "$ref": "#/definitions/DeleteCommentLikeReq"
//               }
//             }
//           ],
//           "tags": [
//             "comment"
//           ],
//           "security": [
//             {
//               "apiKey": []
//             }
//           ]
//         },
//         "post": {
//           "summary": "like",
//           "operationId": "like",
//           "responses": {
//             "200": {
//               "description": "A successful response.",
//               "schema": {
//                 "$ref": "#/definitions/CreateCommentLikeResp"
//               }
//             }
//           },
//           "parameters": [
//             {
//               "name": "body",
//               "in": "body",
//               "required": true,
//               "schema": {
//                 "$ref": "#/definitions/CreateCommentLikeReq"
//               }
//             }
//           ],
//           "tags": [
//             "comment"
//           ],
//           "security": [
//             {
//               "apiKey": []
//             }
//           ]
//         }
//       },
//       "/interaction/feed/like": {
//         "delete": {
//           "summary": "unlike",
//           "operationId": "unlike",
//           "responses": {
//             "200": {
//               "description": "A successful response.",
//               "schema": {
//                 "$ref": "#/definitions/DeleteFeedLikeResp"
//               }
//             }
//           },
//           "parameters": [
//             {
//               "name": "body",
//               "in": "body",
//               "required": true,
//               "schema": {
//                 "$ref": "#/definitions/DeleteFeedLikeReq"
//               }
//             }
//           ],
//           "tags": [
//             "feed"
//           ],
//           "security": [
//             {
//               "apiKey": []
//             }
//           ]
//         },
//         "post": {
//           "summary": "like",
//           "operationId": "like",
//           "responses": {
//             "200": {
//               "description": "A successful response.",
//               "schema": {
//                 "$ref": "#/definitions/CreateFeedLikeResp"
//               }
//             }
//           },
//           "parameters": [
//             {
//               "name": "body",
//               "in": "body",
//               "required": true,
//               "schema": {
//                 "$ref": "#/definitions/CreateFeedLikeReq"
//               }
//             }
//           ],
//           "tags": [
//             "feed"
//           ],
//           "security": [
//             {
//               "apiKey": []
//             }
//           ]
//         }
//       }
//     },
//     "definitions": {
//       "CreateCommentLikeReq": {
//         "type": "object",
//         "properties": {
//           "id": {
//             "type": "integer",
//             "format": "int64"
//           }
//         },
//         "title": "CreateCommentLikeReq",
//         "required": [
//           "id"
//         ]
//       },
//       "CreateCommentLikeResp": {
//         "type": "object",
//         "title": "CreateCommentLikeResp"
//       },
//       "CreateFeedLikeReq": {
//         "type": "object",
//         "properties": {
//           "id": {
//             "type": "integer",
//             "format": "int64"
//           }
//         },
//         "title": "CreateFeedLikeReq",
//         "required": [
//           "id"
//         ]
//       },
//       "CreateFeedLikeResp": {
//         "type": "object",
//         "title": "CreateFeedLikeResp"
//       },
//       "DeleteCommentLikeReq": {
//         "type": "object",
//         "properties": {
//           "id": {
//             "type": "integer",
//             "format": "int64"
//           }
//         },
//         "title": "DeleteCommentLikeReq",
//         "required": [
//           "id"
//         ]
//       },
//       "DeleteCommentLikeResp": {
//         "type": "object",
//         "title": "DeleteCommentLikeResp"
//       },
//       "DeleteFeedLikeReq": {
//         "type": "object",
//         "properties": {
//           "id": {
//             "type": "integer",
//             "format": "int64"
//           }
//         },
//         "title": "DeleteFeedLikeReq",
//         "required": [
//           "id"
//         ]
//       },
//       "DeleteFeedLikeResp": {
//         "type": "object",
//         "title": "DeleteFeedLikeResp"
//       }
//     },
//     "securityDefinitions": {
//       "apiKey": {
//         "type": "apiKey",
//         "description": "Enter JWT Bearer token **_only_**",
//         "name": "Authorization",
//         "in": "header"
//       }
//     }
//   }
