<script setup lang="ts">
import { ref, computed } from 'vue'

type NodeType = 'enemy' | 'elite' | 'event' | 'boss' | 'start'

interface Node {
  id: number
  type: NodeType
  level: number
  col: number
  posX: number
  posY: number
  connections: number[]
}

const props = defineProps<{
  length: number // minimum number of normal levels before boss
  maxWidth?: number
}>()

const maxWidth = props.maxWidth || 4
const nodeSpacing = 90
const levelSpacing = 180
const nodeSize = 50

const mapNodes = ref<Node[]>([])

// Weighted random for node types
function randomNodeType(): NodeType {
  const rand = Math.random()
  if (rand < 0.5) return 'enemy' // 50%
  if (rand < 0.7) return 'elite' // 20%
  return 'event' // 30%
}

// Emoji for each node type
function getNodeSymbol(type: NodeType) {
  switch (type) {
    case 'enemy':
      return '👾'
    case 'elite':
      return '⚔️'
    case 'event':
      return '🎲'
    case 'boss':
      return '👑'
    case 'start':
      return '🎮'
  }
}

function getNodeById(id: number): Node | undefined {
  return mapNodes.value.find((n) => n.id === id)
}

function generateMap(minLevels: number) {
  const nodes: Node[] = []
  let idCounter = 0

  // First column: START node
  nodes.push({
    id: idCounter++,
    type: 'start',
    level: 0,
    col: 0,
    posX: 0,
    posY: 0,
    connections: [],
  })

  // Create normal levels (shifted by 1 because start node is level 0)
  for (let lvl = 1; lvl <= minLevels; lvl++) {
    const numNodes = Math.floor(Math.random() * 3) + 2 // 2–4 nodes per level
    for (let col = 0; col < numNodes; col++) {
      nodes.push({
        id: idCounter++,
        type: randomNodeType(),
        level: lvl,
        col,
        posX: 0,
        posY: 0,
        connections: [],
      })
    }
  }

  // Boss node at last level
  const bossCol = Math.floor(maxWidth / 2)
  nodes.push({
    id: idCounter,
    type: 'boss',
    level: minLevels + 1,
    col: bossCol,
    posX: 0,
    posY: 0,
    connections: [],
  })

  // Group nodes by level
  const levels = nodes.reduce((acc: Node[][], node) => {
    if (!acc[node.level]) acc[node.level] = []
    acc[node.level].push(node)
    return acc
  }, [])

  // Connect nodes: 1–3 per node in next level, prefer nearby columns
  for (let l = 0; l < levels.length - 1; l++) {
    const curr = levels[l]
    const next = levels[l + 1]

    curr.forEach((node) => {
      // If start node, connect to all first-level nodes
      if (node.type === 'start') {
        node.connections = next.map((n) => n.id)
        return
      }

      // sort next-level nodes by column distance
      const sorted = next
        .map((n) => ({ node: n, dist: Math.abs(n.col - node.col) }))
        .sort((a, b) => a.dist - b.dist)
        .map((c) => c.node)

      const numConnections = Math.min(Math.floor(Math.random() * 3) + 1, sorted.length)
      node.connections = sorted.slice(0, numConnections).map((n) => n.id)
    })
  }

  // Calculate positions for display
  levels.forEach((levelNodes, l) => {
    const count = levelNodes.length
    const startY = ((maxWidth - count) / 2) * nodeSpacing + 40
    levelNodes.sort((a, b) => a.col - b.col)
    levelNodes.forEach((node, i) => {
      node.posX = l * levelSpacing + 40
      node.posY = startY + i * nodeSpacing
    })
  })

  return nodes
}

mapNodes.value = generateMap(props.length)

// SVG dimensions
const mapWidth = computed(() => {
  const levelsCount = Math.max(...mapNodes.value.map((n) => n.level)) + 1
  return levelsCount * levelSpacing + 120
})

const mapHeight = computed(() => maxWidth * nodeSpacing + 120)
</script>

<template>
  <div class="map-wrapper">
    <div class="map-container" :style="{ width: mapWidth - 200 + 'px' }">
      <svg class="connections" :width="mapWidth" :height="mapHeight">
        <template v-for="node in mapNodes" :key="node.id">
          <line
            v-for="targetId in node.connections"
            :key="`${node.id}-${targetId}`"
            :x1="node.posX + nodeSize / 2"
            :y1="node.posY + nodeSize / 2"
            :x2="(getNodeById(targetId)?.posX ?? 0) + nodeSize / 2"
            :y2="(getNodeById(targetId)?.posY ?? 0) + nodeSize / 2"
            stroke="#444"
            stroke-width="2"
            stroke-dasharray="6 4"
          />
        </template>
      </svg>

      <div
        v-for="node in mapNodes"
        :key="node.id"
        class="map-node"
        :class="node.type"
        :style="{ left: node.posX + 'px', top: node.posY + 'px' }"
      >
        {{ getNodeSymbol(node.type) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.map-wrapper {
  width: 100vw;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 1rem 0;
  background: #111;
}
.map-container {
  position: relative;
  margin: 2rem auto;
  background: #111;
  border-radius: 12px;
  overflow: hidden;
  height: 400px;
}
.connections {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}
.map-node {
  position: absolute;
  width: 50px;
  height: 50px;
  border: 2px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  transition: all 0.2s;
  cursor: pointer;
}
.map-node:hover {
  transform: scale(1.15);
  z-index: 10;
}
.start {
  background: #3182ce;
  border-color: #63b3ed;
  border-radius: 50%;
}
.enemy {
  background: #c53030;
  border-color: #f87171;
  border-radius: 50%;
}
.elite {
  background: #dd6b20;
  border-color: #f6ad55;
  border-radius: 50%;
}
.event {
  background: #2f855a;
  border-color: #9ae6b4;
  border-radius: 6px;
}
.boss {
  background: #553c9a;
  border-color: #b794f4;
  font-size: 1.8rem;
  border-radius: 50%;
}
</style>
