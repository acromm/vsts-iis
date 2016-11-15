# vsts-iis

Node IIS AppCmd wrapper for building tasks for Visual Studio Team Services. And capabillity to use PsExec to execute AppCmd remotely.

## Install (not in npm yet)

	npm install --save vsts-iis

## Instantiate PsExec (for remote execution)
```
var iiServer = new iis.PsExec({
      isRemote: true,
      host: '\\\\ipOrHost',
      username: 'serverUsername',
      password: 'serverPassword'
    });

```

## Instantiating PsExec for local execution (does not really use PsExec, just AppCmd)
```
var iiServer = new iis.PsExec();

```

## Create a new site
```    
iiServer.Sites.add({
	name: 'Default Web Site',
	protocol: 'http',
	port: 80,
	host: '*',
	path : 'C:/inetpub/wwwroot'
}).then(function() {
	console.log("Success");
});;
```

## Remove a site
```
iiServer.Sites.remove('Default Web Site')
	.then(function() {
		console.log("Success");
	});
```

## Start a site
```
iiServer.Sites.start('Default Web Site')
	.then(function() {
		console.log("Success");
	});
```

## Stop a site
```
iiServer.Sites.stop('Default Web Site')
	.then(function() {
		console.log("Success");
	});
```

## Check if a site exists
```
iiServer.Sites.exists('Default Web Site')
	.then(function(exists) {
		if (exists) {
			console.log("Site exists!");
		} else {
			console.log("Site does not exist!");
		}
	});
```

## Create a new app pool
```
iiServer.AppPools.add('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Remove an app pool
```
iiServer.AppPools.remove('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Start an app pool
```
iiServer.AppPools.start('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Stop an app pool
```
iiServer.AppPools.stop('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Recycle an app pool
```
iiServer.AppPools.recycle('DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Set the identity an app pool
```
iiServer.AppPools.setIdentity('DefaultAppPool', 'ApplicationPoolIdentity')
	.then(function() {
		console.log("Success");
	});
```

## Check if an app pool exists
```
iiServer.AppPools.exists('DefaultAppPool')
	.then(function(exists) {
		if (exists) {
			console.log("AppPool exists!");
		} else {
			console.log("AppPool does not exist!");
		}
	});
```

## Create a application
```
iiServer.Applications.add({
	name: 'MyApplication',
	virtualPath: '/',
	physicalPath : 'C:/inetpub/wwwroot/MyApplication'
}).then(function() {
	console.log("Success");
});;
```

## Set the app pool of an application
```
iiServer.Applications.setAppPool('MyApplication', 'DefaultAppPool')
	.then(function() {
		console.log("Success");
	});
```

## Configure an application to use windows authentication
```
iiServer.Applications.setWindowsAuthentication('MyApplication', true)
	.then(function() {
		console.log("Success");
	});
```

## Configure an application to use anonymous authentication
```
iiServer.Applications.setAnonymousAuthentication('MyApplication', true)
	.then(function() {
		console.log("Success");
	});
```

## Check if an application exists
```
iiServer.Applications.exists('MyApplication')
	.then(function(exists) {
		if (exists) {
			console.log("Application exists!");
		} else {
			console.log("Application does not exist!");
		}
	});
```

