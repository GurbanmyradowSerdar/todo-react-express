import CryptoJS from "crypto-js";

export function sendResponseHandling(errorMessage, res, body) {
  let response = {};

  if (errorMessage.length > 0) {
    response.error = true;
    response.errorMessage = errorMessage;
  } else {
    response.error = false;
    response.errorMessage = "";
  }

  if (body) {
    response.body = body;
  } else {
    response.body = {};
  }

  res.json(response);
}

// ! encryption
export const encryptPassword = (password) => {
  const encrypted = CryptoJS.AES.encrypt(
    password,
    process.env.ENC_KEY
  ).toString();
  return encrypted;
};

// ! decryption
export const decryptPassword = (encryptedPassword) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedPassword,
    process.env.ENC_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decrypted;
};

// ! checking the credentials
export function checkCredentials(name, password, clientName, clientPassword) {
  return (
    name === clientName &&
    decryptPassword(password) === decryptPassword(clientPassword)
  );
}
