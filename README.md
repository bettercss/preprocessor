# bettercss-preprocessor

[![Build Status](https://travis-ci.org/bettercss/preprocessor.svg)](https://travis-ci.org/bettercss/preprocessor)

CSS preprocessor for Bettercss built with [PostCSS](https://github.com/postcss/postcss).

## Installation

```
npm i --save bettercss-preprocessor
```

## Usage

#### CLI

Process via command line

```
bettercss input.css output.css [options]
```

#### PostCSS

```js
var postcss = require('postcss'),
    bettercss = require('bettercss');

postcss([ bettercss() ])
  .process(css, { from: 'input.css', to: 'output.css' })
  .then(function (result) {
      fs.writeFileSync('output.css', result.css);
  });
```

## Features

#### Imports

Consume local files, node modules or bower packages.

```css
@import './style.css';
@import 'module'; /* == @import "./node_modules/module/index.css"; */
```
Plugin: [postcss-import](https://github.com/postcss/postcss-import)

#### Autoprefixer

Parse CSS and add vendor prefixes to CSS rules using values from [Can I Use](http://caniuse.com/).

```css
.flex {
	display: flex
}

.flex {
	display: -webkit-box;
	display: -webkit-flex;
	display: -ms-flexbox;
	display: flex;
}
```

Plugin: [Autoprefixer](https://github.com/postcss/autoprefixer)

#### Variables

Transforms CSS Custom Properties(CSS variables) syntax into a static representation.

```css
:root {
	--example: red;
}

.example {
	color: var(--example);
}
```

Plugin: [postcss-css-variables](https://github.com/MadLittleMods/postcss-css-variables)

#### Calc

Reduces calc() references whenever it's possible

```css
.example {
	color: calc(20px + 20px);
}
```

Plugin: [postcss-calc](https://github.com/postcss/postcss-calc)

#### Media Queries

Transforms W3C CSS Custom Media Queries syntax to more compatible CSS.

```css
@custom-media --small-viewport (max-width: 30em);

@media (--small-viewport) {
  /* styles for small viewport */
}
```

Plugin: [postcss-custom-media](https://github.com/postcss/postcss-custom-media)


## Options

#### CLI

```
Usage: bettercss [<input>] [<output>]

Options:

-h, --help       output usage information
-V, --version    output the version number
-s, --sourcemap  enable source maps

Examples:

# Pass an input and output file:
$ bettercss input.css output.css

# Enable source maps:
$ bettercss input.css output.css --sourcemap
```

#### Node.js

All features in BetterCSS can be toggled on or off by passing options. By default all core features are set to true.

##### Features

* import
* autoprefixer
* variables
* calc
* media

```js
.bettercss({
  // options
});
```