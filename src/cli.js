#!/usr/bin/env node

const { program } = require('commander')

const path = require('path')

let Scriptable = require("./Scriptable")

const polluteGlobals = () => {
    // Insert scriptable keys
    Object.entries(Scriptable).forEach(([name, value]) => {
        global[name] = value
    })
}

/**
 * Run a Scriptable script given an absolute path
 * 
 * @param {String} filePath an absolute path to a JavaScript file written for Scriptable
 */
const runAbsolute = (filePath) => {
    // A bit of a hack - I can't find a good way to get the script's name
    const scriptName = path.parse(filePath).name

    global.Script.name = () => {
        return scriptName
    }

    return require(filePath)
}

const run = (file) => {
    let path = ""

    // Use CWD unless path is clearly absolute
    if (file[0] != '/') {
        path = process.cwd() + '/' + file
    } else {
        path = file
    }

    console.log(`Running ${file} with Scriptable mocks`)

    return runAbsolute(path)
}

program
    .command("run <program>")
    .description("Run a scriptable script given its name")
    .action(run)

//createContext()

polluteGlobals()

program.parse()