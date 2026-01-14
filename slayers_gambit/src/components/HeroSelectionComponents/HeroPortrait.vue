<script setup lang="ts">
import type { Hero } from '@/utils/Heroes'

const props = defineProps<{ hero: Hero }>()

const imageSrc = new URL(
  `../../assets/Images/HeroPortraits/${props.hero.id}_Port.jpg`,
  import.meta.url,
).href
</script>

<template>
  <div class="portrait">
    <img :src="imageSrc" :alt="props.hero.name" />
    <p>{{ props.hero.name }}</p>
  </div>
</template>

<style scoped>
.portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  :hover {
    border: 1px solid green;
  }
}

.portrait img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 25%;
}
p {
  font-size: 28px;
}
</style>
