// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("md5Services", function(md5) {
	return {
		'encrypt': function(params) {
			var params_array = [],
				params_string,
				md5_string,
				md5_key = "2016lBiBiCargo!@#12310181112";
			angular.forEach(params, function(value, key) {
				// 中文处理，包含中日韩
				if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
					value = encodeURIComponent(value);
				}
				params_array.push(key + "=" + value);
			});
			// 过滤不需要签名字段
			params_array = params_array.filter(function(param) {
				return param.indexOf("message=") == -1;
			});
			// 字典排序
			params_string = params_array.sort().join("&");
			// 拼接key
			params_string = params_string + "&key=" + md5_key;
			// md5
			md5_string = md5.createHash(params_string);
			return md5_string.toUpperCase();
		},
	}
});
// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("md5Interceptor", function($q, md5Services, errorServices, config) {
	return {
		// optional method
		'request': function(config) {
			// intercept .html static resource
			if (config.url.indexOf(".html") > 0) {
				return config;
			}
			var encrypt_params = md5Services.encrypt(config.params);
			config.params.app_sign = encrypt_params;
			return config;
		},
		// optional method
		'requestError': function(rejection) {},
		// optional method
		'response': function(response) {
			// do something on success
			var defer = $q.defer();
			// static response
			if (response.config.url.indexOf(".html") > 0) {
				return response;
			}
			// server response
			if (response.data.code == config.request.SIGN_ERROR) {
				console.log("SIGN_ERROR");
				errorServices.show(response.data.message)
				return defer.promise;
			} else {
				return response;
			}
			return response;
		},
		// optional method
		'responseError': function(rejection) {
			var defer = $q.defer();
			errorServices.requestError(rejection.data, rejection.status, rejection.headers, rejection.config);
			return defer.promise;
		}
	}
})