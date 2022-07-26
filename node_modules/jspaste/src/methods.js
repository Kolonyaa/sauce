'use strict'

const a = require('axios').default
const constants = require('./misc/constants.js').constants
const handler = require('./misc/handler.js').Handler

const invalid = ['INVALID_PARAMS_PROVIDED', '"Key" or "Secret" is invalid or missing in the parameters', 'No body provided for the document']
const request = ['ERROR_ON_REQUEST', 'An error occurred while making the request: ']


/**
 * @param key The identifier in order to find the document
 * @param secret The token to verify the document ownership
 *
 * @exception Error
 */

async function remove(key, secret) {
    if ((key || secret) == null) return handler.Error(invalid[0], invalid[1])

    await a.delete(constants.baseURL + constants.routeURL + key, {headers: {secret: secret}}).catch(e => {
        if (e.response) return handler.Error(request[0], request[1] + e.response.status + e.response.data.message ? e.response.data.message : e.message)
        else return e
    })

    return true
}


/**
 * @param key The identifier in order to find the document
 *
 * @return Boolean
 */

async function check(key) {
    if (key == null) return handler.Error(invalid[0], invalid[1])

    return Boolean(a.get(constants.baseURL + constants.routeURL + key).catch(() => false))
}


/**
 * @param key The identifier in order to find the document
 *
 * @exception Error
 */

async function get(key) {
    if (key == null) return handler.Error(invalid[0], invalid[1])

    const r = await a.get(constants.baseURL + constants.routeURL + key).catch(e => {
        if (e.response) return handler.Error(request[0], request[1] + e.response.status + e.response.data.message ? e.response.data.message : e.message)
        else return e
    })

    return r.data.data
}


/**
 * @param body The content you want to upload
 *
 * @return Promise<Error | ({url: string, key: string, secret: string})>
 * @exception Error
 */

async function publish(body) {
    if (body == null) return handler.Error(invalid[0], invalid[2])

    const r = await a.post(constants.baseURL + constants.routeURL, body).catch(e => {
        if (e.response) return handler.Error(request[0], request[1] + e.response.status + e.response.data.message ? e.response.data.message : e.message)
        else return e
    })

    return {url: constants.baseURL + '/' + r.data.key, ...r.data}
}

module.exports = {remove, check, get, publish}
