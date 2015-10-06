angular.module('myApp', []).controller('myController', ['$scope', function($scope){
	$scope.msg = 'こんにちは、誰かさん';
	$scope.onclick=function(){
		$scope.msg='こんにちは、' + $scope.name+'さん';
	};
}]);
