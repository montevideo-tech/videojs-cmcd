export class CmcdSession {
  constructor(player, sid) {
    this.player = player;
    this.sid = sid;
  }

  generateHashCode(string) {
    let hash = 0;

    if (string.length === 0) {
      return hash;
    }
    for (let i = 0; i < string.length; i++) {
      const chr = string.charCodeAt(i);

      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }

  getContentId(src) {
    try {
      const cid = this.generateHashCode(src);

      return cid.toString();
    } catch (e) {
      return undefined;
    }
  }

  getPlaybackRate() {
    try {
      const rate = this.player.playbackRate();

      if (rate === 1) {
        return 1;
      } else if (rate === 0) {
        return 0;
      }
      return 2;
    } catch (e) {
      return undefined;
    }
  }

  getStreamingFormat() {
    try {
      const type = this.player.currentType();

      if (type === 'application/dash+xml') {
        return 'd';
      } else if (type === 'application/x-mpegURL') {
        return 'h';
      } else if (type === 'application/vnd.ms-sstr+xml') {
        return 's';
      } return 'o';
    } catch (e) {
      return undefined;
    }
  }

  getStreamType() {
    try {
      if (this.player.duration() === 'infinite') {
        return 'v';
      } return 'l';
    } catch (e) {
      return undefined;
    }
  }

  getVersion() {
    return 1;
  }

  getKeys(src) {
    return {
      cid: this.getContentId(src),
      pr: this.getPlaybackRate(),
      sf: this.getStreamingFormat(),
      sid: this.sid,
      st: this.getStreamType(),
      v: this.getVersion()
    };
  }
}
