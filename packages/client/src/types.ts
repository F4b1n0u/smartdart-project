// careful ! the order is important !
// RF: multiplierMapper
export enum Multiplier {
  'SINGLE_FAT' = 'SINGLE_FAT',
  'SINGLE_SLIM' = 'SINGLE_SLIM',
  'DOUBLE' = 'DOUBLE',
  'TRIPLE' = 'TRIPLE',
}

export type Hit = {
  score: number,
  multiplier: Multiplier
}

export type Zone = {
  index: number,
  multiplier: Multiplier
}