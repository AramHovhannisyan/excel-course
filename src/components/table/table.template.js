const CODES = {
  A: 65,
  Z: 90
};

function toCell(row) {
  return function (_, index) {
    return `<div class="cell" contenteditable data-col="${index}" data-id="${row}:${index}" data-type="cell"></div>`;
  }
}

function toCol(col, index) {
  return `<div class="column" data-type="resizable" data-col="${index}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
          </div>`;
}

function createRow(index, colls) {
  const resizer = `<div class="row-resize" data-resize="row"></div>`;
  const rowIndex = index || 0;
  
  return `
    <div class="row" data-type="resizable" data-row="${rowIndex}">
      <div class="row-info">
        ${ index ? index : '' }
        ${ index ? resizer : '' }
      </div>
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

  for(let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill("").map(toCell(row)).join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}