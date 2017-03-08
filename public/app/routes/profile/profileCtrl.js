// INITILIZE CONTROLLER
// ============================================================
angular.module("app")
	.controller("profileCtrl", function($scope, user, authService) {

	  // VARIABLES
	  // ============================================================
		$scope.user = user;

	  // FUNCTIONS
	  // ============================================================
		$scope.updateUser = function(user) {
			authService.editUser(user)
				.then(function(response) {
					$scope.user = response.data;
				});
		};

	});
