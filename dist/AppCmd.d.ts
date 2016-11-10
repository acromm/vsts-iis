import * as toolRunner from "vsts-task-lib/toolrunner";
export interface RunnerServer {
    isRemote: boolean;
    host?: string;
    username?: string;
    password?: string;
}
export declare function createAppCmdToolRunner(server?: RunnerServer): toolRunner.ToolRunner;
