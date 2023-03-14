export class CmcdStatus {
  constructor(player) {
    this.player = player;
  }

  getBufferStarvation() {
    //TODO
  }

  getRequestedMaximumThroughput() {
    //TODO
  }

  getKeys() {
    return {
      bs: getBufferStarvation(),
      rtp: getRequestedMaximumThroughput()
    }   
  }
}