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

	if (server.isRemote) {
		if (os.arch() === "x64") {
			appCmdPath = process.env["windir"] + "\\syswow64\\inetsrv\\appcmd.exe";
		} else {
			appCmdPath = process.env["windir"] + "\\system32\\inetsrv\\appcmd.exe";
		}
	} else {
		appCmdPath = psExecCmdPath;
	}

	return vsts.createToolRunner(appCmdPath);
}
