import { ExcelComponent } from "@core/ExcelComponent";
import { createTable } from "@/components/table/table.template";
import { $ } from "@core/dom";
import { shouldResize } from "./table.functions";
import { resizeHandler } from "./table.resize";

export class Table extends ExcelComponent {

  constructor ($root) {
    super($root, {
      name: "Table",
      listeners: ['mousedown']
    });
  }

  onMousedown (e) {
    if( shouldResize(e) ) {
      resizeHandler(e, this.$root);
    }
  }

  static className = 'excel__table';

  toHTML() {
    return createTable(16);
  }
}