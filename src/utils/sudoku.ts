/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */

import {
  TSudokuParams,
  TSudokuMatrixRow,
  TSudokuMatrix,
  TSudokuGrid,
} from '@/types';

export default class Sudoku {
  static generate(data?: TSudokuParams) {
    const params = {
      sizes: { x: 9, y: 9 },
      ...(data || {}),
    };

    params.possibleNumbers = [
      ...Array(
        Math.max(params.sizes.x, params.sizes.y),
      ).fill(0).map((a, i) => i + 1),
    ];

    const matrix: TSudokuMatrix = Sudoku.copy(
      Array(params.sizes.y).fill(0).map(() => Array(params.sizes.x).fill(0).map(() => null)),
    );

    matrix[0] = [...Sudoku.randomize([...params.possibleNumbers])];

    for (let rowIndex = 1, rowLen = matrix.length; rowIndex < rowLen; rowIndex++) {
      const row = matrix[rowIndex];
      const possibleNumbers = [...Sudoku.randomize([...params.possibleNumbers])];

      let canRefillPrevRow = false;
      let times = 0;

      for (let colIndex = 0, colLen = row.length; colIndex < colLen; colIndex++) {
        if (row[colIndex] >= 1) {
          continue;
        }

        const upNumbers = Sudoku.getRowNumbers(matrix, colIndex);

        const freeNumbers: number[] = possibleNumbers.filter(
          (n) => ![...upNumbers, ...row].includes(n),
        );

        if (!freeNumbers[0]) {
          if (++times > 3) {
            canRefillPrevRow = true;
            for (let i = colIndex; i < colLen; i++) {
              matrix[rowIndex - 1][i] = -1;
            }

            break;
          }

          colIndex = -1;
          continue;
        } else {
          row[colIndex] = freeNumbers[0];
        }
      }

      if (canRefillPrevRow) {
        matrix[rowIndex] = [...Array(params.sizes.x).fill(0).map(() => -1)];
        rowIndex -= 2;
      }
    }

    return matrix;
  }

  static hide(matrix: TSudokuMatrix, percent: number): TSudokuGrid {
    const result: TSudokuGrid = matrix.map((row) => row.map((col) => ({
      num: col,
      show: percent < (Math.random() * 100),
      user: null,
    })));

    return result;
  }

  static getRowNumbers(matrix: TSudokuMatrix, xIndex: number): TSudokuMatrixRow {
    return matrix.reduce((acc: TSudokuMatrixRow, row: TSudokuMatrixRow) => {
      if (row[xIndex] >= 1) {
        acc.push(row[xIndex]);
      }
      return acc;
    }, []);
  }

  static randomize(arr: TSudokuMatrixRow): TSudokuMatrixRow {
    return arr.sort(() => Math.random() - 0.5);
  }

  static copy(obj: any): any {
    return JSON.parse(JSON.stringify(obj));
  }
}
