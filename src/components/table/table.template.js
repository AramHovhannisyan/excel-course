const CODES = {
  A: 65,
  Z: 90
};

function toCell(cell = '') {
  return `<div class="cell" contenteditable>${cell}</div>`;
}

function toCol(col) {
  return `<div class="column">${col}</div>`;
}

function createRow(index, colls) {
  return `
    <div class="row">
      <div class="row-info">${ index ? index : '' }</div>
      <div class="row-data">${colls}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const colls = new Array(colsCount)
                .fill("")
                .map(toChar)
                .map(toCol)
                .join('');

  const row = createRow(null, colls);
  rows.push(row);

  for(let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill("").map(toCell).join('');

    rows.push(createRow(i + 1, cells));
  }

  return rows.join('');
}