
/**
 * @function buildElement
 *
 * Create an HTML element with mapped attributes
 * @param {String} type
 * @param {Map} attributes
 */
function buildElement(type, attributes) {
  const el = document.createElement(type);

  if (attributes) {
    // Map and set the element attributes instead of manualy declare them
    Object.keys(attributes).map((key) => {
      el[key] = attributes[key];
    });
  }

  return el;
}

export default buildElement;
