export function isHTML(str) {
  var a = document.createElement('div');
  a.innerHTML = str;

  for (var children = a.childNodes, i = children.length; i--;) {
    if (children[i].nodeType == 1) return true;
  }

  return false;
}