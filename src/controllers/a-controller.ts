import { Peer } from '../models/Peer';
import { PeerList } from '../models/PeerList';

export abstract class AController {
    public abstract map: {
        [eventName: string]: (peer: Peer, data: any) => any
    };
    peerList: PeerList;

    constructor(peerList: PeerList) {
        this.peerList = peerList;
    }
}
