export class CmcdRequest {
  constructor(player) {
    this.player = player
  }

  getBufferLength() {
    //TODO
  }

  getDeadline() {
    //TODO
  }

  getMeasuredThroughput() {
    //TODO
  }

  getNextObjectRequest() {
    //TODO
  }

  getNextRangeRequest() {
    //TODO
  }

  getStartup() {
    //TODO
  }

  getKeys() {
    return {
      bl: getBufferLength(),
      dl: getDeadline(),
      mtp: getMeasuredThroughput(),
      nor: getNextObjectRequest(),
      nrr: getNextRangeRequest(),
      su: getStartup()
    }
  }
}