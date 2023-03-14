export class CmcdObject {
  constructor(player) {
    this.player = player; 
  }

  getEncodedBitrate() {
    //TODO
  }

  getObjectDuration() {
    //TODO
  }

  getObjectType() {
    //TODO
  }

  getTopBitrate() {
    //TODO
  }

  getKeys() {
    return {
      br: getEncodedBitrate(),
      d: getObjectDuration(),
      ot: getObjectType(),
      tb: getTopBitrate()
    }
  }
}