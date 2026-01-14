<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function startGame() {
  router.push('/hero-select')
}
</script>

<template>
  <main class="menu">
    <h1>Slayers Gambit</h1>

    <button @click="startGame">
      Start Game
    </button>
  </main>
</template>

<style scoped>
.menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
