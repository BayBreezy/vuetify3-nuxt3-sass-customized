<template>
  <div>
    <NuxtPwaAssets />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
useSeoMeta({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  twitterTitle: SITE_TITLE,
  twitterDescription: SITE_DESCRIPTION,
  twitterImage: SITE_IMAGE,
  twitterCard: "summary_large_image",
  ogTitle: SITE_TITLE,
  ogDescription: SITE_DESCRIPTION,
  ogImage: SITE_IMAGE,
  ogUrl: SITE_URL,
  themeColor: SITE_THEME_COLOR,
});
useHead({
  htmlAttrs: { lang: "en" },
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
