"use strict";
var os = require("os");
var vsts = require("vsts-task-lib/task");
function createAppCmdToolRunner(server) {
    var appCmdPath = "";
    var psExecCmdPath = process.env["windir"] + "\\psExec.exe";
    var toolRunner;
    var tempAppCmdPath = "";
    if (os.arch() === "x64") {
        appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
    }
    else {
        appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
    }
    tempAppCmdPath = (server.isRemote) ? psExecCmdPath : appCmdPath;
    toolRunner = vsts.createToolRunner(tempAppCmdPath);
    if (server.isRemote) {
        toolRunner.arg("-s");
        toolRunner.arg("-u " + server.username);
        toolRunner.arg("-p " + server.password);
        toolRunner.arg(server.host);
        toolRunner.arg(appCmdPath);
    }
    return toolRunner;
}
exports.createAppCmdToolRunner = createAppCmdToolRunner;
