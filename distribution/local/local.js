const http = require('http');

const serialization = require('../util/serialization');
const id = require('../util/id');

const node = global.config;

/*

Service  Description                           Methods
status   statusrmation about the current node  get
routes   A mapping from names to functions     get, put
comm     A message communication interface     send

*/

/**
 * Represents a callback function.
 * @template T
 * @callback CallbackFunction
 * @param {(Error | false | null)} error - An error object, false if no error, or null.
 * @param {(T | false | null)} value - The value returned by the callback, false if no value, or null.
 * @returns {void}
 */

/**
 * Default callback function.
 * @type {CallbackFunction<any>}
 * @param {(Error | false | null)} e - An error object, false if no error, or null.
 * @param {(any | false | null)} v - The value returned by the callback, false if no value, or null.
 */
const defaultCallback = (e, v) => {
  if (e) {
    console.log('Error occurred while executing : ' + e.toString());
  } else {
    console.log('Results returned are : ' + v);
  }
};

const status = {
  /**
   * Retrieves the value corresponding to the provided ID.
   * @param {string} id - The identifier for the value to retrieve.
   * @param {CallbackFunction<any>} [callback=defaultCallback] - A callback function to handle the response.
   * The callback will be called with (false, value) if the ID is present, or (errorObj, false) if the ID is not found.
   * @return {void}
   */
  get: function(id, callback = defaultCallback) {

  },
};

const routes = {

  /**
   * Retrieves the details of a specified service.
   * @param {string} serviceName - The name of the service to retrieve.
   * @param {CallbackFunction<any>} [callback=defaultCallback] - A callback function to handle the response.
   * The callback is called with either an error object(first param) or the retrieved service data(as the second param).
   * @return {void}
   */
  get: function(serviceName, callback = defaultCallback) {

  },

  /**
   * Updates or adds a new service based on the provided service object.
   * @param {Object} serviceObj - The service object containing the updated or new service data.
   * @param {string} serviceName - The name of the service to update or add.
   * @param {CallbackFunction<any>} [callback=defaultCallback] - A callback function to handle the response.
   * The callback is called with either an error object(1st param) or the service object in case of a success(2nd param).
   * @return {void}
   */
  put: function(serviceObj, serviceName, callback = defaultCallback) {

  },
};

const comm = {

  /**
   * Sends a message to a remote node over HTTP. If the message is not an array, it converts it into an array before sending.
   * Serializes the message and remote details, and sends them as a PUT request.
   * @param {(Object|Array)} message - The message to send; will be wrapped in an array if not already one.
   * @param {Object} remote - The remote server details including the node's IP address and port.
   * @param {CallbackFunction<any>} [callback=defaultCallback] - Callback function that is called with the response object from the server or an error.
   * The callback receives a spread of properties(anything that is returned from the server) if deserialization is successful,
   * or the error object directly if an error occurs.
   * @return {void}
   */
  send: function(message, remote, callback = defaultCallback) {

  },
};

module.exports = {
  status: status,
  routes: routes,
  comm: comm,
};


