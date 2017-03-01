var app = angular.module("app", ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "./app/routes/home/homeTmpl.html",
			controller: 'homeCtrl'
		})
		.state('profile', {
			url: '/profile',
			templateUrl: './app/routes/profile/profileTmpl.html',
			controller: 'profileCtrl',
			resolve: {
				user: function(authService, $state) {
					return authService.getCurrentUser()
						.then(function(response) {
							console.log('response.data: ', response.data);
							
							if (!response.data)
								$state.go('home');
							return response.data;
						})
						.catch(function(err) {
							$state.go('home');
						});
				}
			}
		});

});
