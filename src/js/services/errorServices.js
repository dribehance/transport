// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("errorServices", function($rootScope, $timeout, toastServices) {
	return {
		show: function(error) {
			console.log(error)
			$rootScope.error_message = error;
			$(".error-msg").show();
		},
		hide: function() {
			$rootScope.error_message = "";
			$(".error-msg").hide();
		},
		autoHide: function(error) {
			$rootScope.error_message = error;
			$(".error-msg").show();
			$timeout(function() {
				$rootScope.error_message = "";
				$(".error-msg").hide();
			}, 3000)
		},
		requestError: function(data, status, headers, config) {
			// hide toast
			toastServices.hide();
			// tip error
			switch (status) {
				case -1:
				case 0:
					this.autoHide("網絡連接超時");
					break;
				case 500:
				case 501:
				case 502:
				case 503:
				case 504:
				case 505:
				case 506:
				case 507:
				case 509:
				case 510:
					this.autoHide("服務器連接出錯");
					break;
				default:
					;
			}
			console.log("onRequestError output status, data, headers, config")
			console.log(status);
			console.log(data);
			console.log(headers)
			console.log(config);
			console.log("onRequestError end")
		}
	}
});