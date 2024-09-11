<script setup lang="ts">
  import router from '@/router'
  import { ElMessage } from 'element-plus'
  import { useMainStore } from '@/store/index'

  const main = useMainStore()
  const email = ref<string>('')
  const password = ref<string>('')
  const isSubmitting = ref<boolean>(false)
  const submit = async () => {
    try {
      if (!email.value || !password.value) {
        ElMessage('请输入邮箱和密码')
        return
      }
      isSubmitting.value = true
      await main.LoginIn({ email: email.value, password: password.value }).then(() => {
        ElMessage('登录成功')
        router.push({ path: '/', replace: true })
      })
    } catch (error) {
      console.error('Login failed', error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>
<template>
  <div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row-reverse">
      <div class="text-center lg:text-left">
        <h1 class="text-5xl font-bold">Login now!</h1>
        <p class="py-6 w-96">
          Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti
          eaque aut repudiandae et a id nisi.
        </p>
      </div>
      <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div class="card-body">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input v-model="email" type="email" placeholder="email" class="input input-bordered" required />
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input v-model="password" type="password" placeholder="password" class="input input-bordered" required />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>
          <div class="form-control mt-6">
            <button class="btn btn-primary" @click="submit">
              <span v-show="isSubmitting" class="loading loading-spinner"></span>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
