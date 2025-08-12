<template>
  <div class="full-width-layout">
    <Layout>
      <template #doc-before>
        <Content />
      </template>
    </Layout>
  </div>
</template>

<script>
import DefaultTheme from 'vitepress/theme'

export default {
  components: {
    Layout: DefaultTheme.Layout
  }
}
</script>