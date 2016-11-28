// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("billsController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
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
		userServices.query_charge_balance_records($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.records = $scope.records.concat(data.Result.FlowingMoneyList.list);
				$scope.no_more = $scope.records.length == data.Result.FlowingMoneyList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服務器網絡連接超時,请重新加载！");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.status = {
		"10": "待確認充值",
		"11": "已確認充值",
		"2": "集運消費"
	}
	$scope.get_status = function(status) {
		return $scope.status[status];
	}
})