(function(){
	'use strict';
	var ResetPasswordCtrl = function($scope, ResetPassword, $routeParams, growl, Auth, $location){

		function error (data) {
			$scope.error = true;
			$scope.process = false;

			$location.update_path('/reset-password', true);

			growl.error('Reset password error');
		};

		function resetPassword () {
			$scope.process = true;
			ResetPassword.reset(
				{ email: $scope.email, password: $scope.password }
			).$promise
			.then(function (data) {
				$scope.process = false;
				growl.info('Instructions link has been sent to your email:' + $scope.email);
			})
			.catch(error);
		}

		function confirm() {
			if (!$routeParams.hash) {
				return;
			}
			ResetPassword.confirm({ token: $routeParams.hash }).$promise
			.then(function (data) {
				Auth.saveLS(data);

				location.assign('#!/profile');
				location.reload();
			})
			.catch(error)
		}

		$scope.error = false;
		$scope.process = false;
		$scope.resetPassword = resetPassword;

		confirm();
	};
	ResetPasswordCtrl.$inject = ['$scope', 'ResetPassword', '$routeParams', 'growl', 'Auth', '$location'];

	angular.module('posts.controllers').controller('ResetPasswordCtrl',ResetPasswordCtrl);
})();
