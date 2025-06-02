<template>
  <div class="app-container">
    <h1>Vue Async Dialog Examples</h1>
    
    <h2>Basic async native dialog</h2>
    <div class="button-container">
      <button @click="openDialog('basic', '1')">Open fast dialog</button>
      <button @click="openDialog('basic', '2')">Open slow dialog</button>
      <button @click="openDialog('basic', '3')">Fail to load dialog</button>
    </div>

    <h2>Non-modal async dialog</h2>
    <div class="button-container">
      <button @click="openDialog('nonModal', '1')">Open dialog</button>
    </div>
  </div>

  <BasicDialog ref="basicDialog" :content="currentDialog" />

  <NonModalDialog ref="nonModalDialog" :content="currentDialog" />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import {
    default as BasicDialog, type DialogKey
  } from './components/async-dialogs/Basic.vue'
  import NonModalDialog from './components/async-dialogs/NonModal.vue'

  const currentDialog = ref<DialogKey>('1')
  const basicDialog = ref<InstanceType<typeof BasicDialog>>(null!)
  const nonModalDialog = ref<InstanceType<typeof NonModalDialog>>(null!)

  function openDialog(type: 'basic' | 'nonModal', dialogKey: DialogKey) {
    currentDialog.value = dialogKey
    switch (type) {
      case 'basic':
        basicDialog.value.show()
        break
      case 'nonModal':
        nonModalDialog.value.show()
        break
    }
  }
</script>

<style scoped>
  .button-container {
    display: flex;
    gap: 16px;
  }
  .app-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
    height: calc(100vh - 32px);
  }
</style>
