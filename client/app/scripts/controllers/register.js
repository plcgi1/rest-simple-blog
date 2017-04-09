(function(window){
	'use strict';
	var RegisterCtrl = function($scope, Register, $routeParams, growl, Auth){

		function error (data) {
			$scope.error = true;
			$scope.process = false;
		};

		function register () {
			$scope.process = true;

			Register.register(
				{ name: $scope.name, email: $scope.email, password: $scope.password }
			).$promise
			.then(function (data) {
				growl.info('Registration link has been sent to your email:' + $scope.email);
				$scope.process = false;
				$scope.error = false;
			})
			.catch(function (data) {
				error();
				growl.error('Registration error');
			});
		}

		function confirm() {
			if (!$routeParams.hash) {
				return;
			}
			Register.confirm({ hash: $routeParams.hash }).$promise
			.then(function (data) {
				Auth.saveLS(data);

				setTimeout(function(){
					location.href = '#!/';
					location.reload();
				},5000);
			})
			.catch(function (data) {
				error();
				setTimeout(function () {
					location.reload();
				}, 5000);
			})
		}

		$scope.process = false;
		$scope.error = false;
		$scope.register = register;

		confirm();
	};
	RegisterCtrl.$inject = ['$scope', 'Register', '$routeParams', 'growl', 'Auth'];

	angular.module('posts.controllers').controller('RegisterCtrl',RegisterCtrl);
})(window);
