(function(window){
    'use strict';
    var PostsCtrl = function($scope,Posts,Auth,growl){
        function error (data) {
            growl.error('Wau - errrrrr');
        };

        function list() {
            var param = {};

            if ($scope.query) {
                param.query = $scope.query;
            }

			Posts.list(param)
				.$promise
				.then(function (data) {
					$scope.data = data;
				})
				.catch(error);
        }

        function remove (post) {
        	Posts.remove({ _id: post._id }).$promise
				.then(function () {
					list();
				})
				.catch(error);
		}

        function clear() {
        	delete $scope.query;
        	list();
		}

        $scope.list = list;
		$scope.clear = clear;
		$scope.remove = remove;

		$scope.user = Auth.user();

        list();
    };
	PostsCtrl.$inject = ['$scope', 'Posts','Auth','growl'];

    angular.module('posts.controllers').controller('PostsCtrl',PostsCtrl);
})(window);
