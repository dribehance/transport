// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("teachingController", function($scope, transportServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	transportServices.query_tutorial({}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.tutorial = data.teach;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})