<script setup>
import { onMounted, ref } from 'vue'
const list = ref([])
onMounted(async () => {
  list.value = await (await fetch('/api/list')).json()
})
</script>

<template>
  <h1>一个简单的 webapp，用于学习 docker</h1>
  <ul>
    <li v-for="item of list.data" :key="item.value">{{ item.name }}</li>
  </ul>
</template>

<style scoped></style>
