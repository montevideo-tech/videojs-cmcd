export class CmcdSession {
  constructor(player) {
    this.player = player;
  }

  getContentId() {
    //TODO
    return undefined;
  }

  getPlaybackRate() {
    //TODO
    return undefined;
  }

  getStreamingFormat() {
    //TODO
    return undefined;
  }

  getSessionId() {
    //TODO
    return undefined;
  }

  getStreamType() {
    //TODO
    return undefined;
  }

  getVersion() {
    //TODO
    return undefined;
  }

  getKeys() {
    return {
      cid: this.getContentId(),
      pr: this.getPlaybackRate(),
      sf: this.getStreamingFormat(),
      sid: this.getSessionId(),
      st: this.getStreamType(),
      v: this.getVersion()
    }
  }
}