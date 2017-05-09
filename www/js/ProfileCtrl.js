angular.module('conference.ProfileCtrl', ['conference.services'])
.controller('ProfileCtrl', function($scope, ngFB, FacebookService, TwitterService, LinkedInService, $ionicPopup,fireBaseData,$firebaseArray) {
    $scope.user = {};
    var fbConnected=false;

   /* ngFB.api({
        path: '/me',
        params: {fields: 'id,name,cover'}
    }).then(
        function (user) {
            $scope.user = user;
            console.log(user.id);
        },
        function (error) {
            alert('Facebook error: ' + error.error_description);
        });

*/



    FacebookService.getStatus(function (result) {
        if (result.status == 'connected')
            fbConnected=true;
    })

    if (fbConnected) {
        FacebookService.getProfile(function (user) {
            $scope.items = $firebaseArray(fireBaseData.refComments().orderByChild("userid").equalTo(user.id));
console.log($scope.items);

        }, null);
    }
    else {
        // Some Default User Info
        $scope.user.name = "Ryan Phillips";
        $scope.user.email = "ryan.phillips@agilesystems.com";
        $scope.user.pic = "pics/default-user.jpg"
    }

 $scope.images = ['http://cache.bmwusa.com/cosy.arox?pov=frontside&brand=WBBI&vehicle=17IC&client=byo&paint=P0C23&fabric=FNFCJ&sa=S02W8,S0322,S0508,S0610&width=630&height=270&resp=png&bkgnd=transparent', 'http://buyersguide.caranddriver.com/media/assets/submodel/7810.jpg', 'https://www.bmwgroup.com/content/dam/bmw-group-websites/bmwgroup_com/panoptikum/Panoptikum_Elektromobilitaet_BMW_i8_mobil.jpg.grp-transform/large/Panoptikum_Elektromobilitaet_BMW_i8_mobil.jpg'];
  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;

  };



  $scope.tip = function(){

        var myPopup = $ionicPopup.show({
            template: '<input ng-model="link" id="link" style="width:30%" align="center" >',
            title:'How much would you like to tip',
            subTitle:'Choose one of the followings.',
            scope:$scope,
            buttons:[
                { text: 'Submit', onTap: function(e) {
                   var link = document.getElementById('link').value;

                    if (!link) {
                        //don't allow the user to close unless he enters wifi password
                        
                        console.log("Am I here?o_o")
                        e.preventDefault();
                    } else {
                        $scope.userid = "";
   
                       
                        return $scope.ptadded;
                    }

                }},
                { text: 'Cancel'}
                
            ]
        });
    }


     
})