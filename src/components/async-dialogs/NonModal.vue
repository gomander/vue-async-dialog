<template>
  <div class="diaog-container">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="backdrop"
        @click="close"
      ></div>
    </Transition>

    <Transition name="scale-fade">
      <div
        v-if="isOpen"
        ref="dialog"
        @keydown.esc="close"
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <ContentComponent @close="close" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, ref } from 'vue'
  import { asyncCompSettings, ErrorComponent } from '../utility'

  // This alternative version of the AsyncDialog component uses ordinary divs instead of
  // the <dialog> element. This is useful for environments where the <dialog> element's
  // modal nature messes with other dialogs, overlays, or popups.

  const props = defineProps<{ content: DialogKey }>()

  const DialogContent1 = defineAsyncComponent({
    ...asyncCompSettings,
    loader: () => import('../utility/DialogContent1.vue')
  })

  const dialog = ref<HTMLDivElement>()
  const isOpen = ref(false)

  const ContentComponent = computed(() => {
    switch (props.content) {
      case '1':
        return DialogContent1
      default:
        return ErrorComponent
    }
  })

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') close()
  }

  function show() {
    isOpen.value = true
    document.addEventListener('keydown', handleKeydown)
  }

  function close() {
    isOpen.value = false
    document.removeEventListener('keydown', handleKeydown)
  }

  defineExpose({ show })
</script>

<script lang="ts">
  // Define the type for the dialog keys. Use good descriptive names like "SaveDialog".
  // You can expand this as needed.
  export type DialogKey = '1' | '2' | '3';
</script>

<style scoped>
  .diaog-container {
    display: contents;
    z-index: 1000;
  }

  .backdrop {
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(0 0 0 / 0.25);
  }

  .dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    color: var(--color-text);
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: max-content;
    max-width: min(calc(100% - 32px), calc(65em + 32px));
    max-height: calc(100% - 32px);
    padding: 16px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease-in-out;
  }

  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }

  .scale-fade-enter-active, .scale-fade-leave-active {
    transition: scale 0.2s ease-in-out, opacity 0.2s ease-in-out;
  }

  .scale-fade-enter-from, .scale-fade-leave-to {
    opacity: 0;
    scale: 20%;
  }

  @media (prefers-reduced-motion: reduce) {
    #dialog {
      transition: none;
    }
  }
</style>
