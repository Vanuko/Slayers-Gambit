// src/data/heroSkills.ts
import type { Skill } from '@/utils/skills'

export const heroSkillsMap: Record<string, Skill[]> = {
  Young_Blood: [
    {
      name: 'Second Wind',
      requirements: [{ type: 'Power', score: 4 }],
      healMin: 4,
      healMax: 8,
    },
  ],
}
