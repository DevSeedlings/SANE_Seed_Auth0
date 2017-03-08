var app = angular.module("app", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	// RESOLVE CONSTANTS
	// ============================================================
	var limitUser = function(authService, $state) {
		return authService.getCurrentUser()
			.then(function(response) {
				if (!response.data)
					$state.go('home');
				return response.data;
			})
			.catch(function(err) {
				$state.go('home');
			});
	};

	var getUser = function(authService) {
		return authService.getCurrentUser()
			.then(function(response) {
				return response.data;
			})
	};

	// INITILIZE STATES
	// ============================================================
	$stateProvider

		// HOME STATE
		.state('home', {
			url: "/",
			templateUrl: "./app/routes/home/homeTmpl.html",
			controller: 'homeCtrl',
			resolve: {
				user: getUser
			}
		})

		//PROFILE STATE
		.state('profile', {
			url: '/profile',
			templateUrl: './app/routes/profile/profileTmpl.html',
			controller: 'profileCtrl',
			resolve: {
				user: limitUser
			}
		});


	// ASSIGN OTHERWISE
	// ============================================================
	$urlRouterProvider.otherwise('/home');
});
