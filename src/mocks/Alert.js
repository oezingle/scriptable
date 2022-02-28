const { app, dialog } = require('electron')

const Alert = class {
    #_actions = []

    #_nonCancelActionCount = 0

    constructor() {
        this.properties = []
        this.title = ''
        this.message = ''

    }

    present() {
        // Electron's default is 'Ok', Scriptable's default is 'Cancel'
        if (this.#_actions.length == 0) {
            this.addCancelAction("Cancel")
        }

        return app.whenReady()
            .then(() => {
                return dialog.showMessageBox({
                    title: this.title,
                    message: `Title: ${this.title}\n${this.message}`,
                    properties: this.properties,
                    // Electron only takes the text content of these actions
                    buttons: this.#_actions.map(action => action.content)
                })
            })
            .then(result => result.response)
            .then(index => this.#_actions[index])
            .then(action => action.scriptableIndex)
            .then(index => {
                this.close()

                return index
            })
    }

    #_addAnyAction(type, content) {
        const isCancel = type === "cancel"

        this.#_actions.push({
            type,
            content,
            scriptableIndex: isCancel ? -1 : this.#_nonCancelActionCount
        })

        if (!isCancel) this.#_nonCancelActionCount ++
    }

    addAction(content) {
        this.#_addAnyAction("simple", content)
    }

    addCancelAction(content) {
        this.#_addAnyAction("cancel", content)
    }
}

module.exports = Alert