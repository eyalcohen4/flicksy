function render(template, parent, type) {
  if (!parent || !(parent instanceof HTMLElement)) {
    throw new Error('[render] No parent element / parent element is not valid');
  }

  parent.innerHTML = template;
}

export default render;
