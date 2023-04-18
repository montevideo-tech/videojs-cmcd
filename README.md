<h3 align="left">
	<b>
	  <a href="https://montevideotech.dev/summer-camp-2023/"><img decoding="async" width="300"  src="https://montevideotech.dev/wp-content/uploads/2020/09/mvd-tech-02-1024x653.png" ></a><br>
  </b>
</h3>

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [videojs-cmcd](#videojs-cmcd)
- [Installation](#installation)
- [Usage](#usage)
  - [`<script>` Tag](#script-tag)
  - [Browserify/CommonJS](#browserifycommonjs)
  - [RequireJS/AMD](#requirejsamd)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## videojs-cmcd

A [video.js][videojs] plugin for adding Common-Media-Client-Data (CMCD) to the player requests.

For more information about the CMCD keys implemented and how are they obtained read this documentation [here][wiki].

Note: 
This CMCD keys will not be implemented for the first release:

- Requested maximum throughput
- Next range request

## Installation

Instal the plugin and dependencies:

```sh
npm i @montevideo-tech/videojs-cmcd
```

## Usage

To include videojs-cmcd on your website or web application, use any of the following methods.

Install videojs-cmcd via npm and `import` the plugin as you would any other module, then instance the player with cmcd().

```js
import  '@montevideo-tech/videojs-cmcd'

const player = playerRef.current = videojs(videoElement, options, () => {
    videojs.log('player is ready');
    onReady && onReady(player);
});

player.cmcd();
```

### `<script>` Tag

This is the simplest case. Get the script in whichever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-cmcd.min.js"></script>
<script>
  var player = videojs('my-video');

  player.cmcd();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-cmcd via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-cmcd');

var player = videojs('my-video');

player.cmcd();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whichever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-cmcd'], function(videojs) {
  var player = videojs('my-video');

  player.cmcd();
});
```

## License

Apache-2.0. Copyright (c)

[videojs]: http://videojs.com/
[wiki]: https://github.com/montevideo-tech/videojs-cmcd/wiki/CMCD-key-values-information
