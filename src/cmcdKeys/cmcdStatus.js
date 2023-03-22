export class CmcdStatus {
  constructor(player) {
    this.player = player;
  }

  getBufferStarvation(isWaitingEvent) {
    // TODO
    try {
      return isWaitingEvent;
    } catch (e) {
      return undefined;
    }
  }

  getRequestedMaximumThroughput() {
    // TODO
    return undefined;
  }

  getKeys(isWaitingEvent) {
    return {
      bs: this.getBufferStarvation(isWaitingEvent),
      rtp: this.getRequestedMaximumThroughput()
    };
  }
}
