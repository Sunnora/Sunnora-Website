(() => {
  const header = document.querySelector('.site-header');
  const tabs = document.querySelector('.gallery-tabs');
  const updateOffsets = () => {
    document.documentElement.style.setProperty('--preview-header-height', `${header.getBoundingClientRect().height}px`);
    document.documentElement.style.setProperty('--preview-tabs-height', `${tabs?.getBoundingClientRect().height || 0}px`);
  };
  updateOffsets();
  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(updateOffsets);
    observer.observe(header);
    if (tabs) observer.observe(tabs);
  } else window.addEventListener('resize', updateOffsets);

  const video = document.getElementById('dashboard-demo');
  const playButton = document.querySelector('.demo-play');
  const status = document.querySelector('.demo-status');
  if (video && playButton) {
    const sync = () => { playButton.textContent = video.ended ? '↻ Watch again' : video.paused ? '▶ Watch the 17-second demo' : 'Ⅱ Pause demo'; };
    playButton.addEventListener('click', async () => {
      if (!video.paused) { video.pause(); return; }
      if (video.ended) video.currentTime = 0;
      try { await video.play(); status.textContent = ''; }
      catch { status.textContent = 'Use the play control on the video to begin.'; }
    });
    ['play', 'pause', 'ended'].forEach(event => video.addEventListener(event, sync));
  }

  const dialog = document.getElementById('screenshot-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  let opener, previousOverflow;
  document.querySelectorAll('.screenshot-enlarge').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    opener = link;
    const image = dialog.querySelector('img');
    image.src = link.dataset.original || link.getAttribute('href');
    image.alt = link.querySelector('img').alt;
    dialog.querySelector('.lightbox-original').href = image.src;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  }));
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    opener?.focus({ preventScroll: true });
  });
})();
