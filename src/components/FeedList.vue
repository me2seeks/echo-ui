<script setup lang="ts">
  import { useFeedStore } from '@/store/feed'
  const feedStore = useFeedStore()
  onMounted(() => {
    feedStore.getFollowingFeeds()
  })
</script>
<template>
  <article
    v-for="feed in feedStore.followingFeeds"
    :key="feed.id"
    class="flex overflow-hidden flex-col max-w-[568px] box-border py-3 px-4 border-b border-gray-700"
  >
    <section class="flex flex-wrap gap-1.5 flex-col">
      <div class="flex flex-row grow shrink-0 items-start basis-0 w-fit max-md:max-w-full">
        <el-popover
          :width="300"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <div class="flex flex-row">
              <div class="avatar">
                <div class="w-9 rounded-full">
                  <img :src="feed.avatar" />
                </div>
              </div>

              <div class="flex flex-col gap-1.5 ml-2">
                <div class="flex flex-row gap-1.5 items-center">
                  <span class="text-sm font-bold text-white">{{ feed.nickname }}</span>
                  <span class="text-xs text-zinc-500">{{ feed.handle }}</span>
                  <span class="text-xs text-zinc-500">·</span>
                  <span class="text-xs text-zinc-500">{{ feed.createTime }}</span>
                </div>
              </div>
            </div>
          </template>
          <template #default>
            <div class="flex flex-col gap-4">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img :src="feed.avatar" />
                </div>
              </div>
              <div>
                <p class="mr-0 font-medium">{{ feed.nickname }}</p>
                <p class="mr-0 text-xs" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
                  @{{ feed.handle }}
                </p>
              </div>
              <FollowBtn />
              <p class="demo-rich-content__desc" style="margin: 0">
                {{ feed.bio }}
              </p>
            </div>
          </template>
        </el-popover>
      </div>
      <p class="mt-1.5 text-base leading-none text-gray-200 whitespace-pre-wrap">{{ feed.content }}</p>
      <figure
        class="flex overflow-hidden flex-col justify-center p-px mt-3 w-full rounded-2xl border border-solid border-zinc-800 max-w-[410px]"
      >
        <img
          loading="lazy"
          :src="feed.media0"
          alt="Mbappé in Real Madrid kit"
          class="object-contain w-full aspect-[0.8]"
        />
      </figure>
    </section>

    <footer class="flex flex-wrap gap-10 self-end mt-3.5 w-full max-w-[518px] max-md:max-w-full">
      <div class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cc193d4f7113040facbbc839c3666e301f510e46f289f7f1fe3c9bb7bbfd9fa5?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
          alt="Comment Icon"
          class="object-contain shrink-0 aspect-square w-[19px]"
        />
        <span class="my-auto">{{ feed.commentCount }}</span>
      </div>
      <div class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1f24c18adbc6ed5c1aeb50e3d48ee1236af9b62a8b00c8fa206f524ce2d9387?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
          alt="Retweet Icon"
          class="object-contain shrink-0 aspect-square w-[19px]"
        />
        <span class="my-auto">138K</span>
      </div>
      <div class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/31a26cc6e81b30345bc6f1ef9a37f47fde9157369e107be2b9ae3101bae4458b?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
          alt="Like Icon"
          class="object-contain shrink-0 aspect-square w-[19px]"
        />
        <span class="my-auto">{{ feed.likeCount }}</span>
      </div>
      <div class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/296b47840f9400866460b37b54c0344fc9c18fa346d2417cec32c60a7a0b4135?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
          alt="Share Icon"
          class="object-contain shrink-0 aspect-square w-[19px]"
        />
        <span class="my-auto">{{ feed.viewCount }}</span>
      </div>
      <div class="flex flex-1 gap-3">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/baf31723cc9f07315078c83769cd144687f002b063eb419fef3e36dc12bb8369?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
          alt="Bookmark Icon"
          class="object-contain shrink-0 aspect-square w-[19px]"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8b6669ffe32d2ebf994e3f5b8232fe88954b2c188784d83716e0e025278b001?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
          alt="Analytics Icon"
          class="object-contain shrink-0 aspect-square w-[19px]"
        />
      </div>
    </footer>
  </article>
</template>
