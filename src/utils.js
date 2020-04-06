const render = (container, tmpl, place = `beforeend`) => {
  container.insertAdjacentHTML(place, tmpl);
};
export {render};
