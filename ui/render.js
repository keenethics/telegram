function render (root, component) {
  if (!root) return;

  window.addEventListener('DOMContentLoaded', function () {
    const rootNode = document.getElementById(root);

    if (component && rootNode) {
      rootNode.append(component);
    }
  });
}

export default render;
