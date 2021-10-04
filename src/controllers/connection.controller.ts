import { Peer } from '../models/Peer';
import { AController } from './a-controller';

export class ConnectionController extends AController {
    map = {
        userConnection: (peer: Peer, data: { id: string }) => {
            peer.id = data.id;
            console.log('adding peer: ', peer.id);
            this.peerList.addPeer(peer);
        }
    };

}
