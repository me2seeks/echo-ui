<script setup lang="ts">
  import { useCommentStore } from '@/store/comment'
  import { likeComment, unlikeComment } from '@/api/interaction'
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
  import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'
  import { presign } from '@/api/upload'
  import { fileType } from '@/types/upload'
  import { create } from '@/api/comment'
  import { getPathWithoutQuery } from '@/utils/path'
  import { useUserStore } from '@/store/user'
  import { useMainStore } from '@/store/index'
  import { formatDistanceToNow } from 'date-fns'

  const commentStore = useCommentStore()
  const userStore = useUserStore()
  const mainStore = useMainStore()
  const isOpen = ref(false)
  const textarea = ref('')
  const commentID = ref('')

  const props = defineProps<{
    feedID: string
  }>()

  const content = computed(() => commentStore.GetCommentsByFeedID(props.feedID).value)

  function postComment() {
    create({
      commentID: commentID.value,
      content: textarea.value,
      media0: mediaList.value[0] || '',
      media1: mediaList.value[1] || '',
      media2: mediaList.value[2] || '',
      media3: mediaList.value[3] || '',
    }).then((res) => {
      const comment = content.value.find((comment) => comment.id == commentID.value)
      if (comment) {
        comment.commentCount++
        const formattedTime = computed(() => {
          return formatDistanceToNow(new Date(), { addSuffix: true })
        })
        commentStore.commentCommentMap.get(commentID.value)?.unshift({
          id: res.data.id,
          userID: mainStore.userID,
          content: textarea.value,
          media0: mediaList.value[0] || '',
          media1: mediaList.value[1] || '',
          media2: mediaList.value[2] || '',
          media3: mediaList.value[3] || '',
          createTime: formattedTime.value,
          likeCount: 0,
          commentCount: 0,
          viewCount: 0,
          isLiked: false,
        })
      }
      textarea.value = ''
      fileList.value = []
      mediaList.value = []
      closeModal()
    })
  }

  const fileList = ref<UploadUserFile[]>([])
  const mediaList = ref<string[]>([])
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)

  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  const isDisabled = computed(() => {
    return fileList.value.length >= 4
  })

  const httpRequest: UploadProps['httpRequest'] = (
    options: UploadRequestOptions
  ): XMLHttpRequest | Promise<unknown> => {
    console.log('httpRequest', options)
    console.log(fileList.value)
    let req = {
      objects: [
        {
          fileName: options.file.name,
          fileType: fileType.FeedImg,
        },
      ],
    }

    if (options.file.type.includes('image')) {
      req.objects[0].fileType = fileType.FeedImg
    } else if (options.file.type.includes('video')) {
      req.objects[0].fileType = fileType.FeedVideo
    } else if (options.file.type.includes('gif')) {
      req.objects[0].fileType = fileType.FeedGIF
    }

    return presign(req).then((res) => {
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', res.data.urls[0], true)
      xhr.send(options.file)
      mediaList.value.push(getPathWithoutQuery(res.data.urls[0]))
      return xhr
    })
  }

  function closeModal() {
    isOpen.value = false
  }

  function openModal(id: string, event: Event) {
    event.stopPropagation()
    commentID.value = id
    isOpen.value = true
  }

  function report(id: string, event: Event) {
    event.stopPropagation()
    console.log('Reported', id)
  }

  function like(id: string, event: Event) {
    event.stopPropagation()
    likeComment(id).then((res) => {
      if (res.code == 200) {
        const comment = content.value.find((comment) => comment.id == id)
        if (comment) {
          comment.isLiked = true
          comment.likeCount++
        }
      }
    })
  }

  function unLike(id: string, event: Event) {
    event.stopPropagation()
    console.log('Unliked', id)
    unlikeComment(id).then((res) => {
      if (res.code == 200) {
        const comment = content.value.find((comment) => comment.id == id)
        if (comment) {
          comment.isLiked = false
          comment.likeCount--
        }
      }
    })
  }

  onMounted(() => {
    commentStore.FetchComments(props.feedID)
    commentStore.FetchCommentComments('529993534380444686')
  })
