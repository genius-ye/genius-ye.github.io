function demo() {
	// body...
	alert("hello");
	var url ="http://lst.weishidai888.com/message/login_do.php?message_phone=123&&message_pwd=122";
	$.ajax({
		url:url,
		type:"GET",
		dataType:"jsonP",
		// data:"url="+encodeURIComponent(url),
		success:function(data){
			alert("success");
				// $scope.result = data;
			}
		});
}

/**
*  Module
*
* Description
*/
var app = angular.module('App', []).controller('test', function($scope, $location, $http){
	$scope.datas = ['aaa','bbb','ccc'];
	// $scope.absUrl = $location.absUrl();
	$scope.url = "http://lst.weishidai888.com/message/login_do.php?message_phone=123&&message_pwd=122";
	$scope.result = "";
	$scope.get = function() {
		// body...
		alert($scope.url);

	};

})

