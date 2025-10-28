// session is stored under ticketapp_session
const KEY = 'ticketapp_session'
const USERS_KEY = 'ticketapp_users' // simple user store for demo

export function createSession(email) {
    const token = Math.random().toString(36).slice(2)
    const session = { token, email, expires: Date.now() + 1000 * 60 * 60 * 24 }
    localStorage.setItem(KEY, JSON.stringify(session))
    return session
}

export function getSession() {
    try {
        const raw = localStorage.getItem(KEY)
        if (!raw) return null
        const s = JSON.parse(raw)
        if (!s.expires || s.expires < Date.now()) {
            localStorage.removeItem(KEY)
            return null
        }
        return s
    } catch {
        return null
    }
}

export function logout() {
    localStorage.removeItem(KEY)
}

export function signupUser({ email, password }) {
    if (!email || !password) throw new Error('Invalid signup data')
    const usersRaw = localStorage.getItem(USERS_KEY)
    const users = usersRaw ? JSON.parse(usersRaw) : []
    if (users.find(u => u.email === email)) {
        throw new Error('User already exists')
    }
    users.push({ email, password })
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
    return true
}

export function loginUser({ email, password }) {
    const usersRaw = localStorage.getItem(USERS_KEY)
    const users = usersRaw ? JSON.parse(usersRaw) : []
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Invalid credentials')
    return createSession(email)
}
