export type TSudokuSizes = { y: number, x: number };

export type TSudokuParams = {
  possibleNumbers?: number[],
  sizes?: TSudokuSizes,
};

export type TSudokuMatrixRow = number[];

export type TSudokuMatrix = TSudokuMatrixRow[];

export type TSudokuGridCol = {
  num: number,
  show: boolean,
  user: number|null,
};

export type TSudokuGridRow = TSudokuGridCol[];

export type TSudokuGrid = TSudokuGridRow[];

export type TLevelTypes = 'easy'|'normal'|'hard';

export type TGameData = {
  id: string|number,
  level: TLevelTypes,
  sizes: TSudokuSizes,
  percent: number,
  matrix?: TSudokuGrid,
  finished?: boolean,
};

export type TEditableColumnData = {
  rowIndex: number,
  colIndex: number,
  column: TSudokuGridCol|null,
};

export type TMatrixNumSettingType = {
  id: number,
  level: TLevelTypes,
  data: TEditableColumnData,
  num: number,
};
