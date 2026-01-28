<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import { Hero } from '@/utils/Heroes'
import { computed, ref } from 'vue'
import { enemies_low } from '@/content/enemies/enemies/tier 1/tier_1'
import { Enemy } from '@/utils/enemies'
import DiceComponent from '@/components/CombatComponents/DiceComponent.vue'

const props = defineProps<{ hero: Hero | null }>()

const gameStore = useGameStore()
const difficulty = computed(() => gameStore.difficulty)
const dice = computed(() => gameStore.heroDice)
const enemy = ref<Enemy>(enemies_low[Math.floor(Math.random() * enemies_low.length)])

const imageSrc = new URL(`../assets/Images/FullImages/${props.hero?.id}.jpg`, import.meta.url).href
const enemyImageSrc = new URL(`../assets/Images/EnemyImages/${enemy.value.id}.jpg`, import.meta.url)
  .href

const emit = defineEmits<{
  (e: 'close'): void
}>()

function finishCombat() {
  emit('close')
}

function rollDice() {
  gameStore.rollDice()
}
</script>

<template>
  <div class="combat-screen">
    <div class="combatant-blocks">
      <div class="player-block">
        <p class="hero-title">{{ props.hero?.name }}</p>
        <div class="full-img">
          <img :src="imageSrc" :alt="hero?.name" />
        </div>
      </div>
      <div class="enemy-block">
        <p class="enemy-title">{{ enemy.name }}</p>
        <div class="full-img">
          <img :src="enemyImageSrc" :alt="enemy.name" />
        </div>
      </div>
    </div>
    <div class="dice-block">
      <DiceComponent :dice="dice" />
      <button @click="rollDice">Roll</button>
    </div>
  </div>
  <button @click="finishCombat">Back to Map</button>
</template>

<style scoped>
.combat-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid #f00;
  border-radius: 12px;
  padding: 20px;
  .combatant-blocks {
    display: flex;
    .player-block {
      .hero-title {
        display: flex;
        justify-content: center;
        padding-bottom: 8px;
        font-size: 22px;
      }
      .full-img img {
        height: 700px;
        width: 500px;
        object-fit: fill;
        border-radius: 25px;
      }
    }
    .enemy-block {
      .enemy-title {
        display: flex;
        justify-content: center;
        padding-bottom: 8px;
        font-size: 22px;
      }
      .full-img img {
        height: 700px;
        width: 500px;
        object-fit: fill;
        border-radius: 25px;
      }
    }
  }

  .dice-block {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: gray;
    min-height: 80px;
    max-width: 100%;
    border-radius: 25px;
  }
}
button {
  margin-top: 20px;
  width: 36px;
}
</style>
