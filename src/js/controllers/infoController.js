// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("infoController", function($scope, $routeParams, transportServices, errorServices, toastServices, localStorageService, config) {
	toastServices.show();
	transportServices.query_news_by_id({
		id: $routeParams.id
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.info = data.Result.NewsDetail;
		} else {
			errorServices.autoHide(data.message);
		}
	})
})