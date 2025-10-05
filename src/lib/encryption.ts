import CryptoJS from 'crypto-js';
import crypto from 'crypto';
// Instead of: const crypto = require('crypto');

export const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

export const decryptData = (encrypted: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(encrypted, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export const generateMasterKey = (email: string, password: string): string => {
  return CryptoJS.PBKDF2(password, email, {
    keySize: 256 / 32,
    iterations: 10000
  }).toString();
};

export const hashPassword = async (password: string): Promise<string> => {
  const bcrypt = require('bcryptjs');
  return await bcrypt.hash(password, 12);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  const bcrypt = require('bcryptjs');
  return await bcrypt.compare(password, hash);
};