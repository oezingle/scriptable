const { Buffer } = require("buffer")

const NotImplementedError = require("../NotImplemented")

const Data = class {
    // Internal buffer object
    #_buff = undefined

    constructor(buffer) {
        this.#_buff = buffer
    }

    /**
     * For internal use only, not available in scriptable
     * 
     * @param {Buffer} buffer 
     * @returns Data
     */
    static _fromBuffer(buffer) {
        return new this(buffer)
    }

    /**
     * For internal use only, not available in scriptable. 
     * Get the Data's internal buffer
     *
     * @returns Buffer
     */
     _toBuffer() {
        return this.#_buff
    }

    static fromBase64String(base64String) {
        const buffer = Buffer.from(base64String, "base64")

        return this._fromBuffer(buffer)
    }

    static fromFile(filePath) {
        // TODO read from FileManager?
        throw NotImplementedError
    }

    static fromJPEG(image) {
        throw NotImplementedError
    }

    static fromPNG(image) {
        throw NotImplementedError
    }

    static fromString(string) {
        const buffer = Buffer.from(string)

        return this._fromBuffer(buffer)
    }

    getBytes() {
        return this.#_buff.length
    }

    toBase64String() {
        return this.#_buff.toString('base64')
    }

    toRawString() {
        return this.#_buff.toString('utf-8')
    }
}

module.exports = Data