import * as AppCmd from "./AppCmd";
export interface ApplicationOptions {
    name: string;
    virtualPath: string;
    physicalPath: string;
}
export declare class ApplicationManager {
    private server;
    constructor(server: AppCmd.RunnerServer);
    add(options: ApplicationOptions): Q.Promise<number>;
    setAppPool(appName: string, appPoolName: string): Q.Promise<number>;
    setWindowsAuthentication(appPath: string, enable: boolean): Q.Promise<number>;
    setAnonymousAuthentication(appPath: string, enable: boolean): Q.Promise<number>;
    exists(name: string): Q.Promise<boolean>;
}
