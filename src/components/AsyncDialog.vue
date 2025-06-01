<template>
  <dialog
    ref="dialog"
    @close="isOpen = false"
    @click="handleClick"
  >
    <component :is="contentComponent" v-if="isOpen" />
  </dialog>
</template>

<script setup lang="ts">
  import { computed, defineAsyncComponent, ref } from 'vue'
  import LoadingComponent from './Loading.vue'
  import ErrorComponent from './Error.vue'

  const props = defineProps<{ content: DialogKey }>()

  // Define the settings for the async components.
  const asyncCompSettings = {
    loadingComponent: LoadingComponent,
    errorComponent: ErrorComponent,
    delay: 200,
    timeout: 3000
  }
  // DialogContent1 is how most, if not all, of your dialogs will be defined.
  const DialogContent1 = defineAsyncComponent({
    loader: () => import('./DialogContent1.vue'),
    ...asyncCompSettings
  })
  // DialogContent2 and DialogContent3 are examples of slow and error-prone dialogs.
  const DialogContent2 = defineAsyncComponent({
    loader: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      return import('./DialogContent2.vue')
    },
    ...asyncCompSettings
  })
  const DialogContent3 = defineAsyncComponent({
    loader: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      throw new Error('Failed to load content')
    },
    ...asyncCompSettings
  })

  const dialog = ref<HTMLDialogElement>(null!)

  const isOpen = ref(false)
  const contentComponent = computed(() => {
    switch (props.content) {
      case '1':
        return DialogContent1
      case '2':
        return DialogContent2
      case '3':
        return DialogContent3
      default:
        return ErrorComponent
    }
  })

  function handleClick(e: MouseEvent) {
    const rect = dialog.value.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.value.close()
    }
  }

  function show() {
    isOpen.value = true
    dialog.value.showModal()
  }

  defineExpose({ show })
</script>

<script lang="ts">
  // Define the type for the dialog keys. Use good descriptive names like "SaveDialog".
  // You can expand this as needed.
  export type DialogKey = '1' | '2' | '3'
</script>

<style scoped>
  dialog {
    color: var(--color-text);
    background: var(--color-background);
    position: fixed;
    inset: 0;
    margin: 50vh 50vw;
    translate: -50% -50%;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    width: max-content;
    max-width: min(calc(100% - 32px), calc(65em + 32px));
    max-height: calc(100% - 32px);
    opacity: 0;
    scale: 20%;
    transition: scale 0.2s ease-in-out,
                opacity 0.2s ease-in-out,
                overlay 0.2s allow-discrete,
                display 0.2s allow-discrete;

    &::backdrop {
      background-color: #000;
      opacity: 0;
      transition: opacity 0.2s ease-in-out,
                  overlay 0.2s allow-discrete,
                  display 0.2s allow-discrete;
    }

    &[open] {
      opacity: 1;
      scale: 1;

      &::backdrop {
        opacity: 25%;

        @starting-style {
          opacity: 0;
        }
      }

      @starting-style {
        opacity: 0;
        scale: 20%;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    dialog {
      transition: none;
    }
  }
</style>
