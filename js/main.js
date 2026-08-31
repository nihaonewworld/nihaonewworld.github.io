/**
 * Bioinformatics Engineer - Personal Website
 * Interactive features: theme toggle, scroll animations, mobile menu,
 * counter animation, form handling, active nav highlighting
 */

(function () {
  'use strict';

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', function () {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progressBar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Navbar shadow
    if (scrollTop > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Progress bar
    progressBar.style.width = scrollPercent + '%';

    // Back to top
    if (scrollTop > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ---- Mobile Menu ----
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // ---- Reveal Animation (Intersection Observer) ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ---- Skill Bar Animation ----
  var skillBars = document.querySelectorAll('.skill-bars');

  if (skillBars.length) {
    var skillObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(function (fill, index) {
              setTimeout(function () {
                fill.style.width = fill.getAttribute('data-level');
              }, index * 200);
            });
            skillObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    skillBars.forEach(function (bar) {
      skillObserver.observe(bar);
    });
  }

  // ---- Active Nav Link Highlight ----
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  var sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
  );

  sections.forEach(function (section) {
    sectionObserver.observe(section);
  });

  // ---- Contact Form ----
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var subject = document.getElementById('subject').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !subject || !message) {
        formNote.style.color = '#ef4444';
        formNote.textContent = 'Please fill in all fields.';
        return;
      }

      // Basic email validation
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formNote.style.color = '#ef4444';
        formNote.textContent = 'Please enter a valid email address.';
        return;
      }

      // Construct mailto link (static site - no backend)
      var mailtoLink =
        'mailto:your.email@example.com' +
        '?subject=' + encodeURIComponent('[Website] ' + subject) +
        '&body=' + encodeURIComponent(
          'Name: ' + name + '\n' +
          'Email: ' + email + '\n\n' +
          message
        );

      window.location.href = mailtoLink;

      formNote.style.color = '';
      formNote.textContent = 'Opening your email client...';

      // Reset form after delay
      setTimeout(function () {
        contactForm.reset();
        formNote.textContent = '';
      }, 3000);
    });
  }

  // ---- Set Current Year ----
  document.getElementById('year').textContent = new Date().getFullYear();

  // ---- Smooth Scroll for Anchor Links (fallback) ----
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        var offset = 70; // nav height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Init
  handleScroll();
})();
