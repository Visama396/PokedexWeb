export const calculateHP = (base, iv, ev, level) => Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10

export const calculateStat = (base, iv, ev, level, nature) => Math.floor(Math.floor(Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + 5) * nature)