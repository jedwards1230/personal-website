# Game of Life

## Description

This is a game of life implementation. We all know it and love it.

## Game Rules

- Any live cell with two or three live neighbours survives.
- Any dead cell with three live neighbours becomes a live cell.
- All other live cells die in the next generation. Similarly, all other dead cells stay dead.

## Design Decisions

- 2D array to represent the board
- Cell is either 1 or 0
- Uses nested loops to iterate through the board
