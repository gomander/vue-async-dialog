<template>
  <div>
    <h1 id="dialog-title">Dialog content 1</h1>
    <p>This is an example dialog</p>
    <button @click="emit('close')">OK</button>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['close'])
</script>
