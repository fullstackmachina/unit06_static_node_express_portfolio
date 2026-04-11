
'use strict';

/**
 * Handle mobile menu functionality to hide/reveal sidebar on mobile layouts
 */
const body = document.querySelector('body');
const menuButton = document.querySelector('#menu-icon');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    body.classList.toggle('sidebar-open');
  });
}
