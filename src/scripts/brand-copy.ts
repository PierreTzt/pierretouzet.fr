/**
 * Click-to-copy for brandbook palette swatches.
 *
 * Each swatch button has:
 *   - data-copy="<value to copy>"
 *   - a child .swatch-value element whose text gets swapped to "Copié"/"Copied" for 1.5s
 *   - a data-copy-feedback="<localized label>" attribute on the button
 */
function initBrandCopy(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-copy]');
  buttons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy;
      const feedback = button.dataset.copyFeedback ?? 'Copied';
      const valueEl = button.querySelector<HTMLElement>('.swatch-value');
      if (!value || !valueEl) return;
      try {
        await navigator.clipboard.writeText(value);
      } catch {
        return;
      }
      const original = valueEl.textContent;
      valueEl.textContent = feedback;
      button.setAttribute('data-copied', 'true');
      window.setTimeout(() => {
        valueEl.textContent = original;
        button.removeAttribute('data-copied');
      }, 1500);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBrandCopy);
} else {
  initBrandCopy();
}
