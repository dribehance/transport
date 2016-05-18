angular.module("Transport").directive('onRepeatDone', function() {
	return {
		restrict: 'A',
		link: function(scope, el, attr) {
			if (scope.$last) {
				scope.$emit("repeat_done", el);
			}
		}
	};
});