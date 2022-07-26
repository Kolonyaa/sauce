"use strict";

const { CeaserCipherTransform } = require("./cipher");
const {
  ensureValidForBuffer,
  ensureValidForString,
  ensureValidKey,
} = require("./validate");

/**
 * Encrypt a string using Caesar Cipher
 *
 * @param {string} str
 * @param {number} key
 * @returns string
 */
function encryptString(str, key) {
  ensureValidForString(str, key);

  return str
    .split("")
    .map((s) => s.charCodeAt(0) + (key % 26))
    .map((v) => String.fromCharCode(v))
    .join("");
}

/**
 * Decrypt a string using Caesar Cipher
 *
 * @param {string} str
 * @param {number} key
 * @returns string
 */
function decryptString(str, key) {
  ensureValidForString(str, key);

  return str
    .split("")
    .map((s) => s.charCodeAt(0) - (key % 26))
    .map((v) => String.fromCharCode(v))
    .join("");
}

/**
 * Encrypt a buffer array using Caesar Cipher
 *
 * @param {Buffer} buffer
 * @param {number} key
 * @returns buffer
 */
function encrypt(buffer, key) {
  ensureValidForBuffer(buffer, key);
  return buffer.map((byte) => byte + (key % 26));
}

/**
 * Decrypt a buffer array using Caesar Cipher
 *
 * @param {Buffer} buffer
 * @param {number} key
 * @returns buffer
 */
function decrypt(buffer, key) {
  ensureValidForBuffer(buffer, key);
  return buffer.map((byte) => byte - (key % 26));
}

class EncryptTransform extends CeaserCipherTransform {
  /**
   * Transform stream for encryption using Caesar Cipher
   *
   * @param {number} key Encryption key
   */
  constructor(key) {
    super();
    ensureValidKey(key);
    this.key = key;
  }
}

class DecryptTransform extends CeaserCipherTransform {
  /**
   * Transform stream for decryption using Caesar Cipher
   *
   * @param {number} key Decryption key
   */
  constructor(key) {
    super();
    ensureValidKey(key);
    this.key = -key;
  }
}

module.exports = {
  encrypt,
  decrypt,
  encryptString,
  decryptString,
  EncryptTransform,
  DecryptTransform,
};
