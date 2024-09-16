export const sampleCards = [
  "purple/Eruption.png",
  "purple/Flurry_of_Blows.png",
  "purple/Tantrum.png",
  "purple/Blasphemy.png",
  "curse/Parasite.png",
  "curse/Writhe.png",
]

export function shuffle(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function dupeItems(array: string[]) {
  return array.reduce(
    (p, c) => p.concat([c,c]),
    [] as string[]
  )
}
