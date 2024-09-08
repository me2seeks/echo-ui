<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import router from '@/router'

  const route = useRoute()
  const handle = route.params.handle
  console.log(handle)
</script>
<template>
  <div class="max-w-[880px]">
    <div class="flex gap-5 max-md:flex-col">
      <section class="flex flex-col w-[63%] max-md:ml-0 max-md:w-full">
        <div
          class="flex flex-col grow w-full border-r border-l border-zinc-800 pb-[46083px] max-md:pb-24 max-md:mt-8 max-md:max-w-full"
        >
          <header class="flex flex-col max-md:max-w-full">
            <div class="flex flex-col items-start py-1.5 pr-20 pl-4 w-full bg-opacity-70 max-md:pr-5 max-md:max-w-full">
              <div class="flex gap-9 items-start text-xl font-bold leading-tight text-gray-200">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/afb99d521f7d10c7b32bc449798946c941be7ba87f3ada267b2418e57096177f?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                  class="object-contain shrink-0 mt-2 w-5 aspect-square"
                  alt=""
                  @click="router.back()"
                />
                <div class="flex gap-2">
                  <div class="grow my-auto">Fabrizio Romano</div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d40e51b21b804d61e4120e2ec0c23928b7415d69816fcb5eb4d96cf1b574531?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                    class="object-contain shrink-0 w-5 aspect-square"
                    alt=""
                  />
                </div>
              </div>
              <div class="ml-14 text-sm leading-none text-zinc-500 max-md:ml-2.5">48.8K posts</div>
            </div>
            <div
              class="flex relative flex-col items-end px-20 pt-52 pb-6 w-full text-base font-bold leading-none text-center whitespace-nowrap min-h-[269px] text-neutral-900 max-md:pt-24 max-md:pl-5 max-md:max-w-full"
            >
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/22dd9cf824a18229d7d21a28b92ff35e7c444439aa41fc1e20bbe0c21093bcba?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                class="object-cover absolute inset-0 size-full"
                alt="Profile background"
              />
              <button class="relative px-5 py-3.5 bg-gray-100 rounded-full">Follow</button>
            </div>
            <div class="flex flex-col mt-4 ml-4 max-w-full w-[327px] max-md:ml-2.5">
              <div class="flex gap-1 items-start self-start">
                <div class="flex flex-col mt-1">
                  <h1 class="text-xl font-black leading-none text-gray-200">Fabrizio Romano</h1>
                  <div class="self-start mt-3 text-base leading-none text-zinc-500">@FabrizioRomano</div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/493eb1718993e2e79b84bb402d9fb01612a9ef2760ba1d87521031ca2ff97214?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                  class="object-contain shrink-0 w-5 aspect-square"
                  alt=""
                />
              </div>
              <div class="flex gap-1.5 mt-5 text-base leading-none text-gray-200">
                <div class="flex-auto">Here we go! © fabrizio.romano93@gmail.com</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/86507efd7a064df8de82775386c86e9a3ecc160282eedb96c4296a7ce70123ce?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                  class="object-contain shrink-0 aspect-square w-[18px]"
                  alt=""
                />
              </div>
            </div>
          </header>
          <div class="flex flex-col pr-14 pl-4 mt-3.5 w-full text-base max-md:pr-5 max-md:max-w-full">
            <div class="flex gap-1 self-start leading-none text-zinc-500">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3109de35ee98e30764e551c94b7cc4151588334d5e24e95be971c59999cc56b9?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                class="object-contain shrink-0 aspect-[1.06] w-[19px]"
                alt=""
              />
              <div>Milano, Italia</div>
            </div>
            <div class="flex z-10 gap-5 self-end mt-0 leading-none">
              <div class="flex flex-auto gap-1 text-sky-500 whitespace-nowrap">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c2c1f7953607ab4ed1ab1716b9d97a411215082437ae168f8c9169d4ca0db2bc?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                  class="object-contain shrink-0 self-start aspect-[1.06] w-[19px]"
                  alt=""
                />
                <a href="https://m.youtube.com/@FabrizioRoman" class="basis-auto">m.youtube.com/@FabrizioRoman…</a>
              </div>
              <div class="flex gap-1 text-zinc-500">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8bb5c3428ccea7d9f990299d2f7e55fe5e083efb6331372c1ea82998e3b6a39?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
                  class="object-contain shrink-0 self-start aspect-[1.06] w-[19px]"
                  alt=""
                />
                <div class="basis-auto">Born February 21</div>
              </div>
            </div>
          </div>
          <div class="flex z-10 flex-col ml-4 w-32 max-w-full text-base leading-none text-zinc-500 max-md:ml-2.5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/840bfb08a6561d1dd32977a13bee6dc3e02ba38fa56cedc26e0f43b0006a9af1?placeholderIfAbsent=true&apiKey=80de33d4e37547dbb64d50ac71e681c5"
              class="object-contain aspect-square w-[19px]"
              alt=""
            />
            <div class="z-10 self-end mt-0">Joined July 2011</div>
          </div>
          <div class="flex flex-col mt-4 w-full max-md:max-w-full">
            <div class="flex gap-6 self-start ml-4 whitespace-nowrap max-md:ml-2.5">
              <div class="flex gap-1.5 text-sm">
                <div class="grow font-bold leading-none text-gray-200">2,590</div>
                <div class="leading-none text-zinc-500">Following</div>
              </div>
              <div class="flex gap-1.5 self-start">
                <div class="grow text-sm font-bold leading-none text-gray-200">22.2M</div>
                <div class="text-sm leading-none text-zinc-500">Followers</div>
              </div>
            </div>
            <nav
              class="flex flex-wrap gap-5 justify-between items-start px-11 pt-4 pb-px mt-4 text-base leading-none whitespace-nowrap border-b border-zinc-800 text-zinc-500 max-md:px-5 max-md:max-w-full"
            >
              <div class="flex flex-col font-bold text-gray-200">
                <div class="max-md:mr-2 max-md:ml-2">Posts</div>
                <div class="flex shrink-0 mt-3 h-1 bg-sky-500 rounded-full"></div>
              </div>
              <div>Replies</div>
              <div class="leading-none">Highlights</div>
              <div class="leading-none">Media</div>
            </nav>
            <PinnedPost />
            <RegularPost />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
