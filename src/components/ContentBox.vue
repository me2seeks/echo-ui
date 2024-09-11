<script setup lang="ts">
  import type { ElInput } from 'element-plus'
  import { Plus } from '@element-plus/icons-vue'
  import type { UploadProps, UploadUserFile, UploadRequestOptions } from 'element-plus'
  import { presign } from '@/api/upload'
  import { fileType } from '@/types/upload'
  import { create } from '@/api/feed'
  import { getPathWithoutQuery } from '@/utils/path'
  import { useMainStore } from '@/store/index'
  import { useUserListStore } from '@/store/userList'
  import type { Gender } from '@/types/user'
  import type { User } from '@/store/userList'

  const userListStore = useUserListStore()

  const userInfo: Ref<User> = ref({
    handle: '',
    nickname: '',
    avatar: '',
    feedCount: 0,
    followerCount: 0,
    followingCount: 0,
    email: '',
    bio: '',
    sex: 0 as Gender,
    isFollow: false,
  })

  onMounted(() => {
    if (!userInfo.value) {
      userListStore.Get(useMainStore().userID).then((user: User | null) => {
        if (user) {
          userInfo.value = user
        }
      })
    }
  })

  const textarea = ref('')
  function postFeed() {
    create({
      content: textarea.value,
      media0: mediaList.value[0] || '',
      media1: mediaList.value[1] || '',
      media2: mediaList.value[2] || '',
      media3: mediaList.value[3] || '',
    }).then(() => {
      userInfo.value.feedCount++
      textarea.value = ''
      fileList.value = []
      mediaList.value = []
    })
  }

  const fileList = ref<UploadUserFile[]>([])
  const mediaList = ref<string[]>([])
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)

  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
  }

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
      :on-remove="handleRemove"
      :disabled="isDisabled"
      :http-request="httpRequest"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
  <button class="btn md:btn-sm mt-2" @click="postFeed">Post</button>
</template>
