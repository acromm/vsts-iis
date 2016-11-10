"use strict";
var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var Q = require("q");
var SiteManager = (function () {
    function SiteManager() {
    }
    SiteManager.prototype.add = function (options, server) {
        vsts.debug("Creating site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(server);
        toolRunner.arg("add site");
        toolRunner.arg("/name:" + options.name);
        toolRunner.arg("/bindings:" + (options.bindings || (options.protocol + '://' + options.host + ':' + options.port)));
        toolRunner.argIf(options.path, '/physicalPath:"' + options.path + '"');
        return toolRunner.exec();
    };
    SiteManager.prototype.remove = function (name, server) {
        vsts.debug("Deleting site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(server);
        toolRunner.arg("delete site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.exec();
    };
    SiteManager.prototype.start = function (name, server) {
        vsts.debug("Starting site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(server);
        toolRunner.arg("start site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.exec();
    };
    SiteManager.prototype.stop = function (name, server) {
        vsts.debug("Stopping site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(server);
        toolRunner.arg("stop site");
        toolRunner.arg("/site.name:" + name);
        return toolRunner.exec();
    };
    SiteManager.prototype.exists = function (name, server) {
        vsts.debug("Checking if site exists...");
        var toolRunner = AppCmd.createAppCmdToolRunner(server);
        toolRunner.arg("list site");
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
    return SiteManager;
}());
exports.SiteManager = SiteManager;
