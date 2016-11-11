import {SiteManager} from "./SiteManager"
import {AppPoolManager} from "./AppPoolManager"
import {ApplicationManager} from "./ApplicationManager"

export interface RunnerServer {
		isRemote : boolean
		host? : string;
		username? : string;
		password? : string;
}

export class PsExec {

  private server: RunnerServer;

  constructor (server: RunnerServer = { isRemote: false }) {
    this.server = server
  }

  public Sites = new SiteManager(this.server);
  public AppPools = new AppPoolManager(this.server);
  public Applications = new ApplicationManager(this.server);

}
/*export var Sites = new SiteManager();
export var AppPools = new AppPoolManager();
export var Applications = new ApplicationManager();
*/
