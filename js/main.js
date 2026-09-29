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
  const progress = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');
  let scheduled = false;
  function updateScroll() {
    const top = window.scrollY;
    const height = html.scrollHeight - window.innerHeight;
    progress.style.width = (height > 0 ? Math.min(100, Math.max(0, top / height * 100)) : 0) + '%';
    navbar.classList.toggle('scrolled', top > 10);
    backToTop.classList.toggle('visible', top > 400);
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

  // Content is visible by default, including without JavaScript or observer support.
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('reveal-pending');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    document.querySelectorAll('.reveal').forEach(function (element) {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('reveal-pending');
        observer.observe(element);
      }
    });
  }

  const email = String((window.siteConfig || {}).email || '').trim();
  const form = document.getElementById('contactForm');
  if (/^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(email)) {
    const link = document.getElementById('emailLink');
    link.href = 'mailto:' + encodeURIComponent(email);
    link.hidden = false;
    document.getElementById('emailValue').textContent = email;
    document.getElementById('contactUnavailable').hidden = true;
    document.getElementById('contactBrief').hidden = true;
    form.hidden = false;
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = data.get('name').trim();
      const sender = data.get('email').trim();
      const subject = data.get('subject').trim();
      const message = data.get('message').trim();
      const note = document.getElementById('formNote');
      if (!name || !subject || !message) {
        note.textContent = 'Please complete each field with more than spaces.';
        return;
      }
      window.location.href = link.href + '?subject=' + encodeURIComponent('[Website] ' + subject) +
        '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + sender + '\n\n' + message);
      note.textContent = 'Email draft requested. Review and send it in your email app. Your text stays here if the app does not open.';
    });
  }
  document.getElementById('year').textContent = new Date().getFullYear();
})();
