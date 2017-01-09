

/**
 * Created by hollyschinsky on 10/30/14.
 */
angular.module('conference.LandingPageCtrl', ['conference.services','ngOpenFB'])
.controller('LandingPageCtrl', function($scope, $state, $ionicModal, $timeout, ngFB) {

//Facebook integration - Register your app and get your App ID from http://developer.facebook.com
  

// Facebook Login (actual Facebook login, have to use your FB credentials)
    $scope.fbLogin = function() {
         ngFB.login({scope: 'email,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $state.go('app.sessions');
                $scope.closeLogin();
            } else {
                alert('Facebook login failed');
            }
        });
    }
});
