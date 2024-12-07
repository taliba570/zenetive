import CryptoJS from 'crypto-js';

export const generateHmac = (message: string) => {
    let hash_generated: string;
    const sharedSecretKey = process.env.SHARED_SECRET_KEY || 'bcce19a9c6e2c7a4d9aacf7685c4e5fd83142335383f2eda67d8703e966e03b7';
    if (process.env.ENCRYPTION_ALGORITHM === 'sha256') {
        hash_generated = CryptoJS.HmacSHA256(message, sharedSecretKey).toString(
            CryptoJS.enc.Hex
        );
    } else if (process.env.ENCRYPTION_ALGORITHM === 'sha512') {
        hash_generated = CryptoJS.HmacSHA512(message, sharedSecretKey).toString(
            CryptoJS.enc.Hex
        );
    } else {
        throw new Error('Unsupported encryption algorithm');
    }

    return hash_generated;
}