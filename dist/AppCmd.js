"use strict";
var os = require("os");
var vsts = require("vsts-task-lib/task");
function createAppCmdToolRunner(server) {
    var appCmdPath = "";
    var psExecCmdPath = process.env["windir"] + "\\psExec.exe";
    if (server.isRemote) {
        if (os.arch() === "x64") {
            appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
        }
        else {
            appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
        }
    }
    else {
        appCmdPath = psExecCmdPath;
    }
    return vsts.createToolRunner(appCmdPath);
}
exports.createAppCmdToolRunner = createAppCmdToolRunner;
