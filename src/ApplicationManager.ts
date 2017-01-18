import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";
import * as AppCmd from "./AppCmd"

export interface ApplicationOptions {
	name: string;
	virtualPath: string;
	physicalPath: string;
}

export class ApplicationManager {

	private server: AppCmd.RunnerServer;

	constructor (server: AppCmd.RunnerServer) {
		this.server = server;
	}

	public add(options: ApplicationOptions) {
		vsts.debug("Adding app folder...");

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('add app');
		toolRunner.arg('/site.name:"' + options.name + '"');
		toolRunner.arg('/path:/' + options.virtualPath);
		toolRunner.arg('/physicalPath:"' + options.physicalPath + '"');

		return toolRunner.exec();
	}

	public setAppPool(appName: string, appPoolName: string): Q.Promise<number> {
		vsts.debug("Setting the AppPool for app...");

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('set app');
		toolRunner.arg('/app.name:"' + appName + '"');
		toolRunner.arg('/applicationPool:' + appPoolName);

		return toolRunner.exec();
	}

	public removeHttpHandler(handlerName:string, siteName:string, configSection:string) {
		vsts.debug("disabling http handler for site...");
		// appcmd.exe set config /section:handlers /-[name=' string ']

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('set config');
		toolRunner.arg('"' + siteName + '"');
		toolRunner.arg(configSection);
		toolRunner.arg('/-"[name=\'' + handlerName + '\']"');

		return toolRunner.exec();
	}

	public removeHttpModule(moduleName:string, siteName:string) :Q.Promise<number> {
		//appcmd delete module /name:SubscriptionModule /app.name:test.cmsmobile.mobi/
		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('delete module');
		toolRunner.arg('/name:' + moduleName);
		toolRunner.arg('/app.name:' + siteName);

		return toolRunner.exec();
	}

	public enableHttpModule(moduleName:string, siteName:string, type:string) :Q.Promise<number> {
		//appcmd add module /name:SubscriptionModule /type:"UDist.SubscriptionModule, SubscriptionModule" /app.name:test.cmsmobile.mobi/
		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('add module');
		toolRunner.arg('/name:' + moduleName);
		toolRunner.arg('/type:"' + type + '"');
		toolRunner.arg('/app.name:' + siteName);

		return toolRunner.exec();
	}

	public enableHttpHandler(handlerName:string, siteName:string, configSection:string, path:string, verb:string, type:string) : Q.Promise<number> {
		vsts.debug("enabling http handler for site...");

		/*
			appcmd.exe 	set config
		 							"test.cmsmobile.mobi"
									-section:system.webServer/handlers
									/+"[name='FPPortalHandler',path='/',verb='GET',type='FeaturePhonePortal.FPPortalHandler']"
	  */

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('set config');
		toolRunner.arg('"' + siteName + '"');
		toolRunner.arg(configSection);
		toolRunner.arg('/+"[name=\'' + handlerName + '\',path=\'/\',verb=\''+ verb + '\',type=\'' + type + '\']"');
		return toolRunner.exec();

	}

	public setWindowsAuthentication(appPath: string, enable: boolean): Q.Promise<number> {
		vsts.debug("Setting the AppPool for app...");

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('set config');
		toolRunner.arg('"' + appPath + '"');
		toolRunner.arg('/section:windowsAuthentication');
		toolRunner.arg('/enabled:"' + enable + '"');

		return toolRunner.exec();
	}

	public setAnonymousAuthentication(appPath: string, enable: boolean): Q.Promise<number> {
		vsts.debug("Setting the AppPool for app...");

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg('set config');
		toolRunner.arg('"' + appPath + '"');
		toolRunner.arg('/section:anonymousAuthentication');
		toolRunner.arg('/enabled:"' + enable + '"');

		return toolRunner.exec();
	}

	public exists(name: string): Q.Promise<boolean> {
		vsts.debug("Checking if site app...");

		var toolRunner = AppCmd.createAppCmdToolRunner(this.server);
		toolRunner.arg("list app");
		toolRunner.arg("/name:" + name);

		var defered = Q.defer<boolean>();

		toolRunner.exec()
			.then(code => {
				defered.resolve(true);
			})
			.fail(reason => {
				defered.resolve(false);
			});

		return defered.promise;
	}
}
