/* eslint-disable import/prefer-default-export */
export function applyTheme() {
  const themeMeta = document.querySelector(
    'meta[name="theme"]',
  );

  const theme = themeMeta?.content || 'light';

  document.body.classList.remove(
    'theme-light',
    'theme-dark',
  );

  document.body.classList.add(
    `theme-${theme}`,
  );
}
