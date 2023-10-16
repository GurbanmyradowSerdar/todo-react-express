import CryptoJS from "crypto-js";

export const encryptPassword = (password: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    password,
    import.meta.env.VITE_ENC_KEY
  ).toString();
  return encrypted;
};

export const decryptPassword = (encryptedPassword: string) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedPassword,
    import.meta.env.VITE_ENC_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};
