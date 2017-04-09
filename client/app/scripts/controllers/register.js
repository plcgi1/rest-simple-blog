(function(window){
	'use strict';
	var RegisterCtrl = function($scope, Register, $routeParams, growl){

		function error (data) {
			$scope.error = true;
			growl.error('Register error');
		};

		function register () {
			Register.register(
				{ name: $scope.name, email: $scope.email, password: $scope.password }
			).$promise
			.then(function (data) {
				growl.info('Registration link has been sent to your email:' + $scope.email);
			})
			.catch(error);
		}

		function confirm() {
			if (!$routeParams.hash) {
				return;
			}
			Register.confirm({ hash: $routeParams.hash }).$promise
			.then(function (data) {
				alert('ok');
			})
			.catch(error)
		}

		$scope.error = false;
		$scope.register = register;

		confirm();
	};
	RegisterCtrl.$inject = ['$scope', 'Register', '$routeParams', 'growl'];

	angular.module('posts.controllers').controller('RegisterCtrl',RegisterCtrl);
})(window);
