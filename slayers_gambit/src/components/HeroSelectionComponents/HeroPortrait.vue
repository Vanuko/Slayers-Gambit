<script setup lang="ts">
import type { Hero } from '@/utils/Heroes'

const props = defineProps<{ hero: Hero }>()

const emit = defineEmits<{
  (e: 'select', hero: Hero): void
}>()

const imageSrc = new URL(
  `../../assets/Images/HeroPortraits/${props.hero.id}_Port.jpg`,
  import.meta.url,
).href

function handleSelect() {
  emit('select', props.hero)
}
</script>

<template>
  <div class="portrait" @click="handleSelect">
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
}
.portrait img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 25%;
  cursor: pointer;
}
.portrait img:hover {
  border: 1px solid green;
}
p {
  font-size: 28px;
  cursor: default;
}
</style>
