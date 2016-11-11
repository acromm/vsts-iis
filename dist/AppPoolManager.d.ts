import * as AppCmd from "./AppCmd";
export declare class AppPoolManager {
    private server;
    constructor(server: AppCmd.RunnerServer);
    add(name: string): Q.Promise<number>;
    remove(name: string): Q.Promise<number>;
    start(name: string): Q.Promise<number>;
    stop(name: string): Q.Promise<number>;
    recycle(name: string): Q.Promise<number>;
    setIdentity(name: string, identity: string): Q.Promise<number>;
    exists(name: string): Q.Promise<boolean>;
}
