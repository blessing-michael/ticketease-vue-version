<template>
  <div class="card ticket-card">
    <div class="left">
      <div class="title-row">
        <h3>{{ t.title }}</h3>
        <span class="status" :style="{ background: statusBg, color: statusColor }">{{ statusLabel }}</span>
      </div>
      <p v-if="t.description">{{ t.description }}</p>
      <div class="muted">Created: {{ new Date(t.createdAt).toLocaleString() }}</div>
    </div>

    <div class="right">
      <button class="btn" @click="$emit('edit', t)" :style="{ borderColor: '#ec9706', color: '#ec9706' }">Edit</button>
      <button class="btn" @click="$emit('delete', t.id)" style="border-color:#e53e3e;color:#e53e3e">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['t'],
  computed: {
    statusColor() {
      return this.t.status === 'open' ? '#16A34A' : this.t.status === 'in_progress' ? '#D97706' : '#6B7280'
    },
    statusBg() {
      return this.statusColor + '20'
    },
    statusLabel() {
      return this.t.status.replace('_',' ')
    }
  }
}
</script>
