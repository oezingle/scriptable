const callerId = require('caller-id')

const path = require('path')

/**
 * Provide scriptable's relative import scheme using require() and the path of the function that calls for this
 * 
 * @param {String} relPath 
 * @returns any
 */
const importModule = relPath => {    
    const caller = callerId.getData()

    const dir = path.dirname(caller.filePath)

    return require(`${dir}/${relPath}`)
}

module.exports = importModule