<template>
  <div class="auth-container">
    <h2>Create Account</h2>
    <form @submit.prevent="submit" novalidate>
      <div class="field">
        <input v-model="form.email" type="email" placeholder="Email" />
        <div v-if="errors.email" class="error">{{ errors.email }}</div>
      </div>

      <div class="field">
        <input v-model="form.password" type="password" placeholder="Password" />
        <div v-if="errors.password" class="error">{{ errors.password }}</div>
      </div>

      <button class="btn primary" type="submit">Create Account</button>
      <p>Already have an account? <router-link to="/auth/login">Login</router-link></p>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { signupUser, loginUser } from '../services/authService'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default {
  setup() {
    const router = useRouter()
    const toast = useToast()
    const form = reactive({ email: '', password: '' })
    const errors = reactive({})

    function validate() {
      errors.email = !form.email.includes('@') ? 'Enter a valid email.' : ''
      errors.password = form.password.length < 6 ? 'Password must be at least 6 characters.' : ''
      return !errors.email && !errors.password
    }

    function submit() {
      if (!validate()) return
      try {
        signupUser({ email: form.email, password: form.password })
        loginUser({ email: form.email, password: form.password })
        toast.success('Account created — logged in')
        router.push('/dashboard')
      } catch (err) {
        toast.error(err.message)
      }
    }

    return { form, errors, submit }
  }
}
</script>
