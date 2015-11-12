'use strict';

var postcss = require('postcss');
var objectAssign = require('object-assign');

var processors;
var defaults;
var bettercss;

processors = {
	import: require('postcss-import'),
	autoprefixer: require('autoprefixer'),
	variables: require('postcss-css-variables'),
	calc: require('postcss-calc'),
	media: require("postcss-custom-media")
};

defaults = {
	import: true,
	autoprefixer: true,
	variables: true,
	calc: true,
	media: true
};

// Create new plugin with plugins
bettercss = postcss.plugin('bettercss', function(options) {
	var plugins;

	options = objectAssign({}, defaults, options) || defaults;

	plugins = Object.keys(processors)
	.filter(function(key) {
		return options[key] !== false;
	})
	.map(function(key) {
		return processors[key];
	});

	return postcss(plugins);
});

// Export

module.exports = bettercss;

module.exports.process = function(css, options) {
	var result;

	options = options || {};

	options.map = options.map || (options.sourcemap ? true : null);

	result = postcss([bettercss(options)]).process(css, options);

	if (options.map === null || options.map === true || options.map && options.map.inline) {
		return result.css;
	}

	return result;
};


