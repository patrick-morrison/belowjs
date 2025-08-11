<template>
  <div :class="layoutClasses">
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

const layoutClasses = computed(() => {
  const classes = [];
  
  if (isHomepage.value) {
    classes.push('full-width-layout', 'homepage');
  } else if (route.path.startsWith('/guides')) {
    classes.push('guides-page');
  } else if (route.path.startsWith('/api')) {
    classes.push('api-page');
  } else if (route.path.startsWith('/examples')) {
    classes.push('examples-page');
  } else {
    classes.push('standard-page');
  }
  
  return classes.join(' ');
});
</script>
