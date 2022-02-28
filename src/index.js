#!/usr/bin/env node

// TODO switch to node-gtk, fork and fix for windows

// Stolen from electron/cli.js
// Inits electron using electron's CLI, and inserts the cli for scriptable

const electron = require('electron');

const proc = require('child_process');

const child = proc.spawn(electron, ['src/cli.js', ...process.argv.splice(2)], { stdio: 'inherit', windowsHide: false });

child.on('close', function (code, signal) {
    if (code === null) {
        console.error(electron, 'exited with signal', signal);
        process.exit(1);
    }
    process.exit(code);
});

const handleTerminationSignal = function (signal) {
    process.on(signal, function signalHandler() {
        if (!child.killed) {
            child.kill(signal);
        }
    });
};

handleTerminationSignal('SIGINT');
handleTerminationSignal('SIGTERM');