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

This is a work in progress.
