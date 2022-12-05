export class TableSelection {
  constructor() {
    this.group = [];
    this.current = null;
  }

  static className = 'selected';

  select($el) {
    this.clear();
    this.group.push($el);
    $el.focus().addClass(TableSelection.className);
    this.current = $el;
  }

  selectGroup($cells) {
    this.clear();
    this.group = $cells;
    this.group.forEach($el => $el.addClass(TableSelection.className));
  }

  clear() {
    console.log('clear');
    this.group.forEach( $el => {
      console.log(`Remove ${TableSelection.className} from`, $el);
      $el.removeClass(TableSelection.className);
    });
    this.group = [];
  }
}