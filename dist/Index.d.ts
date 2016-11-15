import { SiteManager } from "./SiteManager";
import { AppPoolManager } from "./AppPoolManager";
import { ApplicationManager } from "./ApplicationManager";
import { RunnerServer } from "./AppCmd";
export declare class PsExec {
    private server;
    constructor(server?: RunnerServer);
    Sites: SiteManager;
    AppPools: AppPoolManager;
    Applications: ApplicationManager;
}
