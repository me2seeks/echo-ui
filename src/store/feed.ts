import { listFollowingFeed } from '@/api/feed'
import { getFeedCounter } from '@/api/counter'
import { detail } from '@/api/user'
import { formatDistanceToNow } from 'date-fns'
interface Feed {
  id: string
  content: string
  userID: string
  nickname: string
  handle: string
  avatar: string
  bio: string
  media0: string
  media1: string
  media2: string
  media3: string
  createTime: string
  likeCount: number
  commentCount: number
  viewCount: number
}

export const useFeedStore = defineStore('feed', () => {
  const followingFeeds: Ref<Feed[]> = ref([])
  const total: Ref<number> = ref(0)
  const page: Ref<number> = ref(1)
  const pageSize: Ref<number> = ref(10)

  const getFollowingFeeds = async () => {
    const res = await listFollowingFeed({
      page: page.value,
      pageSize: pageSize.value,
    })
    if (Array.isArray(res.data.feed)) {
      const feeds = res.data.feed.map((feed: any) => ({
        ...feed,
        createTime: new Date(feed.createTime * 1000),
      }))
      const detailedFeeds = await Promise.all(
        feeds.map(async (feed: Feed) => {
          const counter = await getFeedCounter(feed.id)
          const user = await detail(feed.userID)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(feed.createTime), { addSuffix: true })
          })
          return {
            ...feed,
            createTime: formattedTime.value,
            nickname: user.data.userInfo.nickname,
            handle: user.data.userInfo.handle,
            avatar: user.data.userInfo.avatar,
            bio: user.data.userInfo.bio,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      followingFeeds.value.push(...detailedFeeds)
    } else {
      console.error('Unexpected response format:', res.data)
    }
    total.value = res.data.total
  }

  return {
    followingFeeds,
    total,
    page,
    pageSize,
    getFollowingFeeds,
  }
})
