import { Peer } from '../models/Peer';
import { AController } from './a-controller';

export class ConnectionController extends AController {
    map = {
        userSignature: (peer: Peer, data: { id: string, alias: string, signature: string, updates?: { alias: string } }) => {
            // verify signature if it exists
            // create it otherwise
            peer.id = data.id;
            peer.alias = data.alias;
            if (data?.updates?.alias) peer.alias = data.updates.alias;
            const newSignature = `Sig[${data.id}][${peer.alias}]Sig`;
            const payload = JSON.stringify({
                event: 'userSignature',
                data: {
                    id: peer.id,
                    signature: newSignature
                }
            });
            peer.ws.send(payload);
            // console.log('p')
            this.peerList.broadcastPeerlist();
        },
        userConnection: (peer: Peer, data: { id: string, alias: string, signature: string }) => {
            // verify signature if it exists
            peer.id = data.id;
            peer.alias = data.alias;
            this.peerList.addPeer(peer);
        }
    };

}
