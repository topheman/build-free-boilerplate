build-free-boilerplate
======================

In a time where even for a "Hello World" project, you need to setup a whole build/transpile pipeline with webpack (or other tools), the goal of this project is to:

* have a simple starter kit
* without any build tool to configure
* directly using UMD build
* with a few simple examples (for ES6, React ...)

## Main purpose

You may not use that kind of boilerplate for production but for practice or teaching purpose.

## Install

```shell
npm install
```

## Run

```shell
npm start
```

Goto [http://localhost:5000](http://localhost:5000)

## Build

Build ? You said no build step ...?

The [online demo](https://topheman.github.io/build-free-boilerplate/) is hosted on **github pages** which serves static pages where you can't have **dynamic listing of directories** with no `index.html` files (like most servers do), which can be interesting to discover the content of the site.

I made a little [script](https://github.com/topheman/build-free-boilerplate/blob/master/bin/makeIndex.js) to generate the `index.html` home page file at the root that will include a list of all the files in the `src` directory.

```shell
npm run build
```

## Deploy

The [online demo](https://topheman.github.io/build-free-boilerplate/) is hosted on **github pages** (to deploy you need to push to a `gh-pages` branch).

Since we don't have any build step, we simply push `master` onto `gh-pages` with the following syntax:

```shell
git push origin master:gh-pages
```

Note: `git push  <REMOTENAME> <LOCALBRANCHNAME>:<REMOTEBRANCHNAME>` [(see article)](https://help.github.com/articles/pushing-to-a-remote/)

## License

This software is distributed under an MIT licence.

Copyright 2018 © Christophe Rosset

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software
> and associated documentation files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or
> substantial portions of the Software.
> The Software is provided "as is", without warranty of any kind, express or implied, including
> but not limited to the warranties of merchantability, fitness for a particular purpose and
> noninfringement. In no event shall the authors or copyright holders be liable for any claim,
> damages or other liability, whether in an action of contract, tort or otherwise, arising from,
> out of or in connection with the software or the use or other dealings in the Software.

This is a work in progress.
