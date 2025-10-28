<template>
  <div class="landing-container">
    <!-- Header -->
    <Header />

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="max-width">
        <div class="hero-content">
          <h1>TicketEase</h1>
          <p>Manage, track and resolve customer issues smoothly and efficiently.</p>

          <div class="hero-buttons">
            <router-link to="/auth/login" class="btn-outline">Login</router-link>
            <router-link to="/auth/signup" class="btn-filled">Get Started</router-link>
          </div>
        </div>
      </div>

      <div class="hero-circle"></div>

      <svg class="hero-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          fill="#ffffff"
          fill-opacity="1"
          d="M0,256L80,224C160,192,320,128,480,133.3C640,139,800,213,960,240C1120,267,1280,245,1360,234.7L1440,224V0H0Z"
        ></path>
      </svg>
    </section>

    <!-- Features Section -->
    <section class="features max-width">
      <div class="feature-card">
        <h3>Fast Ticket Creation</h3>
        <p>Create new tickets in seconds and keep work moving smoothly.</p>
      </div>

      <div class="feature-card">
        <h3>Team Collaboration</h3>
        <p>Work together seamlessly to resolve issues quickly.</p>
      </div>

      <div class="feature-card">
        <h3>Track Progress</h3>
        <p>See ticket statuses at a glance and never miss a deadline.</p>
      </div>
    </section>

    <!-- Footer -->
    <Footer />
  </div>
</template>
