export class CmcdStatus {
  constructor(player) {
    this.player = player;
  }

  getBufferStarvation(isWaitingEvent) {
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
    const res = {};

    if (isWaitingEvent !== false) {
      res.bs = this.getBufferStarvation(isWaitingEvent);
    }
    res.rtp = this.getRequestedMaximumThroughput();

    return res;
  }
}
