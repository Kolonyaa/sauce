const { Transform, TransformCallback } = require('stream');

class CeaserCipherTransform extends Transform {

    /**
     * @param {number} key
     */
    set key(key) {
        this._key = key;
    }

    /**
     * 
     * @param {Buffer} chunk 
     * @param {BufferEncoding} encoding 
     * @param {TransformCallback} callback 
     */
    _transform(chunk, _, callback) {
        this.push(cipher(chunk, this._key));
        callback();
    }
}

function cipher(chunk, key) {
    return chunk.map(byte => byte + (key % 26));
}

module.exports = { CeaserCipherTransform };
