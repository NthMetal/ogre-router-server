import { Peer } from '../models/Peer';
import { AController } from './a-controller';

export class ConnectionController extends AController {
    map = {
        userConnection: (peer: Peer, data: { id: string, alias: string, signature: string }) => {
            // verify signature if it exists
            // create it otherwise
            const updatedSignature = data.signature;
            peer.id = data.id;
            console.log('adding peer: ', peer.id);
            const payload = JSON.stringify({
                event: 'userAcknowledged',
                data: {
                    id: peer.id,
                    signature: updatedSignature
                }
            });
            peer.ws.send(payload);
            peer.alias = data.alias;
            peer.signature = peer.signature;
            this.peerList.addPeer(peer);
        }
    };

}
