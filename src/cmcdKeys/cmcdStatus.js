export class CmcdStatus {
  constructor(player) {
    this.player = player;
  }

  getBufferStarvation() {
    //TODO
    return undefined;
  }

  getRequestedMaximumThroughput() {
    //TODO
    return undefined;
  }

  getKeys() {
    return {
      bs: this.getBufferStarvation(),
      rtp: this.getRequestedMaximumThroughput()
    }
  }
}