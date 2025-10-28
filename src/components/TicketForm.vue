<template>
  <form @submit.prevent="submit" style="display:grid;gap:10px">
    <label>
      <div class="label">Title *</div>
      <input v-model="title" />
      <div v-if="errors.title" class="error">{{ errors.title }}</div>
    </label>

    <label>
      <div class="label">Status *</div>
      <select v-model="status">
        <option value="open">Open</option>
        <option value="in_progress">In progress</option>
        <option value="closed">Closed</option>
      </select>
      <div v-if="errors.status" class="error">{{ errors.status }}</div>
    </label>

    <label>
      <div class="label">Description</div>
      <textarea v-model="description" rows="4" />
      <div v-if="errors.description" class="error">{{ errors.description }}</div>
    </label>

    <label>
      <div class="label">Priority</div>
      <select v-model="priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </label>

    <div style="display:flex;gap:8px;margin-top:6px">
      <button class="btn primary" type="submit">Save</button>
      <button class="btn" type="button" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script>
import { reactive, toRefs } from 'vue'
const allowed = ['open','in_progress','closed']

export default {
  props: { initial: { type: Object, default: () => ({}) } },
  setup(props, { emit }) {
    const state = reactive({
      title: props.initial.title || '',
      status: props.initial.status || 'open',
      description: props.initial.description || '',
      priority: props.initial.priority || 'low',
      errors: {}
    })

    function validate() {
      const e = {}
      if (!state.title || state.title.trim().length < 3) e.title = 'Title must be at least 3 characters.'
      if (!state.status || !allowed.includes(state.status)) e.status = 'Status must be open, in_progress or closed.'
      if (state.description && state.description.length > 2000) e.description = 'Description is too long.'
      state.errors = e
      return Object.keys(e).length === 0
    }

    async function submit() {
      if (!validate()) return
      emit('save', { title: state.title.trim(), status: state.status, description: state.description.trim(), priority: state.priority })
    }

    return { ...toRefs(state), submit }
  }
}
</script>
