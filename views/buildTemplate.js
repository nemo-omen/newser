const buildTemplate = function (html) {
  const template = document.createElement('template');
  template.innerHTML = html;
  const tpl = template.content.cloneNode(true);
  return tpl;
};

export { buildTemplate };