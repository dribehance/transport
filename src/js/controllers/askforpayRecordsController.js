// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("askforpayRecordsController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.records = [];
	$scope.page = {
		pn: 1,
		page_size: 10,
		message: "点击加载更多"
	}
	$scope.loadMore = function() {
		if ($scope.no_more) {
			return;
		}
		toastServices.show();
		$scope.page.message = "正在加载...";
		userServices.query_askforpay_records($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.records = $scope.records.concat(data.Result.PayList.list);
				$scope.no_more = $scope.records.length == data.Result.PayList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加载完成，合计" + $scope.records.length + "条记录";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
})