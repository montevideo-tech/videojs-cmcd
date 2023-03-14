export class CmcdObject {
  constructor(player) {
    this.player = player;
  }

  getEncodedBitrate() {
    //TODO
    return undefined;
  }

  getObjectDuration() {
    //TODO
    return undefined;
  }

  getObjectType() {
    //TODO
    return undefined;
  }

  getTopBitrate() {
    //TODO
    return undefined;
  }

  getKeys() {
    return {
      br: this.getEncodedBitrate(),
      d: this.getObjectDuration(),
      ot: this.getObjectType(),
      tb: this.getTopBitrate()
    }
  }
}