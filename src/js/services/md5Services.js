// by dribehance <dribehance.kksdapp.com>
angular.module("Transport").factory("md5Services", function(md5) {
	return {
		'encrypt': function(params) {
			var params_array = [],
				params_string,
				md5_string,
				md5_key = "2016lBiBiCargo!@#12310181112";
			angular.forEach(params, function(value, key) {
				params_array.push(key + "=" + value);
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
})