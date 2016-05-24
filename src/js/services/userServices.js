// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("userServices", function($http, localStorageService, config) {
	return {
		signin: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/Login",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		signup: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/doReg",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		forget: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/forgetPwdPost",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		get_smscode_1: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/sendCode",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		get_smscode_2: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/sendForgetCode",
				method: "GET",
				params: angular.extend({}, config.common_params, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_userinfo: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/userInfo",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_address: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/addressList",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		remove_address: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/deleteAddress",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		create_address: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/addAddress",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		modify_userinfo: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/UserCenter/updatePswOrEmail",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		charge: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/ServerManage/addCharge",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_charge_records: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/ServerManage/chargeList",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		askforpay: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/ServerManage/addPay",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_askforpay_records: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/ServerManage/payList",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		create_cargo: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/CargoManage/addItemRegiste",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_cargos: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/CargoManage/itemRegisterList",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_merge_cargos: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/CargoManage/mergeCargo",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		},
		query_orders: function(input) {
			return $http({
				// by dribehance <dribehance.kksdapp.com>
				url: config.url + "/mobile/CargoManage/cargoList",
				method: "GET",
				params: angular.extend({}, config.common_params, {
					token: localStorageService.get("token")
				}, input)
			}).then(function(data) {
				return data.data;
			});
		}
	}
});