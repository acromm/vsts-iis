"use strict";
var vsts = require("vsts-task-lib/task");
var AppCmd = require("./AppCmd");
var ApplicationManager = (function () {
    function ApplicationManager(server) {
        this.server = server;
    }
    ApplicationManager.prototype.add = function (options) {
        vsts.debug("Adding app folder...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('add app');
        toolRunner.arg('/site.name:"' + options.name + '"');
        toolRunner.arg('/path:/' + options.virtualPath);
        toolRunner.arg('/physicalPath:"' + options.physicalPath + '"');
        return toolRunner.exec();
    };
    ApplicationManager.prototype.setAppPool = function (appName, appPoolName) {
        vsts.debug("Setting the AppPool for app...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('set app');
        toolRunner.arg('/app.name:"' + appName + '"');
        toolRunner.arg('/applicationPool:' + appPoolName);
        return toolRunner.exec();
    };
    ApplicationManager.prototype.removeHttpHandler = function (handlerName, siteName, configSection) {
        vsts.debug("disabling http handler for site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('set config');
        toolRunner.arg('"' + siteName + '"');
        toolRunner.arg(configSection);
        toolRunner.arg('/-"[name=\'' + handlerName + '\']"');
        return toolRunner.exec();
    };
    ApplicationManager.prototype.removeHttpModule = function (moduleName, siteName) {
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('delete module');
        toolRunner.arg('/module.name:' + moduleName);
        toolRunner.arg('/app.name:' + siteName);
        return toolRunner.exec();
    };
    ApplicationManager.prototype.enableHttpModule = function (moduleName, siteName, type) {
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('add module');
        toolRunner.arg('/name:' + moduleName);
        toolRunner.arg('/type:"' + type + '"');
        toolRunner.arg('/app.name:' + siteName);
        return toolRunner.exec();
    };
    ApplicationManager.prototype.enableHttpHandler = function (handlerName, siteName, configSection, path, verb, type) {
        vsts.debug("enabling http handler for site...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('set config');
        toolRunner.arg('"' + siteName + '"');
        toolRunner.arg(configSection);
        toolRunner.arg('/+"[name=\'' + handlerName + '\',path=\'/\',verb=\'' + verb + '\',type=\'' + type + '\']"');
        return toolRunner.exec();
    };
    ApplicationManager.prototype.setWindowsAuthentication = function (appPath, enable) {
        vsts.debug("Setting the AppPool for app...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('set config');
        toolRunner.arg('"' + appPath + '"');
        toolRunner.arg('/section:windowsAuthentication');
        toolRunner.arg('/enabled:"' + enable + '"');
        return toolRunner.exec();
    };
    ApplicationManager.prototype.setAnonymousAuthentication = function (appPath, enable) {
        vsts.debug("Setting the AppPool for app...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg('set config');
        toolRunner.arg('"' + appPath + '"');
        toolRunner.arg('/section:anonymousAuthentication');
        toolRunner.arg('/enabled:"' + enable + '"');
        return toolRunner.exec();
    };
    ApplicationManager.prototype.exists = function (name) {
        vsts.debug("Checking if site app...");
        var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
        toolRunner.arg("list app");
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
    return ApplicationManager;
}());
exports.ApplicationManager = ApplicationManager;
