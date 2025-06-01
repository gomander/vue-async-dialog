<template>
  <div class="button-container">
    <button @click="openDialog('1')">Open fast dialog</button>
    <button @click="openDialog('2')">Open slow dialog</button>
    <button @click="openDialog('3')">Fail to load dialog</button>
  </div>

  <AsyncDialog ref="asyncDialog" :content="currentDialog" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { default as AsyncDialog, type DialogKey } from './components/AsyncDialog.vue'

  const currentDialog = ref<DialogKey>('1')
  const asyncDialog = ref<InstanceType<typeof AsyncDialog>>(null!)

  function openDialog(dialogKey: DialogKey) {
    currentDialog.value = dialogKey
    asyncDialog.value.show()
  }
</script>

<style scoped>
  .button-container {
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 32px);
  }
</style>
