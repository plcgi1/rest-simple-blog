(function(window){
	'use strict';
	var UserCtrl = function($scope, Users, growl, Auth){

		function error (data) {
			growl.error('Settings pipets');
		};

		function getData () {
			Auth.serverIsAuth({ access_token: $scope.user.token}).$promise
			.then(function (data) {
				$scope.profile = data;
			})
			.catch(error)
		}

		function save() {
			Users.update({
				_id: $scope.profile._id,
				oldPassword: $scope.profile.oldPassword,
				newPassword: $scope.profile.password
			})
			.$promise
			.then(function (data) {
				growl.info('Greatly. Saved your hard work');
			})
			.catch(error);
		}

		$scope.user = Auth.user();

		getData();

		$scope.save = save;
	};
	UserCtrl.$inject = ['$scope', 'Users','growl', 'Auth'];

	angular.module('posts.controllers').controller('UserCtrl',UserCtrl);
})(window);
