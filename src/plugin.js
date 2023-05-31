import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import { CmcdRequest } from './cmcdKeys/cmcdRequest';
import { CmcdObject } from './cmcdKeys/cmcdObject';
import { CmcdSession } from './cmcdKeys/cmcdSession';
import { CmcdStatus } from './cmcdKeys/cmcdStatus';
import { showBufferlengthKey } from './cmcdKeys/common';

const Plugin = videojs.getPlugin('plugin');

let isWaitingEvent = true;

// Default options for the plugin.
const defaults = {};

/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */
class Cmcd extends Plugin {

  /**
   * Create a Cmcd plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  constructor(player, options) {
    // the parent class will add player under this.player
    super(player);
    this.options = videojs.obj.merge(defaults, options);

    const sid = generateUuid();

    this.player.ready(() => {
      player.addClass('vjs-cmcd');

      handleEvents(player);

      if (this.player.tech(true).vhs) {

        beforeRequestFunc(this.player, sid);

      } else {
        this.player.on('loadstart', () => {

          beforeRequestFunc(this.player, sid);

        });
      }
    });
  }
}

function beforeRequestFunc(player, sid) {
  // Save original beforeRequest function
  const obr = player.tech(true).vhs.xhr.beforeRequest;

  player.tech(true).vhs.xhr.beforeRequest = function(opts) {
    const cmcdRequest = new CmcdRequest(player);
    const cmcdObject = new CmcdObject(player);
    const cmcdSession = new CmcdSession(player, sid);
    const cmcdStatus = new CmcdStatus(player);

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
    // Use original beforeRequest funciton to (chain it)
    if (obr) {
      obr(opts);
    }
    return opts;
  };
}
function buildQueryString(obj) {
  let query = '';
  const sortedObj = Object.keys(obj).sort().reduce((objEntries, key) => {
    if (obj[key] !== undefined) {
      objEntries[key] = obj[key];
    }
    return objEntries;
  }, {});

  for (const [key, value] of Object.entries(sortedObj)) {
    const type = typeof value;

    if (key === 'v' && value === 1) {
      continue;
    }
    if (key === 'pr' && value === 1) {
      continue;
    }
    if (type === 'boolean' && !value) {
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

function generateUuid() {
  const uuid = new Uint8Array(16);

  for (let i = 0; i < uuid.length; i++) {
    uuid[i] = Math.floor(Math.random() * 256);
  }

  // Set the version number to 4
  uuid[6] = (uuid[6] & 0x0f) | 0x40;

  // Set the variant number to 2
  uuid[8] = (uuid[8] & 0x3f) | 0x80;

  // Convert the UUID to a string in the canonical format
  const hexDigits = Array.from(uuid, byte => byte.toString(16).padStart(2, '0'));
  const hexString = hexDigits.join('');

  return `${hexString.slice(0, 8)}-${hexString.slice(8, 12)}-4${hexString.slice(13, 16)}-${String.fromCharCode((uuid[8] & 0x0f) | 0x80)}${hexString.slice(17, 20)}-${hexString.slice(20)}`;
}

function handleEvents(player) {
  // startup
  player.on('loadedmetadata', function() {
    isWaitingEvent = false;
  });
  // seeking or buffer-empty event
  player.on('waiting', function() {
    isWaitingEvent = true;
  });
  // all it's okey
  player.on('canplay', function() {
    isWaitingEvent = false;
  });
}

// Define default values for the plugin's `state` object here.
Cmcd.defaultState = {};

// Include the version number.
Cmcd.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('cmcd', Cmcd);

export default Cmcd;
