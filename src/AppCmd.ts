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
	let toolRunner;
	let tempAppCmdPath = "";

	if (server.isRemote) {
		if (os.arch() === "x64") {
			appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
		} else {
			appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
		}
	} else {
		tempAppCmdPath = psExecCmdPath;
	}
	toolRunner = vsts.createToolRunner(tempAppCmdPath);

	if (server.isRemote) {
			toolRunner.arg("-s");
			toolRunner.arg("-u " + this.server.username);
			toolRunner.arg("-p " + this.server.password);
			toolRunner.arg(this.server.host);
			toolRunner.arg(appCmdPath);
	}
	return toolRunner;
}
