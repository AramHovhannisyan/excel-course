export function shouldResize(event) {
  if (event.target.dataset.resize) return true;

  return false;
}