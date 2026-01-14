<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

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
  length: number
  maxWidth?: number
}>()

const maxWidth = props.maxWidth || 4
const nodeSpacing = 90
const levelSpacing = 180
const nodeSize = 50

const mapNodes = ref<Node[]>([])
const activeNodeId = ref(0)

const emit = defineEmits<{
  (e: 'node-click', node: { type: string; id: number }): void
}>()

// Random node type
function randomNodeType(): NodeType {
  const rand = Math.random()
  if (rand < 0.5) return 'enemy'
  if (rand < 0.7) return 'elite'
  return 'event'
}

// Emoji symbols
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

// Get node by id
function getNodeById(id: number) {
  return mapNodes.value.find((n) => n.id === id)
}

// Generate map
function generateMap(minLevels: number) {
  const nodes: Node[] = []
  let idCounter = 0

  // Start node
  nodes.push({
    id: idCounter++,
    type: 'start',
    level: 0,
    col: 0,
    posX: 0,
    posY: 0,
    connections: [],
  })

  // Normal nodes
  for (let lvl = 1; lvl <= minLevels; lvl++) {
    const numNodes = Math.floor(Math.random() * 3) + 2
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

  // Boss
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

  // Group by level
  const levels = nodes.reduce((acc: Node[][], node) => {
    if (!acc[node.level]) acc[node.level] = []
    acc[node.level].push(node)
    return acc
  }, [])

  // Connect nodes
  for (let l = 0; l < levels.length - 1; l++) {
    const curr = levels[l]
    const next = levels[l + 1]
    const unconnectedNext = new Set(next.map((n) => n.id))

    curr.forEach((node) => {
      if (node.type === 'start') {
        node.connections = next.map((n) => n.id)
        next.forEach((n) => unconnectedNext.delete(n.id))
        return
      }

      const sorted = next
        .map((n) => ({ node: n, dist: Math.abs(n.col - node.col) }))
        .sort((a, b) => a.dist - b.dist)
        .map((c) => c.node)

      const numConnections = Math.min(Math.floor(Math.random() * 3) + 1, sorted.length)
      const targets: number[] = []

      for (let n of sorted) {
        if (unconnectedNext.has(n.id)) {
          targets.push(n.id)
          unconnectedNext.delete(n.id)
          if (targets.length >= numConnections) break
        }
      }

      if (targets.length < numConnections) {
        sorted.forEach((n) => {
          if (!targets.includes(n.id) && targets.length < numConnections) targets.push(n.id)
        })
      }

      node.connections = targets
    })
  }

  // Positions
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

// Only generate once
onMounted(() => {
  if (mapNodes.value.length === 0) {
    mapNodes.value = generateMap(props.length)
  }
})

// SVG dimensions
const mapWidth = computed(() => {
  const levelsCount = Math.max(...mapNodes.value.map((n) => n.level)) + 1
  return levelsCount * levelSpacing + 120
})
const mapHeight = computed(() => maxWidth * nodeSpacing + 120)

// Click handler
function handleNodeClick(node: Node) {
  const activeNode = getNodeById(activeNodeId.value)
  if (!activeNode) return

  if (node.level === activeNode.level + 1 && activeNode.connections.includes(node.id)) {
    activeNodeId.value = node.id
    if (['enemy', 'elite', 'boss', 'event'].includes(node.type)) {
      emit('node-click', { type: node.type, id: node.id })
    }
  }
}

function isNodeInactive(node: Node) {
  const activeNode = getNodeById(activeNodeId.value)
  if (!activeNode) return true
  if (node.level < activeNode.level) return true
  if (node.level === activeNode.level + 1 && !activeNode.connections.includes(node.id)) return true
  if (node.level === activeNode.level && node.id !== activeNode.id) return true
  return false
}
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
        :class="[node.type, { active: node.id === activeNodeId, inactive: isNodeInactive(node) }]"
        :style="{ left: node.posX + 'px', top: node.posY + 'px' }"
        @click="handleNodeClick(node)"
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
.map-node.active {
  border-color: purple !important;
}
.map-node.inactive {
  opacity: 0.3;
  pointer-events: none;
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
