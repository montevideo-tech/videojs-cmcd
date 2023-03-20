import { roundedToNearstHundredth } from './common';

export class CmcdRequest {
  constructor(player) {
    this.player = player;
    this.vhs = player.tech(true).vhs;
  }

  bufferLengthMs() {
    try {
      let bufferLength = 0;
      const tech = this.player.tech(true);
      const buffered = tech.buffered();

      if (buffered.length > 0) {
        const lastBufferedTime = buffered.end(buffered.length - 1);

        if (!isNaN(lastBufferedTime)) {
          bufferLength = lastBufferedTime - tech.currentTime();
        }
      }

      const bufferLengthMs = bufferLength * 1000;

      return bufferLengthMs;
    } catch(e) {
      return undefined;
    }
  }

  getBufferLength() { 
    // This key SHOULD only be sent with an object type of ‘a’, ‘v’ or ‘av’.
    try {
      const bufferLengthMs = this.bufferLengthMs();

      return roundedToNearstHundredth(bufferLengthMs);
    } catch (e) {
      return undefined;
    }
    
  }

  getDeadline() {
    try {
      const bufferLength = this.bufferLengthMs();
      const playbackRate = this.player.playbackRate()*1000;
      const deadline = Math.round(bufferLength / playbackRate);
      return roundedToNearstHundredth(deadline);
    } catch(e) {
      return undefined;
    }
  }

  getMeasuredThroughput() {
    try {
      const bandwidth = Math.round(this.vhs.systemBandwidth / 1000);

      return roundedToNearstHundredth(bandwidth);
    } catch(e) {
      return undefined;
    }
  }

  getNextObjectRequest() {
    // TODO
    return undefined;
  }

  getNextRangeRequest() {
    // TODO
    return undefined;
  }

  getStartup() {
    // TODO
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
  };
}
