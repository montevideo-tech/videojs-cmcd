export class CmcdObject {
  constructor(player) {
    this.player = player;
  }

  getEncodedBitrate() {
    try {

      // Get the bandwidth of the current quality
      const bandwidth = this.player.tech(true).vhs.playlists.media_.attributes.BANDWIDTH;

      // Get the encodedBitrate by converting the bandwidth to kbps and rounding it to an Int
      const encodedBitrate = Math.round(bandwidth / 1000);

      return encodedBitrate;
    } catch (e) {
      return undefined;
    }
  }

  getObjectDuration(uriBeingRequested) {
    try {

      // Get the current playlist
      const playlist = this.player.tech(true).vhs.playlists.media();

      // Get the current segment index
      const currentSegmentIndex = playlist.segments.findIndex(segment => segment.resolvedUri === uriBeingRequested);

      // Get the duration of the current segment, convert it to ms and round it to an int
      const currentSegmentDuration = Math.round(playlist.segments[currentSegmentIndex].duration * 1000);

      return currentSegmentDuration;

    } catch (error) {
      return undefined;
    }

  }

  getObjectType() {
    // TODO
    return undefined;
  }

  getTopBitrate() {
    try {

      // Get the list of available quality levels
      const qualitylevels = this.player.qualityLevels().levels_;

      // Get the highest bitrate
      const highestBitrate = qualitylevels.reduce(function (prev, current) {
        return (prev && prev.bitrate > current.bitrate)?prev : current;
      });

      // Get the topBitrate, convert to kbps and round it
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
      ot: this.getObjectType(),
      tb: this.getTopBitrate()
    }
  };
}
