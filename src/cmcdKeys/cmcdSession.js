export class CmcdSession {
  constructor(player) {
    this.player = player;
  }

  getContentId() {
    //TODO
  }

  getPlaybackRate() {
    //TODO
  }

  getStreamingFormat() {
    //TODO
  }

  getSessionId() {
    //TODO
  }

  getStreamType() {
    //TODO
  }

  getVersion() {
    //TODO
  }

  getKeys() {
    return {
      cid: getContentId(),
      pr: getPlaybackRate(),
      sf: getStreamingFormat(),
      sid: getSessionId(),
      st: getStreamType(),
      v: getVersion()
    }  
  }
}