import { ExcelComponent } from "@core/ExcelComponent";
import { $ } from "@core/dom";

export class Formula extends ExcelComponent {

  constructor ($root, options) {
    super($root, {
      name: "Formula",
      listeners: ['input', 'click', 'keydown'],
      ...options
    });
  }

  static className = 'excel__formula';

  toHTML() {
    return `
      <div class="info">fx</div>
      <div id="formula" class="input" contenteditable spellcheck="false"></div>
    `;
  }

  init() {
    super.init();

    const formulaInput = $('#formula')

    this.$on('table:select', (cell) => formulaInput.text(cell.text()));
    this.$on('table:input', (text) => formulaInput.text(text));
  }

  onInput (event) {
    const text = $(event.target).text();
    this.$emit('formula:input', text);
  }

  onKeydown(e) {
    const keys = ['Enter', 'Tab'];

    if( keys.includes(e.key)) {
      e.preventDefault();
      this.$emit('formula:done');
    }
  }
}