// Tickets stored as array in localStorage under ticketapp_tickets
const KEY = 'ticketapp_tickets'
const allowedStatuses = ['open', 'in_progress', 'closed']

function read() {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
}

function write(data) {
    localStorage.setItem(KEY, JSON.stringify(data))
}

export async function fetchTickets() {
    // simulate async
    return new Promise((resolve) => setTimeout(() => resolve(read()), 200))
}

export async function createTicket(payload) {
    if (!payload.title || !payload.status) {
        throw new Error('Title and status are required.')
    }
    if (!allowedStatuses.includes(payload.status)) {
        throw new Error('Invalid status.')
    }
    const ts = Date.now()
    const t = {
        id: Math.random().toString(36).slice(2),
        title: payload.title,
        status: payload.status,
        description: payload.description || '',
        priority: payload.priority || 'low',
        createdAt: ts,
        updatedAt: ts
    }
    const arr = read()
    arr.unshift(t)
    write(arr)
    return t
}

export async function updateTicket(id, payload) {
    const arr = read()
    const idx = arr.findIndex(x => x.id === id)
    if (idx === -1) throw new Error('Ticket not found')
    if (!payload.title || !payload.status) throw new Error('Title and status required')
    if (!allowedStatuses.includes(payload.status)) throw new Error('Invalid status')
    const t = { ...arr[idx], ...payload, updatedAt: Date.now() }
    arr[idx] = t
    write(arr)
    return t
}

export async function deleteTicket(id) {
    const arr = read()
    const res = arr.filter(x => x.id !== id)
    write(res)
    return true
}
