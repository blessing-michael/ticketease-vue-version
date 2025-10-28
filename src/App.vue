<template>
  <div>
    <!-- Header hidden on auth pages -->
    <Header v-if="!isAuthRoute" />
    <router-view />
    <footer class="site-footer">
      <div class="max-width">© {{ year }} TicketEase. All rights reserved.</div>
    </footer>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'

export default {
  components: { Header },
  setup() {
    const route = useRoute()
    const isAuthRoute = computed(() => route.path.startsWith('/auth'))
    return { isAuthRoute, year: new Date().getFullYear() }
  }
}
</script>
