import { WebSocket } from 'ws';

export class Peer {
    
    id: string = undefined;
    alias: string;
    signature: string;

    ws: WebSocket  = undefined;

    constructor(ws: WebSocket) {
        this.ws = ws;
    }
}