import videojs from 'video.js';
import { version as VERSION } from '../package.json';
import { CmcdRequest } from './cmcdKeys/cmcdRequest';
import { CmcdObject } from './cmcdKeys/cmcdObject';
import { CmcdSession } from './cmcdKeys/cmcdSession';
<<<<<<< HEAD
import { CmcdStatus } from './cmcdKeys/cmcdStatus';
=======
import { showBufferlengthKey } from './cmcdKeys/common';
>>>>>>> develop
import crypto from 'crypto';

let isWaitingEvent = true;

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Cmcd {

  /**
   * Create a Cmcd plugin instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(options) {
    this.options = videojs.obj.merge(defaults, options);
    const player = this;
    const sid = crypto.randomUUID();

    this.ready(() => {
      this.addClass('vjs-cmcd');

      const cmcdRequest = new CmcdRequest(player);
      const cmcdObject = new CmcdObject(player);
      const cmcdSession = new CmcdSession(player, sid);
      const cmcdStatus = new CmcdStatus(player);

      handleEvents(player);

      this.tech(true).vhs.xhr.beforeRequest = function (opts) {
        const keyRequest = cmcdRequest.getKeys(opts.uri, isWaitingEvent);
        const keyObject = cmcdObject.getKeys(opts.uri);
        const keySession = cmcdSession.getKeys(player.currentSrc());
        const keyStatus = cmcdStatus.getKeys(isWaitingEvent);

        const cmcdKeysObject = Object.assign({}, keyRequest, keyObject, keySession, keyStatus);

        if (opts.uri.match(/\?./)) {
          opts.uri += `&CMCD=${buildQueryString(cmcdKeysObject)}`;
        } else {
          opts.uri += `?CMCD=${buildQueryString(cmcdKeysObject)}`;
        }
        return opts;
      };

    });
  }
}

function buildQueryString(obj) {
  let query = '';
  const sortedObj = Object.keys(obj).sort().reduce((objEntries, key) => {
    if (obj[key] !== undefined) {
      objEntries[key] = obj[key];
    }
    return objEntries;
  }, {});

  console.log(sortedObj);
  for (const [key, value] of Object.entries(sortedObj)) {
    const type = typeof value;

    if (key === 'v' && value === 1) {
      continue;
    }
    if (key === 'pr' && value === 1) {
      continue;
    }
    if (type ===  'boolean' && !value) {
      continue;
    }
    if (key === 'bl' && !showBufferlengthKey(sortedObj)) {
      continue;
    }
  
    // Add condition of buffer length
    // Add condition of buffer starvation

    if (key === 'ot' || key === 'sf' || key === 'st') {
      query += `${key}=${value},`;
    } else if (type === 'boolean') {
      query += `${key},`;
    } else {
      query += `${key}=${JSON.stringify(value)},`;
    }
  }
  return encodeURIComponent(query.slice(0, -1));
}

function handleEvents(player) {
  // startup
  player.on('loadedmetadata', function () {
    isWaitingEvent = false;
  });
  // seeking or buffer-empty event
  player.on('waiting', function () {
    isWaitingEvent = true;
  });
  // all it's okey
  player.on('canplay', function () {
    isWaitingEvent = false;
  });
}

// Define default values for the plugin's `state` object here.
// Cmcd.defaultState = {};

// Include the version number.
Cmcd.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('cmcd', Cmcd);

export default Cmcd;
