// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint'],
  eslint: {
    config: {
      standalone: false,
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Follower Celebrator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Visualize your social media followers and celebrate milestones with style. Create beautiful screens for sharing on Twitter, Instagram, and more.',
        },
        { name: 'theme-color', content: '#4f46e5' },
        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Follower Celebrator - Celebrate Your Milestones' },
        {
          property: 'og:description',
          content: 'Visualize your social media followers and celebrate milestones with style.',
        },
        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Follower Celebrator - Celebrate Your Milestones' },
        {
          name: 'twitter:description',
          content: 'Visualize your social media followers and celebrate milestones with style.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
});
