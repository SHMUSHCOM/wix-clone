(function () {
  'use strict';

  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('.section');

  function showSection(id) {
    navItems.forEach(b => b.classList.toggle('active', b.dataset.section === id));
    sections.forEach(s => s.classList.toggle('active', s.id === 'section-' + id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (history.replaceState) {
      history.replaceState(null, '', '#' + id);
    }
    if (window.matchMedia('(max-width: 768px)').matches) {
      sidebar.classList.remove('open');
    }
  }

  navItems.forEach(btn => {
    btn.addEventListener('click', () => showSection(btn.dataset.section));
  });

  // Tab groups
  document.querySelectorAll('.tabs').forEach(group => {
    const tabs = group.querySelectorAll('.tab');
    const panelsRoot = group.nextElementSibling;
    if (!panelsRoot) return;
    const panels = panelsRoot.querySelectorAll(':scope > .tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const name = tab.dataset.tab;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
      });
    });
  });

  // Sub-tab groups (inside Buy Backs)
  document.querySelectorAll('.subtabs').forEach(group => {
    const subtabs = group.querySelectorAll('.subtab');
    const panelsRoot = group.nextElementSibling;
    if (!panelsRoot) return;
    const panels = panelsRoot.querySelectorAll(':scope > .subtab-panel');

    subtabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const name = tab.dataset.tab;
        subtabs.forEach(t => t.classList.toggle('active', t === tab));
        panels.forEach(p => p.classList.toggle('active', p.dataset.panel === name));
      });
    });
  });

  // Mobile sidebar toggle
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });

  // Initial route from hash
  const validSections = ['overview', 'project', 'business', 'functional', 'operational', 'open', 'appendix'];
  const initial = window.location.hash.replace('#', '');
  if (validSections.includes(initial)) {
    showSection(initial);
  }

  // Keyboard nav: 1-7 to jump between top-level sections
  document.addEventListener('keydown', (e) => {
    if (e.target.matches('input, textarea')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const idx = parseInt(e.key, 10);
    if (idx >= 1 && idx <= validSections.length) {
      showSection(validSections[idx - 1]);
    }
  });
})();
