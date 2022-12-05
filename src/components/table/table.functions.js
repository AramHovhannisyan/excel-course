import { range } from "@core/utils";

export function shouldResize(event) {
  return event.target.dataset.resize;
}

export function isCell(event) {
  return event.target.dataset.type;
}

export function shiftPressed(event) {
  return event.shiftKey;
}

export function matrix($current, $target) {
  const currentId = $current.id(true);
  const targetId = $target.id(true);

  const cols = range(currentId.cols, targetId.cols);
  const rows = range(currentId.rows, targetId.rows);
  console.log(cols, rows);

  return cols.reduce( (acc, col) => {
    rows.forEach( row => acc.push(`${row}:${col}`) );
    return acc;
  },
  [] );
}

export function nextSelector(key, {rows, cols}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      rows++;
      break;

    case 'Tab':
    case 'ArrowRight':
      cols++;
      break;

    case 'ArrowLeft':
      cols = cols - 1 < MIN_VALUE ? MIN_VALUE : cols - 1;
      break;

    case 'ArrowUp':
      rows = rows - 1 < MIN_VALUE ? MIN_VALUE : rows - 1;
      break;
  }

  return `[data-id="${rows}:${cols}"]`;
}