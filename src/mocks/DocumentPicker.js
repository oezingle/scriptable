const { app, dialog } = require('electron')

const fs = require('fs')

const Alert = require('./Alert')

const DocumentPicker = class {

    /**
     * Prompt the user to move a file from a given path to another
     * 
     * @param {String} path
     * @returns Promise<String> 
     */
    static export(path) {
        return app.whenReady()
            .then(() => {
                return dialog.showOpenDialog({
                    title: `Move file ${path}`,
                    defaultPath: path,
                    properties: [
                        'openFile',
                        'showHiddenFiles',
                        'createDirectory',
                        'promptToCreate',
                    ]
                })
            })
            .then(result => result.filePaths)
            // Use a single path
            .then(paths => paths[0])
            .then(async path => {
                const shouldReplace = await this._replacementWarning(path)

                return shouldReplace ? path : undefined
            })
            .catch(err => {
                console.error(err)

                // No path due to cancellation or whatever. Kinda bad but who cares
                return undefined
            })
    }

    static _replacementWarning(path) {
        if (fs.existsSync(path)) {
            const alert = new Alert()

            alert.title = "Warning"
            alert.message = `${path} will be replaced`

            alert.addAction("Ok")
            alert.addCancelAction("Cancel")

            return alert.present()
                .then(index => {
                    return index == 0
                })
        }
    }
}

module.exports = DocumentPicker