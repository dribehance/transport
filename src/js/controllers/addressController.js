// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("addressController", function($scope, $route, userServices, errorServices, toastServices, localStorageService, config) {
	$scope.addresses = [];
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
		userServices.query_address($scope.page).then(function(data) {
			toastServices.hide();
			$scope.page.message = "点击加载更多";
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.addresses = $scope.addresses.concat(data.Result.AddressList.list);
				$scope.no_more = $scope.addresses.length == data.Result.AddressList.totalRow ? true : false;
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	$scope.open = function(id) {
		$scope.remove_id = id;
		$.magnificPopup.open({
			items: {
				src: '#popup'
			},
			type: 'inline'
		}, 0);
	}
	$scope.cancel = function() {
		$.magnificPopup.close();
	}
	$scope.confirm = function() {
		$scope.remove($scope.remove_id);
		$.magnificPopup.close();
	}
	$scope.remove = function(id) {
		toastServices.show();
		userServices.remove_address({
			id: id
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$route.reload();
				errorServices.autoHide(data.message)
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})