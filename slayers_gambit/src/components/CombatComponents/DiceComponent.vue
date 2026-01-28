<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import type { Dice, DiceType, DiceSides } from '@/utils/dice'

const props = defineProps<{
  dice: Dice[]
}>()

const fakeScores = ref<number[]>([])
const isRolling = ref(false)
let rollInterval: number | null = null
let rollTimeout: number | null = null

watch(
  () => props.dice.map((d) => d.score),
  (scores) => {
    if (scores.some((s) => s !== undefined)) {
      startFakeRoll()
    }
  },
)

function startFakeRoll() {
  stopFakeRoll()

  isRolling.value = true

  fakeScores.value = props.dice.map((d) => Math.floor(Math.random() * d.diceSides) + 1)

  rollInterval = window.setInterval(() => {
    fakeScores.value = props.dice.map((d) => Math.floor(Math.random() * d.diceSides) + 1)
  }, 80)

  rollTimeout = window.setTimeout(() => {
    stopFakeRoll()
  }, 1500)
}

function stopFakeRoll() {
  if (rollInterval) {
    clearInterval(rollInterval)
    rollInterval = null
  }
  if (rollTimeout) {
    clearTimeout(rollTimeout)
    rollTimeout = null
  }
  isRolling.value = false
}

onBeforeUnmount(stopFakeRoll)

function diceColor(type: DiceType) {
  switch (type) {
    case 'Power':
      return '#2563eb'
    case 'Strength':
      return '#dc2626'
    case 'Agility':
      return '#16a34a'
    case 'Chaos':
      return 'linear-gradient(135deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7)'
    case 'Chance':
      return '#ffffff'
  }
}

function diceShape(sides: DiceSides) {
  if (sides === 4) return 'triangle'
  if (sides === 6) return 'square'
  if (sides === 8) return 'diamond'
  if (sides === 10) return 'pentagon'
  if (sides === 12) return 'hexagon'
  return 'circle'
}
</script>

<template>
  <div class="dice-container">
    <div
      v-for="(die, index) in dice"
      :key="index"
      class="dice"
      :class="[diceShape(die.diceSides), { rolling: isRolling }]"
      :style="{ background: diceColor(die.diceType) }"
    >
      <span class="score">
        {{ isRolling ? fakeScores[index] : (die.score ?? '?') }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.dice-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 12px;
}

.dice {
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s ease;
  cursor: pointer;
  pointer-events: auto;
  user-select: none;
}

.score {
  font-size: 18px;
}

.rolling {
  animation: shake 0.15s infinite;
}

@keyframes shake {
  0% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
  100% {
    transform: rotate(-3deg);
  }
}

.square {
  border-radius: 8px;
}

.triangle {
  clip-path: polygon(50% 0%, 0% 90%, 100% 90%);
  margin-top: 2px;
}

.diamond {
  clip-path: polygon(50% -5%, 105% 50%, 50% 105%, -5% 50%);
}

.pentagon {
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
}

.hexagon {
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}

.circle {
  border-radius: 50%;
}
</style>
