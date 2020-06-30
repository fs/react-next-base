import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
}
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
html, body {
  height: 100%;
}
:focus {
  outline: 0;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
  line-height: 1;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input[type=search]::search-cancel-button,
input[type=search]::search-decoration,
input[type=search]::search-results-button,
input[type=search]::search-results-decoration {
  appearance: none;
}
input[type=search] {
  appearance: none;
  box-sizing: content-box;
}
textarea {
  overflow: auto;
  vertical-align: top;
  resize: vertical;
}
audio,
canvas,
video {
  display: inline-block;
  *display: inline;
  *zoom: 1;
  max-width: 100%;
}
audio:not([controls]) {
  display: none;
  height: 0;
}
[hidden] {
  display: none;
}
html {
  font-size: 100%;
  text-size-adjust: 100%;
}
a:focus {
  outline: thin dotted;
}
a:active,
a:hover {
  outline: 0;
}
img {
  border: 0; 
}
figure {
  margin: 0;
}
form {
  margin: 0;
}
fieldset {
  border: 1px solid #c0c0c0;
  margin: 0 2px;
  padding: 0.35em 0.625em 0.75em;
}
legend {
  border: 0;
  padding: 0;
  white-space: normal;
}
button,
input,
select,
textarea {
  font-size: 100%; 
  margin: 0;
  vertical-align: baseline;
}
button,
input {
  line-height: normal;
}
button,
select {
  text-transform: none;
}
button,
html input[type="button"],
input[type="reset"],
input[type="submit"] {
  appearance: button;
  cursor: pointer;
  *overflow: visible;
}
button[disabled],
html input[disabled] {
  cursor: default;
}
input[type="search"] {
  appearance: textfield;
  box-sizing: content-box;
}
input[type="search"]::search-cancel-button,
input[type="search"]::search-decoration {
  appearance: none;
}
button::focus-inner,
input::focus-inner {
  border: 0;
  padding: 0;
}
textarea {
  overflow: auto;
  vertical-align: top;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
html,
button,
input,
select,
textarea {
  color: #222;
}
::selection {
  background: #b3d4fc;
  text-shadow: none;
}
img {
  vertical-align: middle;
}
fieldset {
  border: 0;
  margin: 0;
  padding: 0;
}
textarea {
  resize: vertical;
}`;

export default GlobalStyle;
