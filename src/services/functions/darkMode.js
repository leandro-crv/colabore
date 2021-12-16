export default function darkMode() {
  let html = document.getElementsByTagName('html');
  html = html[0].classList;
  html.toggle('darkMode');
}
