import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";
import { $ } from "@core/dom";
import { shouldResize, isCell, matrix, nextSelector } from "@/components/table/table.functions";
import { resizeHandler } from "@/components/table/table.resize";
import { TableSelection } from "@/components/table/TableSelection";

export class Table extends ExcelComponent {

  constructor ($root, options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  static className = 'excel__table';

  prepare() {
    this.selection = new TableSelection();
  }

  init() {
    super.init();
    
    this.selectCell(this.$root.find('[data-id="0:0"]'));

    this.$on('formula:input', data => this.selection.current.text(data));
    this.$on('formula:done', () => this.selection.current.focus())
  }

  onMousedown (e) {
    if( shouldResize(e) ) {
      resizeHandler(e, this.$root);
    } else if(isCell) {
      const target = $(e.target);
      if(e.shiftKey) {
        const cells = matrix(this.selection.current, target)
                      .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup(cells);
      }else{
        this.selectCell(target);
      }
    }
  }

  onKeydown(event) {
    const { key } = event;
    const keys = ['Enter', 'Tab', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'];

    if(keys.includes(key) && !event.shiftKey) {
      event.preventDefault();

      const id = this.selection.current.id(true);
      const $next = $(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    const text = $(event.target).text();
    this.$emit('table:input', text);
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  toHTML() {
    return createTable(16);
  }
}