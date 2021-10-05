import { Peer } from './Peer';

export class PeerList {
    list: Peer[] = [];

    constructor() {}

    addPeer(peer: Peer) {
        this.list.push(peer);
        /** Update all connected peers that a new peer has joined */
        this.broadcastPeerlist();
    }

    removePeer(peer: Peer) {
        this.list.splice(this.list.indexOf(peer), 1);
        /** Update all connected peers that a peer has left */
        this.broadcastPeerlist();
    }

    broadcastPeerlist() {
        this.broadcast({
            event: 'peerlist',
            data: this.list.map(peer => ({
                id: peer.id,
                alias: peer.alias
            }))
        });
    }

    broadcast(message) {
        this.list.forEach(peer => {
            peer.ws.send(JSON.stringify(message));
        })
    }
}