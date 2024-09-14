import { listFollowingFeed, listFeed, getFeedByID } from '@/api/feed'
import { getFeedCounter } from '@/api/counter'
import { formatDistanceToNow } from 'date-fns'
import { useUserStore } from '@/store/user'

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

  type: 'recommended' | 'followed'
}

export const useFeedStore = defineStore('feed', () => {
  const followingFeedsPage: Ref<number> = ref(1)
  const followingFeedsPageSize: Ref<number> = ref(1)
  const followingFeedsTotal: Ref<number> = ref(999)

  const feeds: Ref<Feed[]> = ref([])
  const feedsPage: Ref<number> = ref(1)
  const feedsPageSize: Ref<number> = ref(1)
  const feedsTotal: Ref<number> = ref(999)

  const feedLength: Ref<number> = ref(0)
  const followingFeedLength: Ref<number> = ref(0)

  const userStore = useUserStore()

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
    if (Array.isArray(res.data.feed)) {
      let detailedFeeds = res.data.feed.map((feed: any) => ({
        ...feed,
        type: 'recommended',
        createTime: new Date(feed.createTime * 1000),
      }))
      detailedFeeds = await Promise.all(
        detailedFeeds.map(async (feed: Feed) => {
          const counter = await getFeedCounter(feed.id)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(feed.createTime), { addSuffix: true })
          })
          await userStore.Set(feed.userID)
          return {
            ...feed,
            createTime: formattedTime.value,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      feedLength.value += detailedFeeds.length
      feeds.value.push(...detailedFeeds)
      feeds.value.sort((feedA, feedB) => feedB.id.localeCompare(feedA.id))
      feedsTotal.value = res.data.total
      feedsPage.value++
    } else {
      console.error('Unexpected response format:', res.data)
    }
  }

  const GetFollowingFeeds = async () => {
    console.log('followingFeeds:', followingFeedLength.value, followingFeedsTotal.value)
    if (followingFeedLength.value >= followingFeedsTotal.value) {
      console.log('No more following feeds to fetch')
      return
    }
    const res = await listFollowingFeed({
      page: followingFeedsPage.value,
      pageSize: followingFeedsPageSize.value,
    })
    if (Array.isArray(res.data.feed)) {
      let detailedFeeds = res.data.feed.map((feed: any) => ({
        ...feed,
        type: 'followed',
        createTime: new Date(feed.createTime * 1000),
      }))
      detailedFeeds = await Promise.all(
        detailedFeeds.map(async (feed: Feed) => {
          const counter = await getFeedCounter(feed.id)
          const formattedTime = computed(() => {
            return formatDistanceToNow(new Date(feed.createTime), { addSuffix: true })
          })
          await userStore.Set(feed.userID)
          return {
            ...feed,
            createTime: formattedTime.value,
            likeCount: counter.data.likeCount,
            commentCount: counter.data.commentCount,
            viewCount: counter.data.viewCount,
          }
        })
      )
      // 使用 Set 进行去重
      const feedSet = new Set(detailedFeeds.map((feed) => feed.id))
      detailedFeeds.forEach((feed) => {
        if (!feedSet.has(feed.id)) {
          feeds.value.push(feed)
          feedSet.add(feed.id)
        }
      })

      followingFeedLength.value += detailedFeeds.length
      feeds.value.push(...detailedFeeds)
      feeds.value.sort((feedA, feedB) => feedB.id.localeCompare(feedA.id))
      followingFeedsTotal.value = res.data.total
      followingFeedsPage.value++
    } else {
      console.error('Unexpected response format:', res.data)
    }
  }

  const Get = async (id: string): Promise<Feed | null> => {
    const feed = feeds.value.find((feed) => feed.id === id)
    if (feed) {
      return feed
    }
    const res = await getFeedByID(id)
    if (res.code !== 200) {
      console.error(`Failed to fetch feed details for ID ${id}: ${res.msg}`)
      return null
    }
    const counter = await getFeedCounter(id)
    if (counter.code !== 200) {
      console.error(`Failed to fetch feed counter for ID ${id}: ${counter.msg}`)
      return null
    }
    const user = await userStore.Get(res.data.feed.userID)
    if (!user) {
      console.error(`Failed to fetch user details for feed ID ${id}`)
      return null
    }
    const formattedTime = computed(() => {
      return formatDistanceToNow(new Date(res.data.feed.createTime), { addSuffix: true })
    })
    return {
      ...res.data.feed,
      type: 'recommended',
      createTime: formattedTime.value,
      likeCount: counter.data.likeCount,
      commentCount: counter.data.commentCount,
      viewCount: counter.data.viewCount,
    }
  }

  const recommendedFeeds = computed(() => {
    return feeds.value.filter((feed) => feed.type === 'recommended')
  })

  const followedFeeds = computed(() => {
    return feeds.value.filter((feed) => feed.type === 'followed')
  })

  return {
    feeds,
    followingFeedsPage,
    followingFeedsPageSize,
    followingFeedsTotal,
    feedsPage,
    feedsPageSize,
    feedsTotal,
    recommendedFeeds,
    followedFeeds,
    feedLength,
    Get,
    GetFollowingFeeds,
    GetFeeds,
  }
})
