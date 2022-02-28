const NotImplementedError = require("../NotImplemented")

const Script = {
    complete: () => { },
    name: () => {
        // Returns index instead of the called module, workaround in ../index.js
        //return path.parse(require.main.filename).name

        throw NotImplementedError
    },
    setShortCutOutput: (output) => {
        console.log(`Shortcut output set to ${output}`)
    },
    setWidget: (wdiget) => {
        throw NotImplementedError
    }
}

module.exports = Script