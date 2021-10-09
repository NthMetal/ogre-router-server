import { WebSocketServer } from 'ws';

import { ConnectionController } from './controllers/connection.controller';
import { SignalController } from './controllers/signal.controller';
import { Peer } from './models/Peer';
import { PeerList } from './models/PeerList';

const wss = new WebSocketServer({
    port: 8080
});
wss.on('listening', () => {
    console.log('Signaling server started...');
});

const peerList = new PeerList();

const controllers = {
    ...(new ConnectionController(peerList)).map,
    ...(new SignalController(peerList)).map
};

wss.on('connection', ws => {
    const me = new Peer(ws);
    console.log('Peer Connected');

    ws.on('message', (message: string) => {
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            console.error('TODO HANDLE ERROR Invalid JSON');
        }
        if (!parsedMessage || !parsedMessage.event) return;
        const handler = controllers[parsedMessage.event];
        if (handler) {
            handler(me, parsedMessage.data);
        }
    });

    ws.on('close', function closed() {
        peerList.removePeer(me);
    });

});
