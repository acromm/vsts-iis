import * as AppCmd from "./AppCmd";
export interface ApplicationOptions {
    name: string;
    virtualPath: string;
    physicalPath: string;
}
export declare class ApplicationManager {
    add(options: ApplicationOptions, server?: AppCmd.RunnerServer): Q.Promise<number>;
    setAppPool(appName: string, appPoolName: string, server?: AppCmd.RunnerServer): Q.Promise<number>;
    setWindowsAuthentication(appPath: string, enable: boolean, server?: AppCmd.RunnerServer): Q.Promise<number>;
    setAnonymousAuthentication(appPath: string, enable: boolean, server?: AppCmd.RunnerServer): Q.Promise<number>;
    exists(name: string, server?: AppCmd.RunnerServer): Q.Promise<boolean>;
}
