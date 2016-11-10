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
    add(options: SiteOptions, server?: AppCmd.RunnerServer): Q.Promise<number>;
    remove(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    start(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    stop(name: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    exists(name: string, server?: AppCmd.RunnerServer): Q.Promise<boolean>;
}
