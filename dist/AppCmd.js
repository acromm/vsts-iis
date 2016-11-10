"use strict";
var os = require("os");
var vsts = require("vsts-task-lib/task");
function createAppCmdToolRunner(server) {
    var appCmdPath = "";
    var psExecCmdPath = process.env["windir"] + "\\psExec.exe -s -u " + server.username + " -p " + server.password + " \\\\" + server.host;
    if (os.arch() === "x64") {
        appCmdPath = ((server && server.isRemote) ? psExecCmdPath : "") + " " + process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
    }
    else {
        appCmdPath = ((server && server.isRemote) ? psExecCmdPath : "") + " " + process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
    }
    return vsts.createToolRunner(appCmdPath);
}
exports.createAppCmdToolRunner = createAppCmdToolRunner;
