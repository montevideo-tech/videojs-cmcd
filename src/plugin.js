import videojs from 'video.js';
import { version as VERSION } from '../package.json';

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
    this.options = videojs.mergeOptions(defaults, options);

    this.ready(() => {
      this.addClass('vjs-cmcd');
    });
  }
}

// Define default values for the plugin's `state` object here.
// Cmcd.defaultState = {};

// Include the version number.
Cmcd.VERSION = VERSION;

// Register the plugin with video.js.
videojs.registerPlugin('cmcd', Cmcd);

export default Cmcd;
