import { listFollowingFeed, listFeed } from '@/api/feed'
import { getFeedCounter } from '@/api/counter'
import { formatDistanceToNow } from 'date-fns'
import { useUserListStore } from '@/store/userList'

export interface Feed {
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

export const useFeedStore = defineStore('feed', () => {
  const followingFeeds: Ref<Feed[]> = ref([])
  const followingFeedsPage: Ref<number> = ref(0)
  const followingFeedsPageSize: Ref<number> = ref(2)
  const followingFeedsTotal: Ref<number> = ref(999)

  const feeds: Ref<Feed[]> = ref([])
  const feedsPage: Ref<number> = ref(0)
  const feedsPageSize: Ref<number> = ref(2)
  const feedsTotal: Ref<number> = ref(999)

  const feedLength = computed(() => feeds.value.length)
  const followingFeedLength = computed(() => followingFeeds.value.length)

  const userListStore = useUserListStore()

  const GetFeeds = async () => {
    console.log('feeds:', feedLength.value, feedsTotal.value)
    if (feeds.value.length >= feedsTotal.value) {
      console.log('No more feeds to fetch')
      return
    }
    const res = await listFeed({
      page: feedsPage.value,
      pageSize: feedsPageSize.value,
    })
    feedsTotal.value = res.data.total
    if (Array.isArray(res.data.feed)) {
      const feedList = res.data.feed.map((feed: any) => ({
        ...feed,
        createTime: new Date(feed.createTime * 1000),
      }))
      const detailedFeeds = await Promise.all(
        feedList.map(async (feed: Feed) => {
          const counter = await getFeedCounter(feed.id)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(feed.createTime), { addSuffix: true })
          })
          await userListStore.Set(feed.userID)
          return {
            ...feed,
            createTime: formattedTime.value,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      feeds.value.push(...detailedFeeds)
      feedsPage.value++
    } else {
      console.error('Unexpected response format:', res.data)
    }
  }

  const GetFollowingFeeds = async () => {
    console.log('followingFeeds:', followingFeedLength.value, followingFeedsTotal.value)
    if (followingFeeds.value.length >= followingFeedsTotal.value) {
      console.log('No more following feeds to fetch')
      return
    }
    const res = await listFollowingFeed({
      page: followingFeedsPage.value,
      pageSize: followingFeedsPageSize.value,
    })
    followingFeedsTotal.value = res.data.total
    if (Array.isArray(res.data.feed)) {
      const feeds = res.data.feed.map((feed: any) => ({
        ...feed,
        createTime: new Date(feed.createTime * 1000),
      }))
      const detailedFeeds = await Promise.all(
        feeds.map(async (feed: Feed) => {
          const counter = await getFeedCounter(feed.id)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(feed.createTime), { addSuffix: true })
          })
          await userListStore.Set(feed.userID)
          return {
            ...feed,
            createTime: formattedTime.value,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      followingFeeds.value.push(...detailedFeeds)
      followingFeedsPage.value++
    } else {
      console.error('Unexpected response format:', res.data)
    }
  }

  return {
    followingFeeds,
    feeds,
    followingFeedsPage,
    followingFeedsPageSize,
    followingFeedsTotal,
    feedsPage,
    feedsPageSize,
    feedsTotal,

    feedLength,
    GetFollowingFeeds,
    GetFeeds,
  }
})
