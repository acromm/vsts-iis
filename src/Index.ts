import {SiteManager} from "./SiteManager"
import {AppPoolManager} from "./AppPoolManager"
import {ApplicationManager} from "./ApplicationManager"
import {RunnerServer} from "./AppCmd"


export class PsExec {

  private server: RunnerServer;

  constructor (server: RunnerServer = { isRemote: false }) {
    this.server = server;

		this.Sites = new SiteManager(this.server);
		this.AppPools = new AppPoolManager(this.server);
		this.Applications = new ApplicationManager(this.server);
  }

	public Sites : SiteManager;
  public AppPools : AppPoolManager;
  public Applications : ApplicationManager;

}
