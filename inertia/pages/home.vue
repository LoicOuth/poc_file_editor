<script setup lang="ts">
import { Head, useForm, usePage } from '@inertiajs/vue3'
import { computed, watch } from 'vue'

const props = defineProps<{ fileContent: string }>()
const page = usePage<{ success: { message: string } }>()

const form = useForm({
  content: props.fileContent,
})
const success = computed(() => page.props.success)

const apply = () => {
  form.post('/write')
}

watch(
  () => form.content,
  (value) => {
    form.errors = { content: '' }
    try {
      JSON.parse(value)
    } catch (error) {
      form.errors = { content: error }
    }
  }
)
</script>

<template>
  <Head title="Homepage" />

  <div v-if="success" style="color: green">{{ success.message }}</div>
  <div style="padding: 30px">
    <div
      style="white-space: pre-wrap; padding: 10px"
      contenteditable
      @input="form.content = ($event.target as HTMLDivElement).innerText"
    >
      {{ form.content }}
    </div>
    <span style="color: red">
      {{ form.errors.content }}
    </span>
    <button v-if="!form.errors.content" @click="apply()">
      {{ form.processing ? 'loading...' : 'apply' }}
    </button>
  </div>
</template>
