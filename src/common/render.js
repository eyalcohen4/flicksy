/**
 * @function render
 *
 * This function recive a string (or a template literal)
 * and set it as the innerHTML of the parent.
 *
 * for example: render('Hello World', document.body);
 * @param {String} template
 * @param {HTMLElement} parent
 */
function render(template, parent) {
  if (!parent || !(parent instanceof HTMLElement)) {
    throw new Error('[render] No parent element / parent element is not valid');
  }

  parent.innerHTML = template;
}

export default render;
