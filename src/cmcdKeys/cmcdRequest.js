export class CmcdRequest {
  constructor(player) {
    this.player = player
  }

  getBufferLength() {
    //TODO
    return undefined;
  }

  getDeadline() {
    //TODO
    return undefined;
  }

  getMeasuredThroughput() {
    //TODO
    return undefined;
  }

  getNextObjectRequest() {
    //TODO
    return undefined;
  }

  getNextRangeRequest() {
    //TODO
    return undefined;
  }

  getStartup() {
    //TODO
    return undefined;
  }

  getKeys() {
    return {
      bl: this.getBufferLength(),
      dl: this.getDeadline(),
      mtp: this.getMeasuredThroughput(),
      nor: this.getNextObjectRequest(),
      nrr: this.getNextRangeRequest(),
      su: this.getStartup()
    }
  }
}