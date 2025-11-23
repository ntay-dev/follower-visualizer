<script setup lang="ts">
  import confetti from 'canvas-confetti';
  import { Github, Hash, Layout, PartyPopper, Settings, Sparkles, Type, X } from 'lucide-vue-next';
  import { onMounted, onUnmounted, ref } from 'vue';
  import FollowerDisplay from './components/FollowerDisplay.vue';

  const count = ref(1000);
  const label = ref('Followers');
  const theme = ref<'clean' | 'gradient' | 'dark' | 'gold'>('gradient');
  const showSettings = ref(false);
  const showHint = ref(true);
  const animationType = ref<'cannon' | 'fireworks' | 'stars' | 'school-pride' | 'random'>('cannon');

  const themes = [
    { id: 'clean', name: 'Minimal Clean', color: 'bg-white border-slate-200' },
    {
      id: 'gradient',
      name: 'Social Vibe',
      color: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
    },
    { id: 'dark', name: 'Night Mode', color: 'bg-slate-900' },
    {
      id: 'gold',
      name: 'Gold Prestige',
      color: 'bg-gradient-to-r from-amber-300 to-yellow-500',
    },
  ] as const;

  const animations = [
    { id: 'cannon', name: 'Cannon', icon: '🚀' },
    { id: 'fireworks', name: 'Fireworks', icon: '🎆' },
    { id: 'stars', name: 'Stars', icon: '⭐' },
    { id: 'school-pride', name: 'School Pride', icon: '🎓' },
    { id: 'random', name: 'Random', icon: '🎲' },
  ] as const;

  function getThemeColors() {
    if (theme.value === 'clean') return ['#1e293b', '#64748b', '#94a3b8'];
    if (theme.value === 'gradient') return ['#8b5cf6', '#d946ef', '#f472b6'];
    if (theme.value === 'dark') return ['#6366f1', '#a855f7', '#ec4899'];
    if (theme.value === 'gold') return ['#fbbf24', '#b45309', '#fef3c7'];
    return ['#ff0000', '#00ff00', '#0000ff'];
  }

  function triggerCelebration() {
    const colors = getThemeColors();

    if (animationType.value === 'cannon') {
      const duration = 3000;
      const end = Date.now() + duration;
      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else if (animationType.value === 'fireworks') {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        colors: colors,
      };

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);
    } else if (animationType.value === 'stars') {
      const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
        shapes: ['star'],
        colors: ['#FFE400', '#FFBD00', '#E89400', '#FFCA6C', '#FDFFB8'],
      };

      function shoot() {
        confetti({
          ...defaults,
          particleCount: 40,
          scalar: 1.2,
          shapes: ['star'],
        });
        confetti({
          ...defaults,
          particleCount: 10,
          scalar: 0.75,
          shapes: ['circle'],
        });
      }

      setTimeout(shoot, 0);
      setTimeout(shoot, 100);
      setTimeout(shoot, 200);
    } else if (animationType.value === 'school-pride') {
      const end = Date.now() + 15 * 1000;
      const colors = getThemeColors(); // Use theme colors instead of fixed ones

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else if (animationType.value === 'random') {
      confetti({
        angle: Math.random() * 360,
        spread: Math.random() * 360,
        particleCount: Math.random() * 100 + 50,
        origin: { x: Math.random(), y: Math.random() },
        colors: colors,
      });
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'Enter') {
      // Only trigger if we're not focused on an input
      if (!(e.target instanceof HTMLInputElement)) {
        e.preventDefault();
        triggerCelebration();
      }
    }
    if (e.code === 'Escape') {
      showSettings.value = false;
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeydown);
    setTimeout(() => {
      showHint.value = false;
    }, 4000);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });

  const config = useRuntimeConfig();
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden">
    <!-- Full Screen Display -->
    <div class="absolute inset-0 z-0" @click="triggerCelebration">
      <FollowerDisplay :count="count" :label="label" :theme="theme" />
    </div>

    <!-- Footer Info -->
    <div
      class="absolute top-4 right-4 z-10 flex flex-col items-end text-xs font-mono text-white/50 hover:text-white transition-colors pointer-events-none"
    >
      <span>v{{ config.public.version }}</span>
      <div class="flex items-center gap-2 mt-1">
        <a
          href="https://x.com/ntay_dev"
          target="_blank"
          rel="noopener noreferrer"
          class="pointer-events-auto hover:underline"
        >
          Created by @ntay_dev
        </a>
        <a
          href="https://github.com/ntay-dev"
          target="_blank"
          rel="noopener noreferrer"
          class="pointer-events-auto hover:text-white transition-colors"
          aria-label="GitHub"
        >
          <Github class="w-4 h-4" />
        </a>
      </div>
    </div>

    <!-- Hint Message -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="translate-y-10 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-10 opacity-0"
    >
      <div
        v-if="showHint && !showSettings"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 px-6 py-3 bg-black/30 backdrop-blur-md text-white rounded-full font-medium shadow-lg border border-white/10 whitespace-nowrap pointer-events-none"
      >
        Tap or Press Space to celebrate ✨
      </div>
    </transition>

    <!-- Floating Action Button -->
    <button
      v-if="!showSettings"
      class="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 p-3 md:p-4 bg-white/90 backdrop-blur-sm shadow-lg rounded-full hover:scale-110 transition-all duration-300 text-slate-700 hover:text-indigo-600 group"
      aria-label="Open Settings"
      @click.stop="showSettings = true"
    >
      <Settings
        class="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-500"
      />
    </button>

    <!-- Settings Modal Overlay -->
    <div
      v-if="showSettings"
      class="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      @click.self="showSettings = false"
    >
      <div
        class="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto"
      >
        <!-- Modal Header -->
        <div
          class="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between p-4 md:p-6 border-b border-slate-100"
        >
          <h2 class="text-lg md:text-xl font-bold text-slate-900">Setup Celebration</h2>
          <button
            class="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900"
            @click="showSettings = false"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-4 md:p-6 space-y-4 md:space-y-6">
          <!-- Input: Count -->
          <div class="space-y-2 md:space-y-3">
            <label class="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Hash class="w-4 h-4" /> Count
            </label>
            <input
              v-model="count"
              type="number"
              class="block w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-lg font-medium focus:border-indigo-500 focus:ring-indigo-500 transition-all"
              placeholder="1000"
            />
          </div>

          <!-- Input: Label -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Type class="w-4 h-4" /> Label
            </label>
            <input
              v-model="label"
              type="text"
              class="block w-full rounded-xl border-slate-200 bg-slate-50 p-3 font-medium focus:border-indigo-500 focus:ring-indigo-500 transition-all"
              placeholder="Followers"
            />
          </div>

          <!-- Theme Selector -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Layout class="w-4 h-4" /> Design
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="t in themes"
                :key="t.id"
                :class="[
                  'relative flex items-center justify-center h-14 rounded-xl border-2 transition-all overflow-hidden',
                  theme === t.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20'
                    : 'border-transparent hover:border-slate-200',
                ]"
                @click="theme = t.id"
              >
                <div :class="['absolute inset-0', t.color]"></div>
                <span
                  :class="[
                    'relative z-10 text-xs font-bold uppercase tracking-wider',
                    t.id === 'clean' ? 'text-slate-900' : 'text-white',
                  ]"
                >
                  {{ t.name }}
                </span>
              </button>
            </div>
          </div>

          <!-- Animation Selector -->
          <div class="space-y-3">
            <label class="flex items-center gap-2 text-sm font-medium text-slate-700">
              <PartyPopper class="w-4 h-4" /> Animation
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="a in animations"
                :key="a.id"
                :class="[
                  'flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all',
                  animationType === a.id
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-200',
                ]"
                @click="animationType = a.id"
              >
                <span class="text-2xl mb-1">{{ a.icon }}</span>
                <span class="text-[10px] font-bold uppercase tracking-wider">{{ a.name }}</span>
              </button>
            </div>
          </div>

          <!-- Actions -->
          <div class="pt-4">
            <button
              class="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 px-4 rounded-xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-indigo-500/30"
              @click="
                triggerCelebration();
                showSettings = false;
              "
            >
              <Sparkles class="w-5 h-5" />
              Celebrate Now
            </button>
            <p class="text-xs text-center text-slate-400 mt-3">
              Press
              <kbd
                class="font-sans px-1 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-500"
                >Space</kbd
              >
              or
              <kbd
                class="font-sans px-1 py-0.5 bg-slate-100 rounded border border-slate-200 text-slate-500"
                >Enter</kbd
              >
              to celebrate anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
