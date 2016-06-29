// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("timeoutHttpInterceptor", function($location, $q, localStorageService, errorServices) {
	return {
		// optional method
		'request': function(config) {
			// do something on success
			config.timeout = 8000;
			return config;
		},
		// optional method
		'requestError': function(rejection) {},
		// optional method
		'response': function(response) {
			return response;
		},
		// optional method
		'responseError': function(rejection) {
			var defer = $q.defer();
			errorServices.requestError(rejection.data, rejection.status, rejection.headers, rejection.config);
			return defer.promise;
		}
	}
})