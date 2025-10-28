<template>
  <div class="max-width page" style="padding:32px 16px">
    <h1>Dashboard</h1>
    <p>Welcome, <strong>{{ session?.email }}</strong></p>

    <div class="stats-grid">
      <div class="card stat">
        <h3>Total Tickets</h3>
        <div class="stat-number">{{ stats.total }}</div>
      </div>
      <div class="card stat">
        <h3>Open Tickets</h3>
        <div class="stat-number">{{ stats.open }}</div>
      </div>
      <div class="card stat">
        <h3>Resolved Tickets</h3>
        <div class="stat-number">{{ stats.resolved }}</div>
      </div>
    </div>

    <div style="margin-top:20px">
      <router-link to="/tickets" class="btn primary">Go to Ticket Management →</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getSession } from '../services/authService'
import { fetchTickets } from '../services/ticketService'

export default {
  setup() {
    const session = getSession()
    const stats = ref({ total: 0, open: 0, resolved: 0 })

    async function load() {
      try {
        const tickets = await fetchTickets()
        stats.value.total = tickets.length
        stats.value.open = tickets.filter(t => t.status === 'open').length
        stats.value.resolved = tickets.filter(t => t.status === 'closed').length
      } catch {
        // handled by page
      }
    }
    onMounted(load)
    return { session, stats }
  }
}
</script>
