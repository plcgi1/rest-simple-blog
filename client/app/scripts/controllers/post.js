(function(window){
	'use strict';
	var PostCtrl = function($scope, Posts, $routeParams, growl, Auth, $location){

		function error (data) {
			growl.error('Wau - errrrrr - muau - hrrrrr');
		};

		function getPostData () {
			if ($routeParams._id === 'new') {
				$scope.title = 'Add new post';
			}
			else {
				Posts.get({ id: $routeParams._id }).$promise
				.then(function (data) {
					$scope.post = data;
					$scope.title = data.title;

				})
				.catch(error)
			}
		}

		function save() {
			var param = $scope.post, method = 'update';

			if (!$scope.post._id) {
				method = 'add';
			}

			Posts[method](param)
			.$promise
			.then(function (data) {
				$scope.post = data;
				if (method == 'add') {
					$location.update_path('/posts/' + $scope.post._id, true);
				}
				growl.info('Greatly guy. Saved your great work');
			})
			.catch(error);
		}

		function clear() {
			delete $scope.query;
			list();
		}

		getPostData();

		$scope.save = save;

		$scope.user = Auth.user();
	};
	PostCtrl.$inject = ['$scope', 'Posts','$routeParams','growl', 'Auth', '$location'];

	angular.module('posts.controllers').controller('PostCtrl',PostCtrl);
})(window);
