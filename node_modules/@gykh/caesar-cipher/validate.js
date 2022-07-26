/**
 * Check for valid key
 * 
 * @param {number} key Shift key
 */
function ensureValidKey(key) {
    if (!key) {
        throw new Error("Key is required");
    }

    if (typeof key !== 'number') {
        throw new Error("Key should be a number")
    }
    
    if (0 > key || key > 25) {
        throw new Error("Key should be within the range of 0 - 25");
    }
}

/**
 * Validation for encryptString and decryptString
 * 
 * @param {String} str String input value
 * @param {number} key Shift key
 */
function ensureValidForString (str, key) {
    if (!str) {
        throw new Error("Str is required");
    }

    if (typeof str !== 'string' || str.length === 0) {
        throw new Error("Str is invalid");
    }
    
    if (str.length > 1000) {
        throw new Error("Input too large, use EncryptTransform / DecryptTransform instead");
    }

    ensureValidKey(key);
}

/**
 * Validation for encrypt and decrypt functions
 * 
 * @param {Buffer} buffer Buffer input value
 * @param {number} key Shift key
 */
function ensureValidForBuffer (buffer, key) {
    if (!buffer) {
        throw new Error("Buffer is required");
    }

    if (!(buffer instanceof Buffer) || buffer.length === 0) {
        throw new Error("Buffer is invalid");
    }
    
    if (buffer.length > 1000) {
        throw new Error("Input too large, use EncryptTransform / DecryptTransform instead");
    }
}

module.exports = {
    ensureValidKey,
    ensureValidForString,
    ensureValidForBuffer
}
