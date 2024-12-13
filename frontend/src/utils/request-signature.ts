import CryptoJS from 'crypto-js';

export const generateHmac = (message: string) => {
    let hash_generated: string;
    const sharedSecretKey = process.env.SHARED_SECRET_KEY || 'e8863739d6e33d742c6892382be9ba6ca038ea0f051672b30a425e607bde8ac2';
    hash_generated = CryptoJS.HmacSHA256(message, sharedSecretKey).toString(
        CryptoJS.enc.Hex
    );
    
    return hash_generated;
}