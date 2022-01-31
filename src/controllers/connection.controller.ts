import { v4 as uuid } from 'uuid';

import { Peer } from '../models/Peer';
import { AController } from './a-controller';


export class ConnectionController extends AController {
    map = {
        userConnection: (peer: Peer, data: { alias: string }) => {
            // When someone tries to connect.
            // Generate a unique id for them & send it.
            const id = uuid();
            peer.id = id;
            peer.alias = data.alias;
            const payload = JSON.stringify({
                event: 'userConnected',
                data: { id }
            });
            peer.ws.send(payload);
            this.peerList.addPeer(peer);
        }
    };

}
