// by dribehance <dribehance.kksdapp.com>
angular.module("Transport", [
		"ngRoute",
		"ngSanitize",
		// "mobile-angular-ui",
		// "mobile-angular-ui.core",
		"angular-md5",
		"LocalStorageModule",
		// "flow",
		// "timer"
	])
	.config(function($routeProvider, $httpProvider, $locationProvider, localStorageServiceProvider, config) {
		angular.forEach(config.interceptor, function(path) {
			var controllername = path.replace(/_[a-z]/g, function(letter) {
				return letter.split("_")[1].toUpperCase();
			});
			controllername = controllername + "Controller";
			$routeProvider.when("/" + path, {
				templateUrl: "templates/" + path + ".html",
				reloadOnSearch: false,
				controller: controllername,
				resolve: {
					user: function($q, $location, localStorageService) {
						var resolve_path = ["account", "me_info", "address", "create_address", "cargo", "cargos", "cargos_merge", "orders", "services", "charge_records", "askforpay_records"],
							defer = $q.defer();
						if (resolve_path.includes(path) && !localStorageService.get("token")) {
							defer.reject();
							$location.path("/signin").replace();
							return;
						}
						defer.resolve();
						return defer.promise;
					}
				}
			});
		})
		$routeProvider.otherwise("/index");
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		localStorageServiceProvider.setStorageCookie(1 / 50);
		$httpProvider.interceptors.push('tokenInterceptor');
		$httpProvider.interceptors.push('timeoutHttpInterceptor');

	}).run(function(appServices) {
		// init event such as routechangestart...
		appServices.init();
	});