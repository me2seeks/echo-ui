<script setup lang="ts">
  import { useFeedStore } from '@/store/feed'
  const feedSote = useFeedStore()
  onMounted(() => {
    feedSote.getFollowingFeeds()
  })
</script>
<template>
  <article
    v-for="feed in feedSote.followingFeeds"
    :key="feed.id"
    class="flex overflow-hidden flex-col max-w-[568px] box-border py-3 px-4 border-b border-gray-700"
  >
    <section class="flex flex-wrap gap-1.5">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8401695eeea648614cc4392f0bccdf6095dedcbd630cd1664b1343d93f52658e?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
        alt="Profile picture of Fabrizio Romano"
        class="object-contain shrink-0 self-start w-11 rounded-full aspect-square"
      />
      <div class="flex flex-col grow shrink-0 items-start basis-0 w-fit max-md:max-w-full">
        <div
          class="flex flex-wrap gap-5 justify-between self-stretch w-full text-base leading-none max-md:max-w-full pb-1"
        >
          <div class="flex gap-3">
            <div class="flex flex-auto gap-1 items-center">
              <el-popover
                :width="300"
                popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
              >
                <!-- 添加follow按钮  -->
                <template #reference>
                  <h1 class="grow self-stretch my-auto font-bold text-gray-200">Fabrizio Romano</h1>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/484685b405da29a776ff5d42c60b2cad73c4982cb85b7fa0809d343ea5febaa4?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                    alt="Verified Badge"
                    class="object-contain shrink-0 self-stretch aspect-[0.95] w-[18px]"
                  />
                  <p class="self-stretch my-auto basis-auto text-zinc-500">@FabrizioRomano</p>
                </template>
                <template #default>
                  <div class="demo-rich-conent" style="display: flex; gap: 16px; flex-direction: column">
                    <el-avatar
                      :size="60"
                      src="https://avatars.githubusercontent.com/u/72015883?v=4"
                      style="margin-bottom: 8px"
                    />
                    <div>
                      <p class="demo-rich-content__name" style="margin: 0; font-weight: 500">Element Plus</p>
                      <p
                        class="demo-rich-content__mention"
                        style="margin: 0; font-size: 14px; color: var(--el-color-info)"
                      >
                        @element-plus
                      </p>
                    </div>

                    <p class="demo-rich-content__desc" style="margin: 0">
                      Element Plus, a Vue 3 based component library for developers, designers and product managers
                    </p>
                  </div>
                </template>
              </el-popover>
            </div>
            <div class="flex gap-1.5 my-auto text-zinc-500">
              <span class="my-auto">-</span>
              <time datetime="2023-06-02">{{ feed.createTime }}</time>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d2a6d5b8da670eb6f63f99329a3ae11e70050c73ee1b019cf4b5af9df9918465?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
            alt="Ellipsis"
            class="object-contain shrink-0 aspect-square w-[19px]"
          />
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
      </div>
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
