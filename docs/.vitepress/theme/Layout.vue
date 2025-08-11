<template>
  <div :class="{ 'full-width-layout': isHomepage }">
    <Layout v-if="!isHomepage" />
    <Layout v-else>
      <template #doc-before>
        <Content />
      </template>
    </Layout>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
const route = useRoute();

const isHomepage = computed(() => {
  return route.path === '/' || route.path === '/index.html';
});
</script>
