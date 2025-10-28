<template>
  <header class="site-header">
    <div class="header-inner max-width">
      <router-link to="/" class="logo">TicketEase</router-link>

      <nav :class="['nav-links', { open }]">
        <template v-if="user">
          <router-link to="/dashboard">Dashboard</router-link>
          <router-link to="/tickets">Tickets</router-link>
          <button class="logout-btn" @click="handleLogout">Logout</button>
        </template>
        <template v-else>
          <router-link to="/auth/login">Login</router-link>
          <router-link to="/auth/signup" class="cta-signup">Get Started</router-link>
        </template>
      </nav>

      <div class="hamburger" :class="{ active: open }" @click="open = !open">
        <span></span><span></span><span></span>
      </div>
    </div>
  </header>
</template>

<script>
import { ref } from 'vue'
import { getSession, logout } from '../services/authService'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const open = ref(false)
    const user = getSession()
    const router = useRouter()
    function handleLogout() {
      logout()
      router.push('/') // per requirement: logout returns to landing page
    }
    return { open, user, handleLogout }
  }
}
</script>
