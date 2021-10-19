import { Peer } from '../models/Peer';
import { PeerList } from '../models/PeerList';
import { CryptoService } from '../services/crypto.service';

export abstract class AController {
    public abstract map: {
        [eventName: string]: (peer: Peer, data: any) => any
    };
    peerList: PeerList;
    cryptoService: CryptoService;

    constructor(peerList: PeerList) {
        this.peerList = peerList;
        this.cryptoService = new CryptoService();
    }
}
