/* eslint-disable security/detect-object-injection */
import { listComment } from '@/api/feed'
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
}

export const useCommentStore = defineStore('comment', () => {
  const commentMap: Ref<Map<string, Comment[]>> = ref(new Map())
  const commentPage: Map<string, Page> = new Map()
  const userMapStore = useUserStore()

  const Get = async (feedID: string) => {
    if (commentMap.value.has(feedID)) {
      const detailedComments = await fetchComments(feedID, commentPage.get(feedID)!)
      commentMap.value.get(feedID)?.push(...detailedComments)
      commentPage.get(feedID)!.page += 1
    } else {
      const pageInfo = { page: 1, pageSize: 2, total: 999 }
      commentPage.set(feedID, pageInfo)
      const detailedComments = await fetchComments(feedID, pageInfo)
      commentMap.value.set(feedID, detailedComments)
      pageInfo.page += 1
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
      return detailedComments
    }
    return []
  }

  return {
    commentMap,
    Get,
  }
})
