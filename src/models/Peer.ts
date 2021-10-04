import { WebSocket } from 'ws';

export class Peer {
    id: string = undefined;
    ws: WebSocket  = undefined;

    constructor(ws: WebSocket) {
        this.ws = ws;
    }
}