import * as AppCmd from "./AppCmd";
import * as Q from "q";
export interface SiteOptions {
    name: string;
    protocol: string;
    host: string;
    port: number;
    bindings?: string;
    path?: string;
}
export declare class SiteManager {
    server: AppCmd.RunnerServer;
    constructor(server: AppCmd.RunnerServer);
    add(options: SiteOptions): Q.Promise<number>;
    update(options: SiteOptions): Q.Promise<number>;
    setAppPool(name: string, appPoolName: string): Q.Promise<number>;
    remove(name: string): Q.Promise<number>;
    start(name: string): Q.Promise<number>;
    stop(name: string): Q.Promise<number>;
    exists(name: string): Q.Promise<boolean>;
}
