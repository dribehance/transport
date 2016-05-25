// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("ordersController", function($scope, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.preview_id = "";
	$scope.preview = function(id) {
		$scope.preview_id = id;
	}
	$scope.preview_hide = function(id) {
		$scope.preview_id = "";
	}
	$scope.orders = [];
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
		userServices.query_orders($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.orders = $scope.orders.concat(data.Result.Cargos.list);
				$scope.no_more = $scope.orders.length == data.Result.Cargos.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加載完成，共" + $scope.orders.length + "件訂單";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.get_server = function(server) {
		return ["自取", "送貨上門"][server];
	}
	$scope.get_status = function(status) {
		return ["未處理", "未付款", "打包中", "已發貨", "已簽收"][status];
	}
	$scope.get_status_1 = function(status) {
		return ["未收貨", "已入倉", "集運中", "已配送完"][status];
	}
})