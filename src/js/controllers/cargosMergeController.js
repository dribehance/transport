// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").controller("cargosMergeController", function($scope, $routeParams, transportServices, userServices, $location, errorServices, toastServices, localStorageService, config) {
	$scope.input = {
		way: "self",
		address: "",
		address_type: "business",
		travel_address: "",
		payment: "",
		preview: "hide",
		business_hour: "",
		rmb: ""
	}
	toastServices.show();
	userServices.query_merge_cargos({
		ids: $routeParams.ids
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.cargos = data.Result.MergeCargos;
		} else {
			errorServices.autoHide(data.message);
		}
	})
	$scope.get_status = function(status) {
		return ["未收貨", "已入倉", "集運中", "貨物配送完成"][status]
	}
	$scope.get_weight = function() {
		var weight = 0;
		angular.forEach($scope.cargos, function(cargo) {
			weight += parseFloat(cargo.kg);
		})
		return weight;
	};
	$scope.get_fee = function() {

		return 0;
	};
	// self address
	toastServices.show();
	transportServices.query_self_address({
		type: 0
	}).then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.addresses = data.AddressList;
			$scope.input.address = $scope.addresses[0];
		} else {
			errorServices.autoHide(data.message);
		}
	}).then(function() {
		// business hour
		transportServices.query_business_hour({
			take_places: $scope.input.address.address_get
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.business_hours = data.Result.TimeList;
				$scope.business_hours = $scope.business_hours[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	});
	// payment
	var payments_1 = ["支付寶轉賬", "淘寶拍下，付款", "中國銀行，轉賬", "恒生銀行，轉賬"],
		payments_2 = ["貨到付款(只限自營自取點)", "支付寶轉賬", "淘寶拍下，付款", "中國銀行，轉賬", "恒生銀行，轉賬"];
	$scope.payments = payments_1;
	$scope.input.payment = $scope.payments[0];
	// query travel address 
	$scope.travel_addresses = [];
	$scope.page = {
		pn: 1,
		page_size: 100,
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
				$scope.travel_addresses = $scope.travel_addresses.concat(data.Result.AddressList.list);
				$scope.no_more = $scope.travel_addresses.length == data.Result.AddressList.totalRow ? true : false;

				angular.forEach($scope.travel_addresses, function(address) {
					var long_address = address.province + address.city + address.country + address.address;
					address["long_address"] = long_address;
				});
				$scope.input.travel_address = $scope.travel_addresses[0];
			} else {
				errorServices.autoHide("服务器错误");
			}
			if ($scope.no_more) {
				$scope.page.message = "没有了";
			}
			$scope.page.pn++;
		})

	}
	$scope.loadMore();
	// query fee 汇率
	toastServices.show();
	transportServices.query_calculator_constant().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.rate = data.rateModel;
			$scope.fee = data.feeModel;
		} else {
			errorServices.autoHide(data.message);
		}
	}).then(function(data) {
		// calculator
		$scope.calculate = function() {
			if ($scope.input.way == "self") {
				$scope.calculate_by_self($scope.get_weight());
				return
			}
			if ($scope.input.way == "travel" && $scope.input.address_type == 'business') {
				$scope.calculate_by_business($scope.get_weight());
				return
			}
			if ($scope.input.way == "travel" && $scope.input.address_type == 'house') {
				$scope.calculate_by_house($scope.get_weight());
				return
			}
		}
		$scope.calculate_by_self = function(n) {
			if (n < $scope.fee.lastget_kg) {
				$scope.input.rmb = $scope.fee.lastget_RMB;
			} else {
				$scope.input.rmb = $scope.fee.firstget + (Math.ceil(n) - 1) * $scope.fee.lastget;
			}
		}
		$scope.calculate_by_business = function(n) {
			if (n < $scope.fee.lastsend_kg) {
				$scope.input.rmb = $scope.fee.lastsend_RMB;
			} else {
				$scope.input.rmb = $scope.fee.firstsend + (Math.ceil(n) - 1) * $scope.fee.lastsend;
			}
		}
		$scope.calculate_by_house = function(n) {
			if (n < $scope.fee.lastsend_kg) {
				$scope.input.rmb = $scope.fee.lastsend_RMB;
			} else {
				$scope.input.rmb = $scope.fee.firstsend + (Math.ceil(n) - 1) * $scope.fee.lastsend + $scope.fee.additionalFee;
			}
		}
		$scope.$watch("input.way", function(n, o) {
			$scope.calculate();
		});
		$scope.$watch("input.address_type", function(n, o) {
			$scope.calculate();
		})
	})
})