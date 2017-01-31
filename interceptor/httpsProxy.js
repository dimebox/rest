/*
 * Copyright 2017 the original author or authors
 * @license MIT, see LICENSE.txt for details
 *
 * @author Sander Remie
 * @since 2.0.1-pre
 */

'use strict';

var interceptor, nodeClient, HttpsProxyAgent;

interceptor = require('../interceptor');
nodeClient = require('../client/node');
HttpsProxyAgent = require('https-proxy-agent');

/**
 * Add support for using an HTTPS proxy in node
 *
 * Values provided to this interceptor are added to the request, if the
 * request dose not already contain the property.
 *
 * The rest/client/node client is used by default instead of the
 * common default client for the platform. This is because the module
 * that is used for proxying is a node js module, so this will only work
 * on node
 *
 * @param {Client} [client=rest/client/node] custom client to wrap
 * @param {string} [config.url] the url of the proxy, e.g. http://127.0.0.1:3128
 *
 * @returns {Client}
 */
module.exports = interceptor({
    client: nodeClient,
    init: function (config) {
        config.url = config.url || undefined;
        return config;
    },
    request: function (request, config) {
        if (config.url) {
            request.agent = new HttpsProxyAgent(config.url);
        }
        return request;
    }
});
