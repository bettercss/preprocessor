#!/usr/bin/env node
'use strict';

var program = require('commander');
var path = require('path');
var fs = require('fs');
var write = require('write-file-stdout');
var read = require('read-file-stdin');
var bettercss = require('../');
var PrettyError = require('pretty-error');

var options;
var input;
var output;
var resolve = path.resolve;

program
	.version(require('../package.json').version)
	.usage('[<input>] [<output>]')
	.option('-s, --sourcemap', 'enable source maps');

program.on('--help', function() {
	console.log('  Examples:');
	console.log();
	console.log('    # Pass an input and output file:');
	console.log('    $ bettercss input.css output.css');
	console.log();
	console.log('    # Enable source maps:');
	console.log('    $ bettercss --sourcemap input.css output.css');
	console.log();
});

program.parse(process.argv);

input = program.args[0] ? resolve(program.args[0]) : null;
output = program.args[1] ? resolve(program.args[1]) : null;

// Options
options = Object.assign({}, {
	sourcemap: (program.sourcemap ? true : false)
});

if (input && !exists(input)) {
	renderError(new Error('Input file doesn\'t exist'));
}

// Run
run(input, output, options);

function run(input, output, options) {
	options = options || {};

	read(input, function(error, buffer) {

		if (error) {
			renderError(error);
		}

		write(output, bettercss.process(String(buffer), options));
	});
}

function exists(file) {
	try {
		return fs.lstatSync(file);
	}
	catch (e) {
		return false;
	}
}

function renderError(error) {
	var pe = new PrettyError();
	var rendered;

	rendered = pe.render(error);
	console.log(rendered);
	process.exit();
}