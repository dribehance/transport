// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("infosController", function($scope, transportServices, errorServices, toastServices, localStorageService, config) {
	$scope.news = [];
	$scope.page = {
		pn: 1,
		page_size: 15,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		transportServices.query_news($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.news = $scope.news.concat(data.Result.NewsList.list);
				$scope.no_more = $scope.news.length == data.Result.NewsList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服務器網絡連接超時,请重新加载！");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.format_time = function(time) {
		return time.split(" ")[0];
	}
	$scope.loadMore();
})