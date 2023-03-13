export class CmcdSession {
    constructor(player) {
        this.player = player;
    }

    getContentId() {
        //TODO
    }

    getPlaybackRate() {
        //TODO
    }

    getStreamingFormat() {
        //TODO
    }

    getSessionId() {
        //TODO
    }

    getStreamType() {
        //TODO
    }

    getVersion() {
        //TODO
    }

    obtainKeys() {
        return {
            cid: getContentId(),
            pr: getPlaybackRate(),
            sf: getStreamingFormat(),
            sid: getSessionId(),
            st: getStreamType(),
            v: getVersion()
        }  
    }
}