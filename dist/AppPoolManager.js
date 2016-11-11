"use strict";
var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var AppPoolManager = (function () {
    function AppPoolManager(server) {
        this.server = server;
    }
    AppPoolManager.prototype.add = function (name) {
        vsts.debug("Creating AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("add apppool");
        toolRunner.arg("/name:" + name);
        return toolRunner.exec();
    };
    AppPoolManager.prototype.remove = function (name) {
        vsts.debug("Deleting AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("delete apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.exec();
    };
    AppPoolManager.prototype.start = function (name) {
        vsts.debug("Starting AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("start apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.exec();
    };
    AppPoolManager.prototype.stop = function (name) {
        vsts.debug("Stopping AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("stop apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.exec();
    };
    AppPoolManager.prototype.recycle = function (name) {
        vsts.debug("Recycling AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("recycle apppool");
        toolRunner.arg("/apppool.name:" + name);
        return toolRunner.exec();
    };
    AppPoolManager.prototype.setIdentity = function (name, identity) {
        vsts.debug("Stopping AppPool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("set config");
        toolRunner.arg("/section:applicationPools");
        toolRunner.arg("/[name='" + name + "'].processModel.identityType:" + identity);
        return toolRunner.exec();
    };
    AppPoolManager.prototype.exists = function (name) {
        vsts.debug("Checking if AppPool exists...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("list apppool");
        toolRunner.arg("/name:" + name);
        var defered = Q.defer();
        toolRunner.exec()
            .then(function (code) {
            defered.resolve(true);
        })
            .fail(function (reason) {
            defered.resolve(false);
        });
        return defered.promise;
    };
    return AppPoolManager;
}());
exports.AppPoolManager = AppPoolManager;
