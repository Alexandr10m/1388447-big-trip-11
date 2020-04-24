const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const render = (container, tmpl, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(tmpl);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(tmpl);
      break;
    case RenderPosition.AFTEREND:
      container.after(tmpl);
      break;
  }
};

export {render, createElement, RenderPosition};
