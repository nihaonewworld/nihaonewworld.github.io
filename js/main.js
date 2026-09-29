(function () {
  'use strict';
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference;
  try { preference = localStorage.getItem('theme'); } catch (_) { /* Storage may be unavailable. */ }
  function setTheme(theme) {
    html.dataset.theme = theme;
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  setTheme(['light', 'dark'].includes(preference) ? preference : systemTheme.matches ? 'dark' : 'light');
  toggle.hidden = false;
  toggle.addEventListener('click', function () {
    preference = html.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(preference);
    try { localStorage.setItem('theme', preference); } catch (_) { /* Keep the session preference. */ }
  });
  systemTheme.addEventListener('change', function (event) {
    if (!['light', 'dark'].includes(preference)) setTheme(event.matches ? 'dark' : 'light');
  });

  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('navMenu');
  function setMenu(open) {
    hamburger.classList.toggle('active', open);
    menu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  hamburger.hidden = false;
  html.classList.add('menu-ready');
  hamburger.addEventListener('click', function () { setMenu(hamburger.getAttribute('aria-expanded') !== 'true'); });
  menu.addEventListener('click', function (event) { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      hamburger.focus();
    }
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('#navbar')) setMenu(false);
  });
  document.getElementById('navbar').addEventListener('focusout', function () {
    setTimeout(function () {
      if (!document.activeElement.closest('#navbar')) setMenu(false);
    }, 0);
  });
  window.matchMedia('(min-width: 769px)').addEventListener('change', function (event) {
    if (event.matches) setMenu(false);
  });

  const navLinks = Array.from(menu.querySelectorAll('.nav-link'));
  const sections = navLinks.map(function (link) { return document.querySelector(link.getAttribute('href')); });
  const navbar = document.getElementById('navbar');
  let scheduled = false;
  function updateScroll() {
    const top = window.scrollY;
    navbar.classList.toggle('scrolled', top > 10);
    let active = -1;
    sections.forEach(function (section, index) {
      if (section && section.getBoundingClientRect().top <= 160) active = index;
    });
    navLinks.forEach(function (link, index) {
      link.classList.toggle('active', index === active);
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  }
  function scheduleScroll() {
    if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateScroll); }
  }
  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  updateScroll();

  const emailLink = document.getElementById('emailLink');
  const emailValue = document.getElementById('emailValue');
  const configuredEmail = String((window.siteConfig || {}).email || '').trim();
  if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(configuredEmail)) {
    emailLink.href = 'mailto:' + configuredEmail;
    emailValue.textContent = configuredEmail;
    const profileEmail = document.getElementById('profileEmailLink');
    profileEmail.href = 'mailto:' + configuredEmail;
    profileEmail.setAttribute('aria-label', 'Email Qiang at ' + configuredEmail);
  }
  const copyButton = document.getElementById('copyEmail');
  const copyStatus = document.getElementById('copyStatus');
  copyButton.hidden = false;
  copyButton.addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(emailValue.textContent);
      copyStatus.textContent = 'Email address copied.';
    } catch (_) {
      // Keep the address usable on file:// or when clipboard permission is denied.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(emailValue);
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Email selected. Copy it manually, or use the email link.';
    }
  });
  // Motion is optional: content stays visible without JS or observer support.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  // Ease desktop wheel input with bounded travel, without snapping between sections.
  let wheelFrame = 0;
  let wheelTarget = window.scrollY;
  let wheelTime = 0;
  function stopWheel() {
    cancelAnimationFrame(wheelFrame);
    wheelFrame = 0;
    wheelTime = 0;
    html.classList.remove('wheel-easing');
    wheelTarget = window.scrollY;
  }
  function easeWheel(time) {
    const elapsed = wheelTime ? Math.min(time - wheelTime, 50) : 16;
    wheelTime = time;
    const limit = Math.max(0, html.scrollHeight - window.innerHeight);
    wheelTarget = Math.max(0, Math.min(limit, wheelTarget));
    const distance = wheelTarget - window.scrollY;
    if (Math.abs(distance) < 0.75) {
      window.scrollTo(0, wheelTarget);
      stopWheel();
      return;
    }
    const step = Math.sign(distance) * Math.min(Math.abs(distance),
      Math.max(1, Math.abs(distance) * (1 - Math.exp(-elapsed / 95))));
    window.scrollTo(0, window.scrollY + step);
    wheelFrame = requestAnimationFrame(easeWheel);
  }
  function nestedScroller(target) {
    for (let element = target; element && element !== document.body; element = element.parentElement) {
      if (element.scrollHeight > element.clientHeight && /auto|scroll/.test(getComputedStyle(element).overflowY)) return true;
    }
    return false;
  }
  window.addEventListener('wheel', function (event) {
    if (event.defaultPrevented || !event.cancelable || reducedMotion.matches || !finePointer.matches ||
        event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY) ||
        event.target.closest('input, textarea, select, [contenteditable="true"]') || nestedScroller(event.target)) {
      stopWheel();
      return;
    }
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
    const delta = Math.max(-160, Math.min(160, event.deltaY * unit));
    if (!delta) return;
    const current = window.scrollY;
    const limit = Math.max(0, html.scrollHeight - window.innerHeight);
    if (!wheelFrame || Math.sign(delta) !== Math.sign(wheelTarget - current)) wheelTarget = current;
    // A large wheel burst cannot queue several screens of movement.
    const budget = Math.min(480, window.innerHeight * 0.65);
    wheelTarget = Math.max(0, Math.min(limit,
      Math.max(current - budget, Math.min(current + budget, wheelTarget + delta))));
    event.preventDefault();
    html.classList.add('wheel-easing');
    if (!wheelFrame) wheelFrame = requestAnimationFrame(easeWheel);
  }, { passive: false });
  // Immediately yield to anchors, keyboard navigation, touch and scrollbar dragging.
  window.addEventListener('pointerdown', stopWheel, { passive: true });
  window.addEventListener('touchstart', stopWheel, { passive: true });
  window.addEventListener('keydown', stopWheel);
  document.addEventListener('click', stopWheel);
  window.addEventListener('resize', stopWheel);
  window.addEventListener('blur', stopWheel);
  reducedMotion.addEventListener('change', stopWheel);
  finePointer.addEventListener('change', stopWheel);

  const profile = document.querySelector('.profile');
  const runningAnimations = new Set();
  function resetTilt() {
    profile.style.removeProperty('--tilt-x');
    profile.style.removeProperty('--tilt-y');
  }
  profile.addEventListener('pointermove', function (event) {
    if (reducedMotion.matches || !finePointer.matches) return;
    const rect = profile.getBoundingClientRect();
    const x = Math.max(-0.5, Math.min(0.5, (event.clientX - rect.left) / rect.width - 0.5));
    const y = Math.max(-0.5, Math.min(0.5, (event.clientY - rect.top) / rect.height - 0.5));
    profile.style.setProperty('--tilt-x', (-y * 5) + 'deg');
    profile.style.setProperty('--tilt-y', (x * 5) + 'deg');
  });
  profile.addEventListener('pointerleave', resetTilt);
  profile.addEventListener('pointercancel', resetTilt);
  finePointer.addEventListener('change', resetTilt);
  reducedMotion.addEventListener('change', function () {
    resetTilt();
    if (reducedMotion.matches) {
      runningAnimations.forEach(function (animation) { animation.cancel(); });
      runningAnimations.clear();
    }
  });
  if ('IntersectionObserver' in window && 'animate' in Element.prototype) {
    const reveals = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        reveals.unobserve(entry.target);
        if (reducedMotion.matches || entry.target.contains(document.activeElement)) return;
        const animation = entry.target.animate([
          { opacity: 0.65, transform: 'translateY(10px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 380, easing: 'cubic-bezier(.2,.7,.3,1)' });
        runningAnimations.add(animation);
        animation.onfinish = animation.oncancel = function () { runningAnimations.delete(animation); };
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.section-heading, .capability, .project-feature, .workflow-grid li, .pub-item, .contact-panel, .note-topic').forEach(function (element) {
      if (element.getBoundingClientRect().top >= window.innerHeight) reveals.observe(element);
    });
  }
  // Align once on entering a different section, not on every wheel notch.
  // This leaves long sections free to scroll without pulling the reader back.
  const pageSections = Array.from(document.querySelectorAll('main > section[id]'));
  const scrollCue = document.getElementById('scrollCue');
  let settleTimer = 0;
  let cueTimer = 0;
  let pointerHeld = false;
  let touchHeld = false;
  function currentPage() {
    const headerBottom = navbar.getBoundingClientRect().bottom;
    const entryLine = headerBottom + (window.innerHeight - headerBottom) * 0.3;
    let page = pageSections[0];
    pageSections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= entryLine) page = section;
    });
    return page;
  }
  let alignedPage = currentPage();
  function settlePage() {
    if (wheelFrame || pointerHeld || touchHeld) {
      settleTimer = setTimeout(settlePage, 120);
      return;
    }
    const page = currentPage();
    if (page === alignedPage) return;
    alignedPage = page;
    // Preserve iPhone momentum scrolling and pinch zoom; align on desktop only.
    if (reducedMotion.matches || !finePointer.matches ||
        (window.visualViewport && window.visualViewport.scale > 1.01)) return;
    const headerHeight = navbar.getBoundingClientRect().height;
    const rect = page.getBoundingClientRect();
    // A fast scroll may already be deep into a tall section; preserve that position.
    if (rect.top < headerHeight - (window.innerHeight - headerHeight) * 0.45) return;
    const target = window.scrollY + rect.top - headerHeight;
    window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
  }
  window.addEventListener('scroll', function () {
    scrollCue.classList.add('is-scrolling');
    clearTimeout(cueTimer);
    cueTimer = setTimeout(function () { scrollCue.classList.remove('is-scrolling'); }, 700);
    clearTimeout(settleTimer);
    settleTimer = setTimeout(settlePage, 220);
  }, { passive: true });
  window.addEventListener('touchstart', function () { touchHeld = true; }, { passive: true });
  window.addEventListener('touchend', function (event) { touchHeld = event.touches.length > 0; }, { passive: true });
  window.addEventListener('touchcancel', function () { touchHeld = false; }, { passive: true });
  window.addEventListener('pointerdown', function () { pointerHeld = true; }, { passive: true });
  window.addEventListener('pointerup', function () { pointerHeld = false; }, { passive: true });
  window.addEventListener('pointercancel', function () { pointerHeld = false; }, { passive: true });
  window.addEventListener('blur', function () { pointerHeld = false; touchHeld = false; clearTimeout(settleTimer); });
  // Preserve exact destinations of internal links, including topics inside a section.
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const destination = document.getElementById(link.hash.slice(1));
    if (destination) alignedPage = destination.closest('main > section') || alignedPage;
    clearTimeout(settleTimer);
  });
  window.addEventListener('resize', function () {
    clearTimeout(settleTimer);
    alignedPage = currentPage();
  });
  document.getElementById('year').textContent = new Date().getFullYear();
})();
