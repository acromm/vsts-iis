import * as AppCmd from "./AppCmd";
export declare class AppPoolManager {
    add(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    remove(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    start(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    stop(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    recycle(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    setIdentity(name: string, identity: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    exists(name: string, server?: AppCmd.RunnerServer): Q.Promise<boolean>;
}
