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
		rmb: "",
		hkd: ""
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
	}).then(function(data) {
		// query fee 汇率
		toastServices.show();
		transportServices.query_calculator_constant().then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.rate = data.rateModel.rate;
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
				if ($scope.input.way == "SF") {
					$scope.calculate_by_SF($scope.get_weight());
					return
				}
			}
			$scope.calculate_by_self = function(n) {
				// self address
				toastServices.show();
				transportServices.query_self_address({
					type: 0
				}).then(function(data) {
					toastServices.hide()
					if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
						$scope.addresses = data.AddressList;
						$scope.input.address = $scope.addresses[0];
						$scope.query_business_hour();
					} else {
						errorServices.autoHide(data.message);
					}
				});
				if (parseFloat(n) < parseFloat($scope.fee.lastget_kg)) {
					$scope.input.rmb = $scope.fee.lastget_RMB;
				} else {
					$scope.input.rmb = parseFloat($scope.fee.firstget) + (Math.ceil(n) - 1) * parseFloat($scope.fee.lastget);
				}
				$scope.input.hkd = (parseFloat($scope.input.rmb) * parseFloat($scope.rate)).toFixed(2);
			}
			$scope.calculate_by_business = function(n) {
				$scope.business_hours = [{
					"address_get": "",
					"time_get": "星期一至五上午",
					"type": 0,
					"post_time": "",
					"status": 1
				}, {
					"address_get": "",
					"time_get": "星期一至五下午",
					"type": 0,
					"post_time": "",
					"status": 1
				}, {
					"address_get": "",
					"time_get": "星期六日上午",
					"type": 0,
					"post_time": "",
					"status": 1
				}, {
					"address_get": "",
					"time_get": "星期六日下午",
					"type": 0,
					"post_time": "",
					"status": 1
				}];
				$scope.input.business_hour = $scope.business_hours[0];
				if (parseFloat(n) < parseFloat($scope.fee.lastsend_kg)) {
					$scope.input.rmb = $scope.fee.lastsend_RMB;
				} else {
					$scope.input.rmb = parseFloat($scope.fee.firstsend) + (Math.ceil(n) - 1) * parseFloat($scope.fee.lastsend);
				}
				$scope.input.hkd = (parseFloat($scope.input.rmb) * parseFloat($scope.rate)).toFixed(2);
			}
			$scope.calculate_by_house = function(n) {
				$scope.business_hours = [{
					"address_get": "",
					"time_get": "星期一至五上午",
					"type": 0,
					"post_time": "",
					"status": 1
				}, {
					"address_get": "",
					"time_get": "星期一至五下午",
					"type": 0,
					"post_time": "",
					"status": 1
				}, {
					"address_get": "",
					"time_get": "星期六日上午",
					"type": 0,
					"post_time": "",
					"status": 1
				}, {
					"address_get": "",
					"time_get": "星期六日下午",
					"type": 0,
					"post_time": "",
					"status": 1
				}];
				$scope.input.business_hour = $scope.business_hours[0];
				if (parseFloat(n) < parseFloat($scope.fee.lastsend_kg)) {
					$scope.input.rmb = $scope.fee.lastsend_RMB;
				} else {
					$scope.input.rmb = parseFloat($scope.fee.firstsend) + (Math.ceil(n) - 1) * parseFloat($scope.fee.lastsend) + parseFloat($scope.fee.additionalFee);
				}
				$scope.input.hkd = (parseFloat($scope.input.rmb) * parseFloat($scope.rate)).toFixed(2);
			}
			$scope.calculate_by_SF = function(n) {
				// 地址根据重量变化，获取地址列表
				userServices.query_sf_address({
					weight: $scope.get_weight(),
				}).then(function(data) {
					if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
						$scope.addresses = data.PickUpAddressList;
						$scope.input.address = $scope.addresses[0];
						$scope.query_business_hour();
					} else {
						errorServices.autoHide(data.message);
					}
				});
				if (parseFloat(n) < parseFloat($scope.fee.lastsend_kg)) {
					$scope.input.rmb = $scope.fee.lastsend_RMB;
				} else {
					$scope.input.rmb = parseFloat($scope.fee.firstsend) + (Math.ceil(n) - 1) * parseFloat($scope.fee.lastsend) + parseFloat($scope.fee.additionalFee);
				}
				$scope.input.hkd = (parseFloat($scope.input.rmb) * parseFloat($scope.rate)).toFixed(2);
			}
			$scope.$watch("input.way", function(n, o) {
				$scope.calculate();
				$scope.payments = $scope.payments_1;
				$scope.input.payment = $scope.payments[0];
			});
			$scope.$watch("input.address_type", function(n, o) {
				$scope.calculate();
			})
		});
	})
	$scope.get_status = function(status) {
		return ["未收貨", "已入倉", "集運中", "貨物配送完成"][status]
	}
	$scope.cargos = [];
	$scope.get_weight = function() {
		var weight = 0;
		angular.forEach($scope.cargos, function(cargo) {
			weight += parseFloat(cargo.kg);
		})
		return weight.toFixed(2);
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
			$scope.query_business_hour();
		} else {
			errorServices.autoHide(data.message);
		}
	});
	$scope.$watch("input.address", function(n, o) {
		if (n === o) return;
		$scope.query_business_hour();
	});
	// query business hour
	$scope.query_business_hour = function() {
		$scope.business_hours = [];
		$scope.input.business_hour = "";
		var jiyuan_type = 1;
		if ($scope.input.way == "SF") {
			jiyuan_type = 2;
		}
		// business hour
		transportServices.query_business_hour({
			take_places: $scope.input.address.address_get,
			jiyuan_type: jiyuan_type
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				$scope.business_hours = data.Result.TimeList;
				$scope.input.business_hour = $scope.business_hours[0];
			} else {
				errorServices.autoHide(data.message);
			}
		})
	};
	$scope.payments_1 = [];
	$scope.payments_2 = [];
	toastServices.show();
	transportServices.query_payments().then(function(data) {
		toastServices.hide()
		if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
			$scope.payments_1 = data.payments;
			$scope.payments_2 = angular.copy(data.payments);
			$scope.payments_2.unshift("貨到付款(只限自營自取點)");
		} else {
			errorServices.autoHide(data.message);
		}
	});
	// payment
	// var $scope.payments_1 = ["支付寶轉賬", "淘寶拍下，付款", "中國銀行，轉賬", "恒生銀行，轉賬"],
	// 	$scope.payments_2 = ["貨到付款(只限自營自取點)", "支付寶轉賬", "淘寶拍下，付款", "中國銀行，轉賬", "恒生銀行，轉賬"];
	$scope.$watch("input.business_hour", function(n, o) {
		if (n.type == "0") {
			$scope.payments = $scope.payments_1;
		}
		if (n.type == "1" && $scope.input.way == "self") {
			$scope.payments = $scope.payments_2;
		}
		$scope.input.payment = $scope.payments[0];
	});
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
					var long_address = address.link_name + "/" + address.link_telephone + "/" + address.province + "-" + address.city + "-" + address.country + "-" + address.address;
					address["long_address"] = long_address;
				});
				$scope.input.travel_address = $scope.travel_addresses[0];
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
	// merge action
	$scope.merge = function() {
		var jiyunType, address_type;
		if ($scope.input.way == "self") {
			jiyunType = 0;
			address_type = -1;
		} else {
			jiyunType = 1;
		}
		if ($scope.input.way == "travel" && $scope.input.address_type == 'business') {
			address_type = 0;
		}
		if ($scope.input.way == "travel" && $scope.input.address_type == 'house') {
			address_type = 1;
		}
		if ($scope.input.way == "SF") {
			address_type = 0;
		}
		// console.log({
		// 	jiyunType: jiyunType,
		// 	addressType: address_type,
		// 	ids: $routeParams.ids,
		// 	address: $scope.input.travel_address && $scope.input.travel_address.long_address,
		// 	take_places: $scope.input.address && $scope.input.address.address_get,
		// 	send_time_ziqu: $scope.input.business_hour && ($scope.input.business_hour.time_get || $scope.input.business_hour.time),
		// 	send_time_paisong: $scope.input.business_hour && ($scope.input.business_hour.time_get || $scope.input.business_hour.time),
		// 	pay_type: $scope.input.payment,
		// 	weight: $scope.get_weight(),
		// 	HKD: $scope.input.hkd,
		// 	RMB: $scope.input.rmb
		// })
		// return;
		toastServices.show();
		userServices.merge_cargos({
			jiyunType: jiyunType,
			addressType: address_type,
			ids: $routeParams.ids,
			address: $scope.input.travel_address && $scope.input.travel_address.long_address,
			take_places: $scope.input.address && $scope.input.address.address_get,
			send_time_ziqu: $scope.input.business_hour && ($scope.input.business_hour.time_get || $scope.input.business_hour.time),
			send_time_paisong: $scope.input.business_hour && ($scope.input.business_hour.time_get || $scope.input.business_hour.time),
			pay_type: $scope.input.payment,
			weight: $scope.get_weight(),
			HKD: $scope.input.hkd,
			RMB: $scope.input.rmb,
			password: $scope.input.password
		}).then(function(data) {
			toastServices.hide()
			if (data.code == config.request.SUCCESS && data.status == config.response.SUCCESS) {
				if ($scope.input.way == "self") {
					$location.path("payment").search("id", data.cargo_id).replace();
				} else {
					$location.path("orders").replace();
				}
			} else {
				errorServices.autoHide(data.message);
			}
		})
	}
})