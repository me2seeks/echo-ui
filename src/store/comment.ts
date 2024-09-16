/* eslint-disable security/detect-object-injection */
import { listComment } from '@/api/feed'
import { list, getCommentByID } from '@/api/comment'
import { getCommentCounter } from '@/api/counter'
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '@/store/user'

export interface Comment {
  id: string
  content: string
  userID: string
  media0: string
  media1: string
  media2: string
  media3: string
  createTime: string
  // count
  likeCount: number
  commentCount: number
  viewCount: number
  isLiked: boolean
}

interface Page {
  page: number
  pageSize: number
  total: number
  len: number
}

export const useCommentStore = defineStore('comment', () => {
  const commentMap: Ref<Map<string, Comment[]>> = ref(new Map())
  const commentPage: Map<string, Page> = new Map()
  const commentCommentMap: Ref<Map<string, Comment[]>> = ref(new Map())
  const commentCommentPage: Map<string, Page> = new Map()
  const userMapStore = useUserStore()

  const Get = async (commentID: string) => {
    const res = await getCommentByID(commentID)
    const comment = res.data.comment
    const counter = await getCommentCounter(comment.id)
    const formattedTime = computed(() => {
      return formatDistanceToNow(new Date(comment.createTime), { addSuffix: true })
    })
    await userMapStore.Set(comment.userID)
    return {
      ...comment,
      createTime: formattedTime.value,
      likeCount: counter.data.likeCount,
      commentCount: counter.data.commentCount,
      viewCount: counter.data.viewCount,
    }
  }

  const FetchCommentComments = async (commentID: string) => {
    if (commentCommentMap.value.has(commentID)) {
      const pageInfo = commentCommentPage.get(commentID)!

      if (pageInfo.len >= pageInfo.total) {
        return
      }
      await fetchCommentComments(commentID, pageInfo).then(() => {
        pageInfo.page += 1
      })
    } else {
      const pageInfo = { page: 1, pageSize: 2, total: 999, len: 0 }
      commentCommentPage.set(commentID, pageInfo)
      await fetchCommentComments(commentID, pageInfo).then(() => {
        pageInfo.page += 1
      })
    }
  }

  const fetchCommentComments = async (commentID: string, pageInfo: Page) => {
    const res = await list(commentID, pageInfo)

    if (Array.isArray(res.data.comments)) {
      const comments = res.data.comments.map((comment: any) => ({
        ...comment,
        createTime: new Date(comment.createTime * 1000),
      }))
      const detailedComments = await Promise.all(
        comments.map(async (comment: Comment) => {
          const counter = await getCommentCounter(comment.id)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(comment.createTime), { addSuffix: true })
          })
          await userMapStore.Set(comment.userID)
          return {
            ...comment,
            createTime: formattedTime.value,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      pageInfo.len += detailedComments.length
      pageInfo.total = res.data.total
      if (pageInfo.page > 1) {
        commentCommentMap.value.get(commentID)?.push(...detailedComments)
      } else {
        commentCommentMap.value.set(commentID, detailedComments)
      }
    }
  }

  const FetchComments = async (feedID: string) => {
    if (commentMap.value.has(feedID)) {
      const pageInfo = commentPage.get(feedID)!

      if (pageInfo.len >= pageInfo.total) {
        return
      }
      await fetchComments(feedID, pageInfo).then(() => {
        pageInfo.page += 1
      })
    } else {
      const pageInfo = { page: 1, pageSize: 2, total: 999, len: 0 }
      commentPage.set(feedID, pageInfo)
      await fetchComments(feedID, pageInfo).then(() => {
        pageInfo.page += 1
      })
    }
  }

  const fetchComments = async (feedID: string, pageInfo: Page) => {
    const res = await listComment(feedID, pageInfo)

    if (Array.isArray(res.data.comments)) {
      const comments = res.data.comments.map((comment: any) => ({
        ...comment,
        createTime: new Date(comment.createTime * 1000),
      }))
      const detailedComments = await Promise.all(
        comments.map(async (comment: Comment) => {
          const counter = await getCommentCounter(comment.id)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(comment.createTime), { addSuffix: true })
          })
          await userMapStore.Set(comment.userID)
          return {
            ...comment,
            createTime: formattedTime.value,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      pageInfo.len += detailedComments.length
      pageInfo.total = res.data.total
      if (pageInfo.page > 1) {
        commentMap.value.get(feedID)?.push(...detailedComments)
      } else {
        commentMap.value.set(feedID, detailedComments)
      }
    }
  }

  const GetCommentsByFeedID = (feedID: string) => {
    return computed(() => commentMap.value.get(feedID) || [])
  }

  const GetCommentCommentsByCommentID = (commentID: string) => {
    return computed(() => commentCommentMap.value.get(commentID) || [])
  }

  return {
    commentMap,
    commentCommentMap,
    Get,
    FetchComments,
    FetchCommentComments,
    GetCommentsByFeedID,
    GetCommentCommentsByCommentID,
  }
})
