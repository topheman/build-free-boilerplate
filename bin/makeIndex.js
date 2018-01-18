#!/usr/bin/env node

const TARGET_FOLDER = 'src';
const EXCLUDE_FILES = []; // you might want to exclude some files based on name (like 'index.html' or 'index.htm' for ex)
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
const dirTree = require('directory-tree');

const baseFolder = path.join(__dirname, '..', TARGET_FOLDER);
const tree = dirTree(baseFolder);

/**
 * Returns a url relative to the root of the project.
 * @param filepath
 * @returns {string}
 */
const urlFromPath = filepath => filepath.replace(baseFolder, '').replace(/^\//, `./${TARGET_FOLDER}/`);

/**
 * Since github pages doesn't serve a page listing directories, we check if a folder contains an index file,
 * in order to know if it's safe to add a link (to avoid a 404)
 * @param directory
 * @returns Boolean
 */
const directoryContainsIndexFile = directory => {
  return directory
    && directory.type === 'directory'
    && directory.children
    && Array.isArray(directory.children)
    && directory.children.filter(file => ['index.html', 'index.htm'].includes(file.name)).length > 0;
};

/**
 * Recursive function trasversing directory tree mapping to ul/li
 * @param children
 * @returns String
 */
const createLi = children => {
  return [...children]
    // group folders first (like in a file explorer)
    .sort((current, next) => {
      if (current.type === 'directory') {
        if (next.type !== 'directory') {
          return -1;
        }
        return current.name > next.name ? 1 : -1;
      }
      if (next.type === 'directory') {
        if (current.type !== 'directory') {
          return 1;
        }
        return current.name > next.name ? 1 : -1;
      }
      return current.name > next.name ? 1 : -1;
    })
    .map(child => {
      if (!EXCLUDE_FILES.includes(child.name) && child.type === 'directory') {
        const containsIndexFile = directoryContainsIndexFile(child);
        return `
<li class="folder${LOW_PRIORITY_FILES_AND_FOLDERS.includes(urlFromPath(child.path)) ? ' exclude' : ''}">
  ${containsIndexFile ? `<a href="${urlFromPath(child.path)}">` : ''}${child.name}${containsIndexFile ? '</a>' : ''}
  ${DESCRIPTION_CONFIG[urlFromPath(child.path)] ? ` - <span class="description">${DESCRIPTION_CONFIG[urlFromPath(child.path)]}</span>` : ''}
  <ul>${createLi(child.children).join('')}</ul>
</li>`;
      }
      if (!EXCLUDE_FILES.includes(child.name)) {
        return `
<li class="file${LOW_PRIORITY_FILES_AND_FOLDERS.includes(urlFromPath(child.path)) ? ' exclude' : ''}">
  <a href="${urlFromPath(child.path)}">${child.name}</a>
  ${DESCRIPTION_CONFIG[urlFromPath(child.path)] ? ` - <span class="description">${DESCRIPTION_CONFIG[urlFromPath(child.path)]}</span>` : ''}
</li>`;
      }
    });
};

const body = `<ul>
  ${createLi(tree.children).join('')}
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
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, '..', 'index.html'), template, 'utf8');

console.log('📄  index.html file created');
console.log('');
