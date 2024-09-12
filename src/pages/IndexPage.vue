<script setup lang="ts">
  import router from '@/router'

  import { useMainStore } from '@/store/index'
  import { useUserListStore } from '@/store/userList'
  import type { User } from '@/store/userList'
  import { TransitionRoot, TransitionChild, Dialog, DialogPanel } from '@headlessui/vue'
  import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'
  import { fileType } from '@/types/upload'
  import { getPathWithoutQuery } from '@/utils/path'
  import { presign } from '@/api/upload'
  import { create } from '@/api/feed'

  const userListStore = useUserListStore()
  const mainStore = useMainStore()

  const userInfo: Ref<User | undefined> = ref()

  onMounted(() => {
    if (!userInfo.value) {
      userListStore.Get(mainStore.userID).then((user: User | null) => {
        if (user) {
          userInfo.value = user
        }
      })
    }
  })

  const Logout = () => {
    mainStore.LoginOut()
    router.push('/login')
  }
  const isOpen = ref(false)

  function closeModal() {
    isOpen.value = false
  }
  function openModal() {
    isOpen.value = true
  }

  const textarea = ref('')
  function postFeed() {
    create({
      content: textarea.value,
      media0: mediaList.value[0] || '',
      media1: mediaList.value[1] || '',
      media2: mediaList.value[2] || '',
      media3: mediaList.value[3] || '',
    }).then(() => {
      if (userInfo.value) {
        userInfo.value.feedCount++
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
</script>
<template>
  <div class="bg-base-100 drawer lg:drawer-open md:drawer-open">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex h-full">
      <router-view />
    </div>

    <!-- side -->
    <div class="drawer-side border-r border-gray-600">
      <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <aside class="bg-base-100 min-h-screen w-28.75vw flex flex-col items-end">
        <div class="h-full w-64 flex flex-col items-end px-2">
          <div class="bg-base-100 items-start">
            <div
              data-sveltekit-preload-data=""
              class="bg-base-100 sticky top-0 z-20 hidden gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex"
            >
              <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 btn btn-ghost px-2">
                <svg width="32" height="32" viewBox="0 0 415 415" xmlns="http://www.w3.org/2000/svg">
                  <rect x="82.5" y="290" width="250" height="125" rx="62.5" fill="#1AD1A5"></rect>
                  <circle cx="207.5" cy="135" r="130" fill="black" fill-opacity=".3"></circle>
                  <circle cx="207.5" cy="135" r="125" fill="white"></circle>
                  <circle cx="207.5" cy="135" r="56" fill="#FF9903"></circle>
                </svg>
                <div class="font-title inline-flex text-lg md:text-2xl"></div>
              </a>
            </div>
            <div class="h-4"></div>
            <ul class="menu bg-base-100 rounded-box items-start lg:w-56">
              <li>
                <a class="h-14 flex items-center" @click="router.push('/home')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span class="ml-2 md:hidden lg:inline">Home</span>
                  <span class="badge badge-xs badge-info"></span>
                </a>
              </li>
              <li>
                <a class="h-14 flex items-center" @click="router.push('/explore')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                  <span class="ml-2 md:hidden lg:inline">Explore</span>
                </a>
              </li>
              <li>
                <a class="h-14 flex items-center" @click="router.push('/messages')">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  <span class="ml-2 md:hidden lg:inline">Messages</span>
                  <!-- <span class="badge badge-sm">99+</span> -->
                </a>
              </li>
              <li>
                <a class="h-14 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                  <span class="ml-2 md:hidden lg:inline">Bookmarks</span>
                </a>
              </li>
              <li>
                <a class="h-14 flex items-center" @click="router.push(`/profile/${userInfo?.handle}`)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                    />
                  </svg>
                  <span class="ml-2 md:hidden lg:inline">Profile</span>
                </a>
              </li>
            </ul>
            <div class="w-56 h-14 lg:inline md:hidden">
              <button class="btn btn-block rounded-3xl items-center bg-blue-600" type="button" @click="openModal">
                Post
              </button>
            </div>

            <TransitionRoot appear :show="isOpen" as="template">
              <Dialog class="relative z-10" as="div" @close="closeModal">
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
                        <div class="flex flex-row z-0 w-full box-border">
                          <!-- 头像 -->
                          <div class="h-full w-9 mr-2">
                            <div class="avatar">
                              <div class="w-10 rounded-full">
                                <img :src="userInfo?.avatar" />
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
                              <button class="btn mt-2" @click="postFeed">Post</button>
                            </div>
                          </div>
                        </div>
                      </DialogPanel>
                    </TransitionChild>
                  </div>
                </div>
              </Dialog>
            </TransitionRoot>
          </div>
        </div>
        <div class="w-56 px-2 h-16 mt-auto dropdown dropdown-top md:hidden lg:inline">
          <button class="btn rounded-3xl bg-base-100 h-14">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img :src="userInfo?.avatar" />
              </div>
            </div>
            <div class="w-20">
              <div class="ml-2 text-sm font-bold items-start flex flex-col">
                <div class="line-clamp-1">{{ userInfo?.nickname }}</div>
                <div class="line-clamp-1 text-xs">@{{ userInfo?.handle }}</div>
              </div>
            </div>
            <div class="w-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </div>
          </button>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li @click="Logout"><a>Logout</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>
