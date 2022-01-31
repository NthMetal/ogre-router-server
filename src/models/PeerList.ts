import { Peer } from './Peer';

export class PeerList {
    peerMap: { [id: string]: Peer } = {};

    constructor() {}

    addPeer(peer: Peer) {
        this.peerMap[peer.id] = peer;
        /** Update all connected peers that a new peer has joined */
        this.broadcastPeerlist();
    }

    removePeer(peer: Peer) {
        this.peerMap[peer.id] = undefined;
        /** Update all connected peers that a peer has left */
        this.broadcastPeerlist();
    }

    getPeerById(id: string): Peer | undefined {
        return this.peerMap[id];
    }

    broadcastPeerlist() {
        const list = Object.values(this.peerMap).reduce((acc, peer) => {
            if (peer) {
                acc.push({
                    id: peer.id,
                    alias: peer.alias
                });
            }
            return acc;
        }, []);
        this.broadcast({
            event: 'peerlist',
            data: list
        });
    }

    broadcast(message) {
        Object.values(this.peerMap).forEach(peer => {
            if (peer) peer.ws.send(JSON.stringify(message));
        });
    }
}
