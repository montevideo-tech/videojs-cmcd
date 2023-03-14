import { roundedToNearstHundredth } from './common';

export class CmcdRequest {
  constructor(player) {
    this.player = player;
    this.vhs = player.tech().vhs;
  }

  getBufferLength() { //This key SHOULD only be sent with an object type of ‘a’, ‘v’ or ‘av’.
    try {
      const tech = this.player.tech(true);
      const buffered = tech.buffered(); 
      var bufferLength = 0;

      if (buffered.length > 0) {
        const lastBufferedTime = buffered.end(buffered.length - 1);

        if (!isNaN(lastBufferedTime)) { 
          bufferLength = lastBufferedTime - tech.currentTime();
        }
      }

      const bufferLengthMs = bufferLength.toFixed(2)*1000;
      return bufferLengthMs;
    }
    catch(e) {
      return undefined;
    }
    
  }

  getDeadline() {
    try {
      const bufferLength = this.getBufferLength();
      const playbackRate = this.player.playbackRate()*1000;
      return Math.round(bufferLength / playbackRate);
    }
    catch(e) {
      return undefined;
    }
  }

  getMeasuredThroughput() {
    try {
      const bandwidth = Math.round(this.vhs.systemBandwidth / 1000);
      return bandwidth;
    }
    catch(e) {
      return undefined;
    }
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
      bl: roundedToNearstHundredth(this.getBufferLength()),
      dl: roundedToNearstHundredth(this.getDeadline()),
      mtp: roundedToNearstHundredth(this.getMeasuredThroughput()),
      nor: this.getNextObjectRequest(),
      nrr: this.getNextRangeRequest(),
      su: this.getStartup()
    }
  }
}