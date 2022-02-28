const fs = require("fs")

const NotImplementedError = require("../NotImplemented")

const Data = require("./Data")

const FileManager = class {
    noImplementation() {
        throw NotImplementedError
    }

    /**
     * Create a new FileManager. Don't use directly
     * 
     * @param {boolean} iCloud 
     */
    constructor(iCloud) {
        this.local = !iCloud
    }

    #dir() {
        const dir = `${process.cwd()}/files/${this.local ? "local" : "iCloud"}`

        // Ensure dirs exist
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })

            fs.mkdirSync(`${dir}/cache`, { recursive: true })
            fs.mkdirSync(`${dir}/documents`, { recursive: true })
            fs.mkdirSync(`${dir}/library`, { recursive: true })
            fs.mkdirSync(`${dir}/temporary`, { recursive: true })
        }

        return dir
    }

    addTag = this.noImplementation
    allExtendedAttributes = this.noImplementation
    allFileBookmarks = this.noImplementation
    allTags = this.noImplementation
    bookmarkedPath = this.noImplementation
    bookmarkExists = this.noImplementation

    cacheDirectory() {
        return `${this.#dir()}/cache`
    }

    copy(sourceFilePath, destinationFilePath) {
        fs.copyFileSync(sourceFilePath, destinationFilePath)
    }

    createDirectory(path, intermediateDirectories = false) {
        fs.mkdirSync(path, { recursive: intermediateDirectories })
    }

    creationDate(filePath) {
        return fs.statSync(path).ctime
    }

    documentsDirectory() {
        return `${this.#dir()}/documents`
    }

    downloadFileFromiCloud(filePath) {
        return Promise.resolve();
    }

    fileExists(filePath) {
        return fs.existsSync(filePath)
    }

    fileExtension(filePath) {
        return filePath.split('.').pop();
    }

    fileName = this.noImplementation

    /**
     * Get the size of a file in kilobytes
     * 
     * @param {string} filePath 
     * @returns number
     */
    fileSize(filePath) {
        return fs.statSync(filePath).size / 1024
    }

    getUTI = this.noImplementation

    /**
     * Create an iCloud FileManager
     */
    static iCloud() {
        return new this(true)
    }

    isDirectory(filePath) {
        return fs.lstatSync(filePath).isDirectory()
    }

    isFileDownloaded(filePath) {
        return true
    }

    isFileStoredIniCloud = this.noImplementation

    joinPath = this.noImplementation

    libraryDirectory() {
        return `${this.#dir()}/library`
    }

    listContents(directoryPath) {
        return fs.readdirSync(directoryPath)
    }

    /**
     * Create a local FileManager
     */
    static local() {
        return new this(false)
    }

    creationDate(filePath) {
        return fs.statSync(path).mtime
    }

    move(sourceFilePath, destinationFilePath) {
        fs.renameSync(sourceFilePath, destinationFilePath)
    }

    /**
     * Read the contents of a file, returning Data
     * 
     * @param {String} filePath 
     * @returns Data
     */
    read(filePath) {
        const buffer = fs.readFileSync(filePath)

        return Data._fromBuffer(buffer)
    }

    readExtendedAttributes = this.noImplementation

    readImage = this.noImplementation

    readString(filePath) {
        return this.read(filePath).toRawString()
    }

    remove(filePath) {
        fs.rmSync(filePath)
    }

    removeExtendedAttribute = this.noImplementation

    removeTag = this.noImplementation

    temporaryDirectory() {
        return `${this.#dir()}/temporary`
    }

    /**
     * Write data to a file
     * 
     * @param {String} filePath 
     * @param {Data} content 
     */
    write(filePath, content) {
        fs.writeFileSync(filePath, content._toBuffer())
    }

    writeExtendedAttribute = this.noImplementation

    writeImage = this.noImplementation

    /**
     * Write a string to a file
     * 
     * @param {String} filePath 
     * @param {String} content 
     */
    writeString(filePath, content) {
        this.write(filePath, Data.fromString(content))
    }
}

module.exports = FileManager