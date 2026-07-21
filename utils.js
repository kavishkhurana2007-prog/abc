export const $ = (selector, parent = document) => parent.querySelector(selector);
export const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
export const clamp = (number, min, max) => Math.min(Math.max(number, min), max);
export const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function emit(name, detail = {}) {
  document.dispatchEvent(new CustomEvent(name, { detail }));
}

export function on(name, callback) {
  document.addEventListener(name, callback);
  return () => document.removeEventListener(name, callback);
}

export function wait(milliseconds) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

export function debounce(callback, delay = 100) {
  let timer;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), delay);
  };
}

export function createElement(tag, className, content = "") {
  const element = document.createElement(tag);
  element.className = className;
  element.innerHTML = content;
  return element;
}
