// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("cargosController", function($scope, userServices, $location, errorServices, toastServices, localStorageService, config) {
	$scope.merge = function() {
		$location.path("/cargos_merge");
	}
	$scope.cargos = [];
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
		userServices.query_cargos($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.cargos = $scope.cargos.concat(data.Result.ItemRegisters.list);
				$scope.no_more = $scope.cargos.length == data.Result.ItemRegisters.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "加載完成，共" + $scope.cargos.length + "件貨物";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.get_status = function(status) {
		return ["未收貨", "已入倉", "集運中", "貨物配送完成"][status]
	}
	$scope.check = function(cargo) {
		cargo.checked = !cargo.checked;
	}
	$scope.check_reverse = function() {
		angular.forEach($scope.cargos, function(cargo) {
			cargo.checked = !cargo.checked;
		})
	}
})