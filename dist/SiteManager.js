"use strict";
var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var Q = require("q");
var SiteManager = (function () {
    function SiteManager(server) {
        this.server = server;
    }
    SiteManager.prototype.add = function (options) {
        vsts.debug("Creating site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("add site");
        toolRunner.arg("/name:" + '"' + options.name + '"');
        toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
        toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
        return toolRunner.exec();
    };
    SiteManager.prototype.update = function (options) {
        vsts.debug("Updating site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("set site");
        toolRunner.arg('"' + options.name + '"');
        toolRunner.argIf(options.bindings && options.protocol && options.port && options.host, "/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
        toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
        return toolRunner.exec();
    };
    SiteManager.prototype.setAppPool = function (name, appPoolName) {
        vsts.debug("Setting Site Application Pool...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("set site");
        toolRunner.arg('/site.name:' + name);
        toolRunner.arg("/[path='/'].applicationPool:" + appPoolName);
        return toolRunner.exec();
    };
    SiteManager.prototype.remove = function (name) {
        vsts.debug("Deleting site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("delete site");
        toolRunner.arg("/site.name:" + '"' + name + '"');
        return toolRunner.exec();
    };
    SiteManager.prototype.start = function (name) {
        vsts.debug("Starting site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("start site");
        toolRunner.arg("/site.name:" + '"' + name + '"');
        return toolRunner.exec();
    };
    SiteManager.prototype.stop = function (name) {
        vsts.debug("Stopping site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("stop site");
        toolRunner.arg("/site.name:" + '"' + name + '"');
        return toolRunner.exec();
    };
    SiteManager.prototype.exists = function (name) {
        vsts.debug("Checking if site exists...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("list site");
        toolRunner.arg("/name:" + '"' + name + '"');
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
    return SiteManager;
}());
exports.SiteManager = SiteManager;
