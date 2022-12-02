import { $ } from "@core/dom";

export function resizeHandler(e, $root) {
  let delta;
  let value;

  const $resizer = $(e.target);
  const resizeBy = $resizer.data.resize;
  const resizerWay = resizeBy === 'col' ? 'bottom' : 'right';

  const $parent = $resizer.closest("[data-type='resizable']");

  const index = $parent.data[resizeBy];
  const coords = $parent.getCoords();
  const cells = $root.findAll(`[data-col="${index}"]`)

  $resizer.css({
    opacity: 1,
    [resizerWay]: '-5000px'
  });

  document.onmousemove = e => {
    if (resizeBy == 'col') {
      delta = e.pageX - coords.right;
      $resizer.css({
        right: -delta + 'px'
      });
      
    }else {
      delta = e.pageY - coords.bottom;
      $resizer.css({
        bottom: -delta + 'px'
      });
    }
  }

  document.onmouseup = e => {
    if (resizeBy == 'col') {
      value = coords.width + delta;
      $parent.css({ width: value + 'px' });
      cells.forEach(el => el.style.width = value + 'px');
    } else {
      value = coords.height + delta;
      $parent.css({ height: value + 'px' });
    }

    document.onmousemove = null;

    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0
    });
  }
}