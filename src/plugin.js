import videojs from 'video.js';
import list from '../listOfVideos.js';
import { version as VERSION } from '../package.json';
import { CmcdRequest } from './cmcdKeys/cmcdRequest';

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

    this.ready(() => {
      this.addClass('vjs-cmcd');

      this.tech().vhs.xhr.beforeRequest = function(opts) {
        const cmcdRequest = new CmcdRequest(player);
        const keyRequest = cmcdRequest.getKeys();

        opts.uri += `?CMCD=${encodeURIComponent('a=b')}`;
        return opts;
      };
    });
  }
}

function buildQueryString(obj) {
  var query = '';

  // TODO: sort obj elements
  for (const [key, value] of Object.entries(obj)) {
    query += `${key}=${value},`;

  }
  return query.slice(0, -1);
}

// Define default values for the plugin's `state` object here.
// Cmcd.defaultState = {};

// Include the version number.
Cmcd.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('cmcd', Cmcd);

export default Cmcd;
