"use strict";
var SiteManager_1 = require("./SiteManager");
var AppPoolManager_1 = require("./AppPoolManager");
var ApplicationManager_1 = require("./ApplicationManager");
var PsExec = (function () {
    function PsExec(server) {
        if (server === void 0) { server = { isRemote: false }; }
        this.server = server;
        this.Sites = new SiteManager_1.SiteManager(this.server);
        this.AppPools = new AppPoolManager_1.AppPoolManager(this.server);
        this.Applications = new ApplicationManager_1.ApplicationManager(this.server);
    }
    return PsExec;
}());
exports.PsExec = PsExec;
