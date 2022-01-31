import * as crypto from 'crypto';

export class CryptoService {

    constructor() {
    }

    generateKeyPair(): crypto.KeyPairKeyObjectResult {
        const pair = crypto.generateKeyPairSync('rsa', {
          // The standard secure default length for RSA keys is 2048 bits
          modulusLength: 2048
        });
        return pair;
    }

    encryptData(data: string) {
        
    }

    decryptData(data: string) {}

    generateJWT(data: any) {
        const stringifiedData = JSON.stringify(data);

    }

    parseJWT(jwt: string) {}


}