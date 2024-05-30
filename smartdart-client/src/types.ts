export enum Multiplier {
  'SINGLE_SLIM' = 'SINGLE_SLIM',
  'TRIPLE' = 'TRIPLE',
  'SINGLE_FAT' = 'SINGLE_FAT',
  'DOUBLE' = 'DOUBLE',
}

export type Hit = {
  score: number,
  multiplier: Multiplier
}

export type Zone = {
  index: number,
  multiplier: Multiplier
}