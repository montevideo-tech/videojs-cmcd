export class CmcdObject {
  constructor(player) {
    this.player = player;
  }

  getEncodedBitrate() {
    try {

      const bandwidth = this.player.tech(true).vhs.playlists.media_.attributes.BANDWIDTH;

      const encodedBitrate = Math.round(bandwidth / 1000);

      return encodedBitrate;
    } catch (e) {
      return undefined;
    }
  }

  getObjectDuration(uriBeingRequested) {
    try {

      const playlist = this.player.tech(true).vhs.playlists.media();

      const currentSegmentIndex = playlist.segments.findIndex(segment => segment.resolvedUri === uriBeingRequested);

      const currentSegmentDuration = Math.round(playlist.segments[currentSegmentIndex].duration * 1000);

      return currentSegmentDuration;

    } catch (error) {
      return undefined;
    }

  }

  getObjectType(uriBeingRequested) {
    try {

      const extension = uriBeingRequested.split('.').pop();

      const supportedExtensions = {
        // Manifest or playlist
        m3u8: 'm',
        mpd: 'm',
        xml: 'm',
        // Audio Only
        m4a: 'a',
        amp3ac: 'a',
        aac: 'a',
        caf: 'a',
        flac: 'a',
        oga: 'a',
        wav: 'a',
        // Video Only
        opus: 'v',
        ogv: 'v',
        mp4: 'v',
        mov: 'v',
        m4v: 'v',
        mkv: 'v',
        webm: 'v',
        ogg: 'v',
        flv: 'v',
        // Muxed audio and video
        ts: 'av',
        // Init segment not implemented
        // Caption
        webvtt: 'c',
        vtt: 'c',
        // ISOBMFF timed text track not implemented
        // Cryptographic key, license or certificate not implemented
        // Other
        jpg: 'o',
        jpeg: 'o',
        gif: 'o',
        png: 'o',
        svg: 'o',
        webp: 'o'
      };

      if (supportedExtensions.hasOwnProperty(extension)) {
        return supportedExtensions[extension];
      }
      return undefined;

    } catch (error) {
      return undefined;
    }
  }

  getTopBitrate() {
    try {

      const qualitylevels = this.player.qualityLevels().levels_;

      const highestBitrate = qualitylevels.reduce(function(prev, current) {
        return (prev && prev.bitrate > current.bitrate) ? prev : current;
      });

      const topBitrate = Math.round(highestBitrate.bitrate / 1000);

      return topBitrate;

    } catch (error) {

      return undefined;
    }
  }

  getKeys(uriBeingRequested) {
    return {
      br: this.getEncodedBitrate(),
      d: this.getObjectDuration(uriBeingRequested),
      ot: this.getObjectType(uriBeingRequested),
      tb: this.getTopBitrate()
    };
  }
}
