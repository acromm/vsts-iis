import * as os from "os";
import * as vsts from "vsts-task-lib/task";
import * as toolRunner from "vsts-task-lib/toolrunner";

export interface RunnerServer {
		isRemote : boolean
		host? : string;
		username? : string;
		password? : string;
}

export function createAppCmdToolRunner(server?: RunnerServer): toolRunner.ToolRunner {
	let appCmdPath = "";
	let psExecCmdPath = process.env["windir"] + "\\psExec.exe";
	let toolRunner : toolRunner.ToolRunner;
	let tempAppCmdPath = "";

	if (os.arch() === "x64") {
		appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
	} else {
		appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
	}

	tempAppCmdPath = (server.isRemote) ? psExecCmdPath : appCmdPath;

	toolRunner = vsts.createToolRunner(tempAppCmdPath);

	if (server.isRemote) {
			toolRunner.arg("-i");
			toolRunner.arg("-u " + server.username);
			toolRunner.arg("-p " + server.password);
			toolRunner.arg(server.host);
			toolRunner.arg(appCmdPath);
	}
	return toolRunner;
}
