import { SiteManager } from "./SiteManager";
import { AppPoolManager } from "./AppPoolManager";
import { ApplicationManager } from "./ApplicationManager";
export interface RunnerServer {
    isRemote: boolean;
    host?: string;
    username?: string;
    password?: string;
}
export declare class PsExec {
    private server;
    constructor(server?: RunnerServer);
    Sites: SiteManager;
    AppPools: AppPoolManager;
    Applications: ApplicationManager;
}
