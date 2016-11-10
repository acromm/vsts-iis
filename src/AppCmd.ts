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
	let psExecCmdPath = process.env["windir"] + "\\psExec.exe -s -u " + server.username + " -p " + server.password + " \\\\" + server.host;

	if (os.arch() === "x64") {
		appCmdPath = ((server && server.isRemote) ? psExecCmdPath : "") + " " + process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
	} else {
		appCmdPath = ((server && server.isRemote) ? psExecCmdPath : "") + " " + process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
	}

	return vsts.createToolRunner(appCmdPath);
}
