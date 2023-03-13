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

    obtainKeys() {
        return {
            bs: getBufferStarvation(),
            rtp: getRequestedMaximumThroughput()
        }   
    }
}