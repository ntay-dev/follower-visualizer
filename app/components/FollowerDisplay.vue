<script setup lang="ts">
  import { clsx } from 'clsx';
  import { Heart, Star, Trophy, Users } from 'lucide-vue-next';
  import { twMerge } from 'tailwind-merge';
  import { computed } from 'vue';

  const props = defineProps<{
    count: number;
    label: string;
    theme: 'clean' | 'gradient' | 'dark' | 'gold';
  }>();

  // Format number (e.g. 1,000)
  const formattedCount = computed(() => {
    return new Intl.NumberFormat('en-US').format(props.count);
  });

  const themeClasses = computed(() => {
    switch (props.theme) {
      case 'clean':
        return {
          container: 'bg-white',
          text: 'text-slate-900',
          subtext: 'text-slate-500',
          icon: 'text-slate-900',
          accent: 'bg-slate-100',
        };
      case 'gradient':
        return {
          container: 'bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-500 text-white',
          text: 'text-white drop-shadow-md',
          subtext: 'text-white/80',
          icon: 'text-white',
          accent: 'bg-white/20 backdrop-blur-sm',
        };
      case 'dark':
        return {
          container: 'bg-slate-900',
          text: 'text-white',
          subtext: 'text-slate-400',
          icon: 'text-indigo-400',
          accent: 'bg-slate-800',
        };
      case 'gold':
        return {
          container: 'bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-500',
          text: 'text-yellow-950',
          subtext: 'text-yellow-900/70',
          icon: 'text-yellow-950',
          accent: 'bg-yellow-950/10',
        };
      default:
        return {
          container: 'bg-white',
          text: 'text-black',
          subtext: 'text-gray-500',
          icon: 'text-black',
          accent: 'bg-gray-100',
        };
    }
  });

  function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
  }
</script>

<template>
  <div
    id="capture-area"
    :class="
      cn(
        'relative flex flex-col items-center justify-center w-full h-full transition-all duration-500 select-none overflow-hidden group',
        themeClasses.container
      )
    "
  >
    <!-- Decorative Background Elements -->
    <div
      v-if="theme === 'gradient'"
      class="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none"
    >
      <div
        class="absolute top-[-20%] left-[-20%] w-64 h-64 rounded-full bg-white blur-3xl opacity-40 animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-[-20%] right-[-20%] w-64 h-64 rounded-full bg-yellow-300 blur-3xl opacity-30 animate-pulse-slow delay-1000"
      ></div>
    </div>

    <div
      v-if="theme === 'dark'"
      class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
    >
      <div class="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-500/10 blur-3xl rounded-full"></div>
    </div>

    <!-- Icon -->
    <div
      :class="
        cn(
          'p-3 md:p-4 rounded-2xl mb-4 md:mb-6 transition-colors duration-300',
          themeClasses.accent
        )
      "
    >
      <Users v-if="theme === 'clean'" :class="cn('w-10 h-10 md:w-12 md:h-12', themeClasses.icon)" />
      <Heart
        v-else-if="theme === 'gradient'"
        :class="cn('w-10 h-10 md:w-12 md:h-12', themeClasses.icon)"
      />
      <Star
        v-else-if="theme === 'dark'"
        :class="cn('w-10 h-10 md:w-12 md:h-12', themeClasses.icon)"
      />
      <Trophy
        v-else-if="theme === 'gold'"
        :class="cn('w-10 h-10 md:w-12 md:h-12', themeClasses.icon)"
      />
    </div>

    <!-- Count -->
    <h1
      :class="
        cn(
          'text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-2 tabular-nums leading-none text-center px-4',
          themeClasses.text
        )
      "
    >
      {{ formattedCount }}
    </h1>

    <!-- Label -->
    <p
      :class="cn('text-lg md:text-xl font-medium uppercase tracking-widest', themeClasses.subtext)"
    >
      {{ label }}
    </p>

    <!-- Watermark / Branding (Optional) -->
    <div :class="cn('absolute bottom-6 opacity-40 text-xs font-medium', themeClasses.subtext)">
      Follower Celebration
    </div>
  </div>
</template>
