

/**
 * Created by hollyschinsky on 10/30/14.
 */
angular.module('conference.LandingPageCtrl', ['conference.services'])
.controller('LandingPageCtrl', function($scope,$state, SessionService, FacebookService) {

//Facebook integration - Register your app and get your App ID from http://developer.facebook.com
  openFB.init({appId: '917617758369606'});

// Facebook Login (actual Facebook login, have to use your FB credentials)
    $scope.fbLogin = function() {
       
        FacebookService.login(rspCallback);
        function rspCallback(response) {
            if (response.status === 'connected') {
                $scope.loginMsg = "Facebook login succeeded!";
                $scope.login.result = true;
                $scope.closeLogin();
                $scope.state.go('app/sessions');

                // Could add code to check if on profile page and swap out user with logged in one...
            } else {
                $scope.loginMsg="Facebook login failed";
                $scope.login.result=false;
            }
        }
    }
});
