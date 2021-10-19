import { Peer } from '../models/Peer';
import { AController } from './a-controller';

export class SignalController extends AController {
    map = {
        sendOffer: (peer: Peer, data: { target: string, offer: any }) => {
            const foundTarget = this.peerList.getPeerById(data.target);
            if (foundTarget) {
                const payload = JSON.stringify({
                    event: 'getOffer',
                    data: {
                        source: peer.id,
                        offer: data.offer
                    }
                });
                foundTarget.ws.send(payload);
            }
        },
        sendAnswer: (peer, data: { target: string, answer: any }) => {
            const foundTarget = this.peerList.getPeerById(data.target);
            if (foundTarget) {
                const payload = JSON.stringify({
                    event: 'getAnswer',
                    data: {
                        source: peer.id,
                        answer: data.answer
                    }
                });
                foundTarget.ws.send(payload);
            }
        }
    };

}
