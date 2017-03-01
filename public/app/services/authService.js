angular.module("app")
	.service("authService", function($http) {

		this.logout = function() {
			return $http({
					method: 'get',
					url: '/api/logout'
				})
				.then(function(response) {
					return response;
				});
		};

		this.getCurrentUser = function() {
			return $http({
					method: 'GET',
					url: '/api/me'
				})
				.then(function(response) {
					return response;
				});
		};

		this.editUser = function(user) {
			return $http({
					method: 'PUT',
					url: "/api/user/current",
					data: user
				})
				.then(function(response) {
					return response;
				});
		};
	});
