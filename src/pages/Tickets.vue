<template>
  <div class="page max-width" style="padding:32px 16px">
    <div class="row" style="justify-content:space-between;align-items:center">
      <h1>Tickets</h1>
      <button class="btn primary" @click="toggleCreate">{{ showCreate ? 'Close' : 'New Ticket' }}</button>
    </div>

    <div v-if="showCreate" class="card" style="margin-top:12px">
      <TicketForm @cancel="showCreate=false" @save="handleCreate" />
    </div>

    <div style="margin-top:12px; display:grid; gap:12px">
      <div v-if="loading">Loading tickets...</div>
      <div v-else-if="tickets.length===0" class="muted">No tickets yet — create one.</div>
      <TicketCard v-for="t in tickets" :key="t.id" :t="t" @edit="onEdit" @delete="handleDelete" />
    </div>

    <div v-if="editing" class="modal">
      <div class="modal-inner card">
        <h3>Edit ticket</h3>
        <TicketForm :initial="editing" @cancel="editing=null" @save="payload => handleUpdate(editing.id,payload)" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { fetchTickets, createTicket, updateTicket, deleteTicket } from '../services/ticketService'
import { useToast } from 'vue-toastification'
import TicketForm from '../components/TicketForm.vue'
import TicketCard from '../components/TicketCard.vue'

export default {
  components: { TicketForm, TicketCard },
  setup() {
    const tickets = ref([])
    const loading = ref(true)
    const showCreate = ref(false)
    const editing = ref(null)
    const toast = useToast()

    async function load() {
      loading.value = true
      try {
        tickets.value = await fetchTickets()
      } catch (err) {
        toast.error(err.message || 'Failed to load tickets. Please retry.')
      } finally {
        loading.value = false
      }
    }

    async function handleCreate(payload) {
      try {
        const t = await createTicket(payload)
        tickets.value.unshift(t)
        toast.success('Ticket created')
        showCreate.value = false
      } catch (err) {
        toast.error(err.message || 'Failed to create ticket')
      }
    }

    async function handleUpdate(id, payload) {
      try {
        const t = await updateTicket(id, payload)
        tickets.value = tickets.value.map(x => x.id === id ? t : x)
        toast.success('Ticket updated')
        editing.value = null
      } catch (err) {
        toast.error(err.message || 'Failed to update ticket')
      }
    }

    async function handleDelete(id) {
      if (!confirm('Delete this ticket?')) return
      try {
        await deleteTicket(id)
        tickets.value = tickets.value.filter(x => x.id !== id)
        toast.success('Ticket deleted')
      } catch (err) {
        toast.error(err.message || 'Failed to delete ticket')
      }
    }

    function onEdit(t) {
      editing.value = t
      showCreate.value = false
    }

    function toggleCreate() {
      showCreate.value = !showCreate.value
      editing.value = null
    }

    onMounted(load)
    return { tickets, loading, showCreate, editing, handleCreate, handleUpdate, handleDelete, onEdit, toggleCreate }
  }
}
</script>
