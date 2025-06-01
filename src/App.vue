<script setup lang="ts">
  import { ref } from 'vue'
  import AsyncDialog from './components/AsyncDialog.vue'

  const dialogContent = ref<1 | 2 | 3>(1)
  const asyncDialog = ref<InstanceType<typeof AsyncDialog>>(null!)
</script>

<template>
  <button
    @click="(dialogContent = 1) && asyncDialog.show()"
    style="margin-right: 16px"
  >Open fast dialog</button>
  <button
    @click="(dialogContent = 2) && asyncDialog.show()"
    style="margin-right: 16px"
  >Open slow dialog</button>
  <button
    @click="(dialogContent = 3) && asyncDialog.show()"
  >Fail to load dialog</button>

  <AsyncDialog ref="asyncDialog" :content="dialogContent" />
</template>
