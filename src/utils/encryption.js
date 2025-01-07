import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.SECRET_KEY;
const IV = process.env.IV;

export const encodeBase64 = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

export const decodeBase64 = (base64Text) => {
    const bytes = CryptoJS.enc.Base64.parse(base64Text);
    return bytes.toString(CryptoJS.enc.Utf8);
};

export const encryptAES = (text) => {
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
};

export const decryptAES = (encryptedText) => {
    const decrypted = CryptoJS.AES.decrypt(encryptedText, CryptoJS.enc.Utf8.parse(SECRET_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
};
