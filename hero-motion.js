/* Accessible motion for the homepage product edit. The text directory remains
   the single keyboard/screen-reader route to every product. */
(() => {
  const fan = document.querySelector('.fan');
  const viewport = fan?.querySelector('.fan__viewport');
  const track = fan?.querySelector('.fan__track');
  const cycle = track?.querySelector('.fan__cycle');
  const toggle = fan?.querySelector('.fan__toggle');
  if (!fan || !viewport || !track || !cycle || !toggle) return;

  const stages = cycle.querySelectorAll('.fan__stage').length;
  if (!stages) return;

  // The visual duplicate is clickable, but the directory owns accessible links.
  const duplicate = cycle.cloneNode(true);
  duplicate.setAttribute('aria-hidden', 'true');
  duplicate.querySelectorAll('a').forEach(link => link.tabIndex = -1);
  track.appendChild(duplicate);

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reducedMotion.matches;
  const paintToggle = () => {
    track.dataset.paused = String(paused);
    toggle.setAttribute('aria-label', paused ? 'Play moving products' : 'Pause moving products');
    toggle.querySelector('.fan__toggle-icon').textContent = paused ? '▶' : 'Ⅱ';
    toggle.querySelector('.fan__toggle-label').textContent = paused ? 'Play' : 'Pause';
  };
  const resize = () => {
    const width = cycle.getBoundingClientRect().width;
    if (!width) return;
    // One complete cycle travels at about 18 px/second on every screen.
    track.style.setProperty('--fan-duration', `${width / 18}s`);
  };

  toggle.addEventListener('click', () => {
    paused = !paused;
    paintToggle();
  });
  reducedMotion.addEventListener?.('change', event => {
    if (event.matches) {
      paused = true;
      paintToggle();
    }
  });
  // Freeze the exact frame before a touch user tries to select a product.
  viewport.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' && !paused) {
      paused = true;
      paintToggle();
    }
  });
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(resize);
    observer.observe(cycle);
    observer.observe(viewport);
  } else window.addEventListener('resize', resize);
  resize();
  paintToggle();
  toggle.hidden = false;
  // Base styles suppress nonessential animation for reduced-motion users.
  // This track stays paused by default, but permits an explicit Play choice.
  track.classList.add('keep-motion');
  fan.classList.add('fan--animated');
})();
