// Uses the Favorites Service to filter the list that we've marked...
angular.module('conference.FavoritesCtrl', ['conference.services'])
.controller('FavoritesCtrl', function($scope, $ionicLoading, $ionicPopup, FavoriteService, FacebookService, TwitterService,$firebaseArray,fireBaseData) {
    
   FacebookService.getProfile(function (user) {
    console.log(user.id)
        $scope.favorites = $firebaseArray(fireBaseData.refComments().orderByChild("userid").equalTo(user.id));
        
});
        
      

    $scope.showDelete = false;
    //$scope.item = {};
    $scope.showBtn = function() {
        if ($scope.showDelete===false)
            $scope.showDelete=true
        else ($scope.showDelete=false)
    }

    $scope.shareNative = function() {
        if (window.plugins && window.plugins.socialsharing) {
            window.plugins.socialsharing.share("I'll be attending the session: " + $scope.session.title + ".",
                'PhoneGap Day 2014', null, "http://pgday.phonegap.com/us2014",
                function() {
                    console.log("Success")
                },
                function (error) {
                    console.log("Share fail " + error)
                });
        }
        else console.log("Share plugin not available");
    }

    $scope.follow = function(screenname) {
        if (TwitterService.isReady()) {
            TwitterService.follow(screenname).then(function (data) {
                console.log("Speaker has " + data.followers_count + " followers");
                showToast('You are now following ' + screenname + ' (total number of followers '+ data.followers_count+')');
            });
        }
        else alert('You must first login with Twitter to use this feature.');
    }

    function showToast(message) {
        if (window.plugins && window.plugins.toast) {
            window.plugins.toast.showShortCenter(message);
        }
        else $ionicLoading.show({ template: message, noBackdrop: true, duration: 2000 });
    }

    

    //$scope.item.totpts = 100;
    //$scope.item.pts = 0;

    $scope.additem = function(){
          
        // For ionic v2
          
        // var newPop = angular.AlertController.create({
        //     title: "Point Purchase",
        //     buttons: [{ text: "Cancel", role: "Cancel", handler: data=>{console.log('Cancel clicked')}}],
        // }) 
        

        // TODO: 
        //      - bind submit button 
        var myPopup = $ionicPopup.show({
            template: '<input ng-model="link" id="link"> <form><table style="width:100%" align="center"><tr align="center">\
            <td align="center">1 pt<p>$ 0.75</p><input type="radio" value=1 ng-model="ptadded"></td>\
            <td align="center">5 pts<p>$ 2.59</p><input type="radio" value=5 ng-model="ptadded"></td>\
            <td align="center">10 pts<p>$ 4.99</p><input type="radio" value="10" ng-model="ptadded"></td> \
            <td align="center">20 pts<p>$ 9.99</p><input type="radio" value="20" ng-model="ptadded"></td> \
            <td align="center">50 pts<p>$ 22.99</p><input type="radio" value=50 ng-model="ptadded"></td>\
            <td align="center">100 pts<p>$ 45.99</p><input type="radio" value=100 ng-model="ptadded"></td>\
            <td align="center">1000 pts<p>$ 399.99</p><input type="radio" value=1000 ng-model="ptadded"></td></tr></table></form>',
            title:'Point Purchase',
            subTitle:'Choose one of the followings.',
            scope:$scope,
            buttons:[
                { text: 'Submit', onTap: function(e) {
                    var mIn = document.getElementsByTagName('input');
                    for(var i=0; i<mIn.length;i++){
                        if(mIn[i].type === 'radio' && mIn[i].checked){
                            $scope.ptadded = mIn[i].value;
                        }
                    }
                    var link = document.getElementById('link').value;

                    if (!link) {
                        //don't allow the user to close unless he enters wifi password
                        
                        console.log("Am I here?o_o")
                        e.preventDefault();
                    } else {
                        $scope.userid = "";




                FacebookService.getProfile(function (user) {
        
         
                        fireBaseData.refComments().push({
                            link: link,
                            userid: user.id,
                            title: "no name",
                            pic: "no image",
                            pts_need: "many",
                            pts_have : 0,
                            approved: false

                        })}, null);
                        
                       
                        return $scope.ptadded;
                    }
                }},
                { text: 'Cancel'}
                
            ]
        });
    }
})
