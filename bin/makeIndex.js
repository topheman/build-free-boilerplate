#!/usr/bin/env node

const TARGET_FOLDER = 'src';
const EXCLUDE_FILES = ['index.html'];
// relative to project root
const LOW_PRIORITY_FILES_AND_FOLDERS = [
  './src/assets',
  './src/style'
];
const DESCRIPTION_CONFIG = {
  "./src/react-basic.html": "Simple React example using <code>React.createElement</code> (no JSX).",
  "./src/react-jsx.html": `Simple React example with JSX (using <a href="https://unpkg.com/babel-standalone" target="_blank">babel-standalone</a>).`,
  "./src/reasonml.html": `Simple ReasonML example (using <a href="https://unpkg.com/reasonml-in-browser" target="_blank">reasonml-in-browser</a>).`
};

const path = require('path');
const fs = require('fs');
const baseFolder = path.join(__dirname, '..', TARGET_FOLDER);

function urlFromPath(filepath) {
  return filepath.replace(baseFolder, '').replace(/^\//, `./${TARGET_FOLDER}/`);
}

function makeIndex(fromFolder) {
  let string = '';
  fs.readdirSync(fromFolder)
  .sort((current, next) => {
    const currentStat = fs.statSync(path.join(fromFolder, current));
    const nextStat = fs.statSync(path.join(fromFolder, next));
    if (currentStat.isDirectory() && !nextStat.isDirectory()) {
      return -1
    }
    if (nextStat.isDirectory() && !currentStat.isDirectory()) {
      return 1
    }
    return current - next;
  })
  .forEach(file => {
    const filePath = path.join(fromFolder, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      const innerString = makeIndex(filePath);
      string += `
        <li class="folder${LOW_PRIORITY_FILES_AND_FOLDERS.includes(urlFromPath(filePath)) ? ' exclude' : ''}">
          <a href="${urlFromPath(filePath)}">${file}</a>
          ${DESCRIPTION_CONFIG[urlFromPath(filePath)] ? ` - <span class="description">${DESCRIPTION_CONFIG[urlFromPath(filePath)]}</span>` : ''}
          <ul>
            ${innerString}
          </ul>
        </li>`;
    }
    else if (!EXCLUDE_FILES.includes(file)) {
      string += `
        <li class="file${LOW_PRIORITY_FILES_AND_FOLDERS.includes(urlFromPath(filePath)) ? ' exclude' : ''}">
          <a href="${urlFromPath(filePath)}">${file}</a>
          ${DESCRIPTION_CONFIG[urlFromPath(filePath)] ? ` - <span class="description">${DESCRIPTION_CONFIG[urlFromPath(filePath)]}</span>` : ''}
        </li>`;
    }
  });
  return string;
}

const body = `<ul>
  ${makeIndex(baseFolder)}
</ul>`;

const template = `<!DOCTYPE html>
<html>
<head lang="en">
  <!-- This file was generated with ./bin/makeIndex.js -->
  <meta charset="UTF-8">
  <title>Topheman - topheman/build-free-boilerplate</title>
  <link href="https://unpkg.com/normalize.css@7.0.0/normalize.css" rel="stylesheet">
  <link href="./src/style/main.css" rel="stylesheet">
  <link href="./src/style/header.css" rel="stylesheet">
  <link href="./src/style/footer.css" rel="stylesheet">
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
  <style>
    .exclude {
      color: #b3b3b3;
    }
    .exclude a {
      color: #deb3b3;
    }
    .description {
      font-style: italic;
    }
  </style>
</head>
<body>
  <ul class="site-networks">
    <li class="twitter"><a href="https://twitter.com/topheman" title="@topheman on twitter"><span class="icon"></span><span class="desc">Twitter</span></a></li>
    <li class="github"><a href="https://github.com/topheman/build-free-boilerplate" title="Fork on github"><span class="icon"></span><span class="desc">Github</span></a></li>
  </ul>
  <h1>topheman/build-free-boilerplate</h1>
  <p>In a time where even for a "Hello World" project, you need to setup a whole build/transpile pipeline with webpack (or other tools), the goal of this project is to:</p>
  <ul>
    <li>have a simple starter kit</li>
    <li>without any build tool to configure</li>
    <li>directly using UMD build</li>
    <li>with a few simple examples (for ES6, React ...)</li>
  </ul>
  <p>You can directly access the following examples online:</p>
  ${body}
  <footer class="footer">
    <p>
      ©${(new Date()).getFullYear()} <a href="http://labs.topheman.com/">labs.topheman.com</a> - Christophe Rosset<br />
      <iframe
        width="78px"
        height="28px"
        title="Twitter Tweet Button"
        style="border: 0; overflow: hidden; margin-top: 5px;"
        scrolling="no"
        src="https://platform.twitter.com/widgets/tweet_button.html?count=none&dnt=false&lang=en&original_referer=http%3A%2F%2Ftopheman.github.io%2Fbuild-free-boilerplate&size=l&text=Try&type=share&url=https%3A%2F%2Ftopheman.github.io%2Fbuild-free-boilerplate%2F&via=topheman">
      </iframe>
    </p>
  </footer>
<script type="text/javascript">
  // github pages return 404 for folders - remove link to folders
  if (window.location.hostname === 'topheman.github.io') {
    // Loaded ready states
    function done() {
      document.querySelectorAll('li.folder > a').forEach(el => {
        el.style.pointerEvents = 'none';
        el.style.textDecoration = 'none';
      })
    };
    const loadedStates = ['interactive', 'complete'];
    if (loadedStates.includes(document.readyState)) {
      done();
    } else {
      document.addEventListener('DOMContentLoaded', done);
    }
  }
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), template, 'utf8');

console.log('index.html file created');
console.log('');
