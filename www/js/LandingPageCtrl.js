

/**
 * Created by hollyschinsky on 10/30/14.
 */
angular.module('conference.LandingPageCtrl', ['conference.services','ngOpenFB'])
.controller('LandingPageCtrl', function($scope, $state, $ionicModal, $timeout, ngFB,FacebookService,fireBaseData) {

//Facebook integration - Register your app and get your App ID from http://developer.facebook.com
  

// Facebook Login (actual Facebook login, have to use your FB credentials)
    $scope.fbLogin = function() {
         ngFB.login({scope: 'email,publish_actions'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
                $state.go('app.sessions');
                $scope.closeLogin();
                $scope.create_user();
            } else {
                alert('Facebook login failed');
            }
        });
    }

    $scope.create_user = function(){
        var user_exists= false;
       
        FacebookService.getProfile(function (user) {
            

            /*fireBaseData.refUser().orderByChild("userid").equalTo(user.id).once('value', function(snapshot) {*/

            fireBaseData.refUser().child(user.id).once('value', function(snapshot) {
            if(snapshot.val() == null){
                var tag = 'ccc999'
                fireBaseData.refUser().child(user.id).push({
                    userid: user.id,
                    name: user.name,
                    pts_bal : 0,
                    tag: tag,
                    });
                fireBaseData.ref().child('tags').push({
                    userid: user.id,
                    tag: tag                    
                    });
                }
            });

        }, null);


        



        
    }
});