</script>
<template>
  <article
    v-for="comment in content"
    :key="comment.id"
    class="flex overflow-hidden flex-col max-w-[568px] box-border py-3 px-4 border-b border-gray-700"
  >
    <section class="flex flex-wrap gap-1.5 flex-col">
      <div class="flex flex-row grow shrink-0 items-start basis-0 w-fit max-md:max-w-full">
        <el-popover
          :disabled="mainStore.userID == comment.userID"
          :width="300"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <div class="flex flex-row">
              <div class="avatar">
                <div class="w-9 rounded-full">
                  <img :src="userStore.userMap.get(comment.userID)?.avatar" />
                </div>
              </div>

              <div class="flex flex-col gap-1.5 ml-2">
                <div class="flex flex-row gap-1.5 items-center">
                  <span class="text-sm font-bold">{{ userStore.userMap.get(comment.userID)?.nickname }}</span>
                  <span class="text-xs text-zinc-500">{{ userStore.userMap.get(comment.userID)?.handle }}</span>
                  <span class="text-xs text-zinc-500">·</span>
                  <span class="text-xs text-zinc-500">{{ comment.createTime }}</span>
                </div>
              </div>
            </div>
          </template>
          <template #default>
            <div class="flex flex-col gap-4">
              <div class="avatar">
                <div class="w-12 rounded-full">
                  <img :src="userStore.userMap.get(comment.userID)?.avatar" />
                </div>
              </div>
              <div>
                <p class="mr-0 font-medium">
                  {{ userStore.userMap.get(comment.userID)?.nickname }}
                </p>
                <p class="mr-0 text-xs" style="margin: 0; font-size: 14px; color: var(--el-color-info)">
                  @{{ userStore.userMap.get(comment.userID)?.handle }}
                </p>
              </div>
              <p class="demo-rich-content__desc" style="margin: 0">
                {{ userStore.userMap.get(comment.userID)?.bio }}
              </p>
              <FollowBtn :user-id="comment.userID" :is-follow="userStore.userMap.get(comment.userID)?.isFollow" />
            </div>
          </template>
        </el-popover>
      </div>
      <p class="mt-1.5 text-base leading-none whitespace-pre-wrap">{{ comment.content }}</p>
      <figure
        class="flex overflow-hidden flex-col justify-center p-px mt-3 w-full rounded-2xl border border-solid border-zinc-800"
      >
        <img
          loading="lazy"
          :src="comment.media0"
          alt="Mbappé in Real Madrid kit"
          class="object-contain w-full aspect-[0.8]"
        />
      </figure>
    </section>

    <footer class="flex flex-wrap gap-10 self-end mt-3.5 w-full max-w-[518px] max-md:max-w-full">
      <div
        class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500"
        @click="openModal(comment.id, $event)"
      >
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <span class="my-auto pl-1">{{ comment.commentCount }}</span>
        </div>
      </div>
      <TransitionRoot appear :show="isOpen" as="template">
        <Dialog class="relative z-10" as="div" :open="isOpen">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div class="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0 scale-95"
                enter-to="opacity-100 scale-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100 scale-100"
                leave-to="opacity-0 scale-95"
              >
                <DialogPanel
                  class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <div class="flex justify-start pb-2" @click="closeModal">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div class="flex flex-row z-0 w-full box-border">
                    <!-- 头像 -->
                    <div class="h-full w-9 mr-2">
                      <div class="avatar">
                        <div class="w-10 rounded-full">
                          <img :src="userStore.userMap.get(mainStore.userID)?.avatar" />
                        </div>
                      </div>
                    </div>
                    <div class="flex justify-center flex-1 flex-col box-border pt-1 pb-2">
                      <el-input
                        ref="inputRef"
                        v-model="textarea"
                        class="w-full"
                        :autosize="{ minRows: 1, maxRows: 99 }"
                        maxlength="255"
                        show-word-limit
                        true
                        type="textarea"
                        placeholder="What is happening?!"
                        resize="none"
                      />
                      <!-- 上传图片 -->
                      <div class="pt-2">
                        <el-upload
                          v-model:file-list="fileList"
                          action="#"
                          list-type="picture-card"
                          accept="image/*"
                          limit:4
                          :on-preview="handlePictureCardPreview"
                          :disabled="isDisabled"
                          :http-request="httpRequest"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="size-6"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                        </el-upload>

                        <el-dialog v-model="dialogVisible">
                          <img w-full :src="dialogImageUrl" alt="Preview Image" />
                        </el-dialog>
                      </div>
                      <div class="flex justify-end">
                        <button class="btn mt-2" @click="postComment()">Post</button>
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>

      <div
        class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500"
        @click="report(comment.id, $event)"
      >
        <div class="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
            />
          </svg>

          <span class="my-auto pl-1">138K</span>
        </div>
      </div>

      <div class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500">
        <div v-show="!comment.isLiked" class="flex" @click="like(comment.id, $event)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          <span class="my-auto pl-1">{{ comment.likeCount }}</span>
        </div>
        <div v-show="comment.isLiked" class="flex" @click="unLike(comment.id, $event)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-5">
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
            />
          </svg>
          <span class="my-auto pl-1">{{ comment.likeCount }}</span>
        </div>
      </div>
      <div class="flex flex-1 gap-1 text-sm leading-none whitespace-nowrap text-zinc-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <span class="my-auto pl-1">{{ comment.viewCount }}</span>
      </div>
      <div class="flex flex-1 gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
          />
        </svg>
      </div>
    </footer>
  </article>
</template>
