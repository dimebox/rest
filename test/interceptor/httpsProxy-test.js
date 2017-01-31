/*
 * Copyright 2017 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Sander Remie
 */

(function (buster, define) {
	'use strict';

	var assert, refute, fail;

	assert = buster.assertions.assert;
	refute = buster.assertions.refute;
	fail = buster.assertions.fail;

	define('rest-test/interceptor/httpsProxy-test', function (require) {

		var httpsProxy, rest, nodeClient, when;

		httpsProxy = require('rest/interceptor/httpsProxy');
		nodeClient = require('rest/client/node');
		rest = require('rest');
		when = require('when');

		buster.testCase('rest/interceptor/httpsProxy', {
			'should add agent option if proxy url is set': function () {
				var client = httpsProxy(
					function (request) { return { request: request }; },
					{ url: 'http://127.0.0.1:3128' }
				);
				return client({}).then(function (response) {
					assert.equals('http://127.0.0.1:3128/', response.request.agent.proxy.href);
				})['catch'](fail);
			},
			'should support interceptor wrapping': function () {
				assert(typeof httpsProxy().wrap === 'function');
			}
		});

	});

}(
	this.buster || require('buster'),
	typeof define === 'function' && define.amd ? define : function (id, factory) {
		var packageName = id.split(/[\/\-]/)[0], pathToRoot = id.replace(/[^\/]+/g, '..');
		pathToRoot = pathToRoot.length > 2 ? pathToRoot.substr(3) : pathToRoot;
		factory(function (moduleId) {
			return require(moduleId.indexOf(packageName) === 0 ? pathToRoot + moduleId.substr(packageName.length) : moduleId);
		});
	}
	// Boilerplate for AMD and Node
));
