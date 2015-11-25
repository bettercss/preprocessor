'use strict';

var postcss = require('postcss');
var expect = require('chai').expect;
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var Promise = require('bluebird');
var bettercss = require('../');
var objectAssign = require('object-assign');

var test;
var cli;
var cliTest;

describe('bettercss', function () {

	it('autoprefixes', function() {
		return test('autoprefixes', {});
	});

	it('variables', function() {
		return test('variables', {});
	});

	it('import', function() {
		return test('import', {
			// Fix for relative paths
			from: path.join(__dirname, './fixtures/import.css')
		});
	});

	it('calc', function() {
		return test('calc', {});
	});

	it('media', function() {
		return test('media', {});
	});

	it('processes css on the command line', function() {
		return cliTest('variables', []);
	});

});

test = function(fixture, options) {
	var input = path.join(__dirname, 'fixtures', fixture + '.css');
	var expected = path.join(__dirname, 'fixtures', fixture + '.expected.css');

	input = fs.readFileSync(input, 'utf8');
	expected = fs.readFileSync(expected, 'utf8');

	// Return promise
	return postcss([ bettercss() ])
	.process(input, options)
	.then(function (result) {
		expect(result.css).to.eql(expected);
		expect(result.warnings()).to.be.empty;
	});
};

cli = function(cmd) {
	return new Promise(function (resolve, reject) {
		var cli;
		var output = '';

		process.chdir(__dirname);

		cli = spawn(process.execPath, [
			path.resolve(__dirname, '../bin/bettercss.js')
		].concat(cmd));

		cli.stdout.on('data', function(buffer) {
			output += buffer;
		});

		cli.stderr.on('data', function(buffer) {
			reject(buffer);
		});

		cli.on('exit', function(code) {
			resolve({
				output: output,
				code: code
			});
		});
	});
};

cliTest = function(fixture, args) {
	var input = fixture + '.css';
	var expected = fixture + '.expected.css';

	input = path.join(__dirname, 'fixtures', input);
	expected = path.join(__dirname, 'fixtures', expected);

	// return the promise
	return cli([input, args])
	.then(function(cli) {
		expect(cli.output).to.eql(fs.readFileSync(expected, 'utf8'));
		expect(cli.code).to.eql(0);
	})
	.catch(function(error) {
		expect(error.message).to.be.empty;
	});
};