const gi = require('node-gtk')

const uuidGen = require('../util/uuidGen')

const GLib = gi.require('GLib', '2.0')
const Gtk = gi.require('Gtk', '4.0')

Gtk.init()

const Alert = class {
    #_actions = []

    #_nonCancelActionCount = 0

    constructor() {
        this.properties = []
        this.title = ''
        this.message = ''
    }

    present() {
        const loop = GLib.MainLoop.new(null, false)
        const app = new Gtk.Application(`com.github.oezingle.scriptable-mocks.alert.${uuidGen()}`, 0)

        const ready = () => {
            const window = new Gtk.Dialog(app)

            window.setTitle('Alert')

            window.on('close-request', handleQuit)

            this.#_actions.forEach(action => {
                const button = new Gtk.Button()

                button.label = action.content

                window.addActionWidget(button, 0)

                //window.addButton(action.content, action.scriptableIndex)
            })

            window.present()

            gi.startLoop()
            loop.run()
        }

        const handleQuit = () => {
            loop.quit()

            app.quit()

            return 0
        }

        app.on('activate', ready)
        const status = app.run()

        // as it turns out, this is all handled in sync.
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