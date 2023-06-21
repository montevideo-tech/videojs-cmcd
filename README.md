# videojs-cmcd

  

A [video.js][videojs] plugin for adding Common-Media-Client-Data (CMCD) to the player requests.

  

## Content

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation and Usage](#installation-and-usage)
  - [Vanilla Javascript](#vanilla-javascript)
  - [NPM](#npm)
  - [Usage](#usage)
- [CMCD Standard implementation status](#cmcd-standard-implementation-status)
- [Contributing](#contributing)
  - [Setup your development environment](#setup-your-development-environment)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

  
  

## Installation and Usage

### Vanilla Javascript

  

This is the simplest case. Get the script in whichever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available. Yoy can copy past the next `<script>` tag

  

```html

<script  src='https://cdn.jsdelivr.net/npm/@montevideo-tech/videojs-cmcd@latest/dist/videojs-cmcd.min.js'></script>

```

  

Then you will have to initalize the plugin after the creation of the player.

  

```html

<script>

var  player = videojs('my-video');

player.cmcd();

</script>

```

  

This is a complete example the plugin.

  

```html

<html>

  

<head>

<title>videojs-cmcd demo</title>

<link  href="https://vjs.zencdn.net/8.3.0/video-js.css"  rel="stylesheet">

</head>

  

<body>

<video  id="videojs-cmcd-player"  class="video-js vjs-default-skin"  controls></video>

  

<script  src="https://vjs.zencdn.net/8.3.0/video.min.js"></script>

<script  src="https://cdn.jsdelivr.net/npm/@montevideo-tech/videojs-cmcd@latest/dist/videojs-cmcd.min.js"></script>

<script>

// Init the palyer

var  player = videojs('videojs-cmcd-player');

  

// Init the CMCD Plugin

player.cmcd();

// Load a video

player.src("https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8");

</script>

</body>

  

</html>

```

  

### NPM

Install the plugin using npm in your project.

```bash

npm  i  @montevideo-tech/videojs-cmcd

```

  
### Usage

To use the plug-in, instance the player and then initialize it.

```js

import  videojs  from  'video.js';
import  '@montevideo-tech/videojs-cmcd'
  
var  player = videojs('videojs-cmcd-player');

player.cmcd({sid:'SessionID', cid:'ContentID'});

```
> **_NOTE:_**  You can use the instance of the plugin to set the CID and SID parameters as it's shown above.

You can also use the plugin function ````SetId()```` to set a Session ID or a Content ID dinamically.
```js
player.cmcd().setId({sid: 'SessionID', cid: 'ContentID'});
```
  

## CMCD Standard implementation status

This table provides information about the CMCD keys, how they are obtained, the difficulty of doing so and if they are implemented or even required.

|Description|Key Name|Header Name|Type and Unit|How to obtain it's value|Comments and calculation|Easy / Diff|Implemented
|--|--|--|--|--|--|--|--|
|Encoded bitrate|br|CMCD-Object|Integer kbps | in vhs, playlists.media, attributes.BANDWIDTH property | Change the unit of BANDWIDTH from bps to kbps (/1000) | Diff | Yes
|Buffer length|bl|CMCD-Request|Integer milliseconds | in tech() buffered().length, buffered().end(index) and currentTime() properties | Use the last saved segment index as a parameter that receives the end() method, and with the result, subtract it from the current time position of the player | Diff | Yes
|Buffer starvation|bs|CMCD-Status|Boolean |'loadedmetadata' and 'waiting' events | Not taken into account when not initialized | Diff | Yes
|Content ID|cid|CMCD-Session|String | If not specified it will be a hash of the MPD/M3U8 URL| This idea is implemented on dash.js plugin |Diff| Yes
|Object duration|d|CMCD-Object|Integer milliseconds | in vhs playlists.media, segments[index].duration property|Use the segment index. * 1000 to convert to milliseconds | Diff | Yes
|Deadline|dl|CMCD-Request|Integer milliseconds| "player.playbackRate()" method | (bufferLength / playbackRate) * 1000, bufferLength as obtained in bl key | Diff | Yes
|Measured throughput|mtp|CMCD-Request|Integer kilobits per second (kbps)| in tech, vhs.systemBandwidth property | change the unit of systemBandwidth from bps to kbps (/1000) | Easy | Yes
|Next object request|nor|CMCD-Request|String | in vhs, playlists.media, segments property | For VOD: Use the property to find the segment that is being requested and keep the next one. The relative path is in segments[i].uri Note: does not work in Live streams | Diff | Yes (no Live Streams)
|Next range request|nrr|CMCD-Request|String of the form "\<range-start>-<range-end\>"|Unknown |It will not be implemented| Diff | No 
|Object type|ot|CMCD-Object|Token - one of [m, a,v,av,i,c,tt,k,o]| Use the request uri file extension (.m3u8, .ts, etc.) | This implementation is temporary for the first Version of the PlugIn | Diff | Yes
|Playback rate|pr|CMCD-Session|Decimal| "player.playbackRate()" method | |Easy| Yes
|Requested maximum throughput|rtp|CMCD-Status|Integer kilobits per second (kbps) | Unknown | It will not be implemented for the first release | Diff | No 
|Streaming format|sf|CMCD-Session|Token - one of [d,h,s,o]| "player.currentType()" method | VideoJS does not support smooth streaming | Easy | Yes
|Session ID|sid|CMCD-Session|String| A function that create an universally unique identifiers (UUID)| We use crypto.randomUUID(), have to check what other implementations do | Easy | Yes
|Stream type|st|CMCD-Session|Token - one of [v,l]| if "player.duration()" is infinite then it's live, otherwise it's VOD  |  | Easy | Yes
|Startup|su|CMCD-Request|Boolean| 'loadedmetadata' and 'waiting' events | Debt: find a method to identify "recovery after a buffer-empty event" | Diff | Yes  
|Top bitrate|tb|CMCD-Object|Integer Kbps| Extract highest bandwidth possible in the manifest | Have to investigate what other implementations do | Diff | Yes
|CMCD version|v|CMCD-Session|Integer |Currently there is only one version available which is version 1 | Ommited according to CTA-5004 specs | Easy | Yes :)

## Contributing

We welcome contributions from the community. To contribute to the project, follow these steps:

1. Fork the repository.

2. Check the active issues and project board to see what we're working on.

3. Create a new branch for your feature or bug fix.

4. Make your changes.

5. Submit a pull request.

### Setup your development environment

1. Install all the packages dependencies: `npm install`

2. Build the plugin and keep watching for changes in the source code: `npm run start`

3. Open in a browser the `index.html` to test your changes in the code. Remember to refresh the page each time you make a change in the source code.

4. The `index.html` page has the [cmcd-validator](https://github.com/montevideo-tech/cmcd-validator/) installed, open the console of your browser to find errors in the CMCD implementation.

## License

Apache-2.0. Copyright (c)

[videojs]: http://videojs.com/

[wiki]: https://github.com/montevideo-tech/videojs-cmcd/wiki/CMCD-key-values-information
