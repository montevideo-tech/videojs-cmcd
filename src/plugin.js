import videojs from 'video.js';
import {version as VERSION} from '../package.json';
import { CmcdRequest } from './cmcdKeys/cmcdRequest';
import { CmcdObject } from './cmcdKeys/cmcdObject';
import { CmcdSession } from './cmcdKeys/cmcdSession';
import { CmcdStatus } from './cmcdKeys/cmcdStatus';
import { appendCmcdQuery } from '@svta/common-media-library/cmcd/appendCmcdQuery';
import { keyTypes } from './cmcdKeys/common.js';

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
    const {sid, cid, useHeaders} = options || {};

    this.cid = cid;
    this.sid = sid || generateUuid();
    this.useHeaders = useHeaders;

    this.player.ready(() => {
      player.addClass('vjs-cmcd');

      handleEvents(player);

      player.on('xhr-hooks-ready', () => {

        const playerXhrRequestHook = (opts) => {
          const cmcdRequest = new CmcdRequest(this.player);
          const cmcdObject = new CmcdObject(this.player);
          const cmcdSession = new CmcdSession(this.player, this.sid, this.cid);
          const cmcdStatus = new CmcdStatus(this.player);

          const keyRequest = cmcdRequest.getKeys(opts.uri, isWaitingEvent);
          const keyObject = cmcdObject.getKeys(opts.uri);
          const keySession = cmcdSession.getKeys(this.player.currentSrc());
          const keyStatus = cmcdStatus.getKeys(isWaitingEvent);

          if (this.useHeaders) {
            const headers = toHeader({
              'CMCD-Request': keyRequest,
              'CMCD-Object': keyObject,
              'CMCD-Session': keySession,
              'CMCD-Status': keyStatus
            });

            opts.beforeSend = (xhr) => {
              for (const h in headers) {
                xhr.setRequestHeader(h, headers[h]);
              }
            };
          } else {
            const cmcdKeysObject = Object.assign({}, keyRequest, keyObject, keySession, keyStatus);

            opts.uri = appendCmcdQuery(opts.uri, cmcdKeysObject);
          }

          return opts;
        };

        player.tech().vhs.xhr.onRequest(playerXhrRequestHook);
      });

    });

  }

  setId(id) {
    if (id.sid) {
      this.sid = id.sid;
    }
    if (id.cid) {
      this.cid = id.cid;
    }
  }

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

function objToString(obj) {
  const keys = Object.keys(obj);
  const keyValPair = keys.map((key) => {
    if (keyTypes[key] === 'string') {
      return `${key}="${obj[key]}"`;
    } else if (keyTypes[key] === 'boolean' && obj[key] === true) {
      return `${key}`;
    }
    return `${key}=${obj[key]}`;

  });

  return keyValPair.filter(s => !s.includes('undefined')).join(',');
}

function toHeader(cmcdHeaders) {
  const headers = {};

  for (const header in cmcdHeaders) {
    const str = objToString(cmcdHeaders[header]);

    if (str.length !== 0) {
      headers[header] = str;
    }
  }
  return headers;
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
