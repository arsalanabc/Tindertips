angular.module('conference.ProfileCtrl', ['conference.services'])
.controller('TagViewCtrl', function($scope, ngFB, FacebookService, TwitterService, LinkedInService, $ionicPopup,fireBaseData,$firebaseArray,$firebaseObject,$stateParams) {
    //$scope.user = {};
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

$scope.mainuser = null;
FacebookService.getStatus(function (result) {
        if (result.status == 'connected')
            fbConnected=true;
    })

    if (fbConnected) {
        FacebookService.getProfile(function (user) {
            fireBaseData.refUser().child(user.id).on('child_added',function(data){
                //console.log(data.val());
                $scope.mainuser = data.val();
                $scope.mainuser.key = data.key();
                //console.log($scope.mainuser)
            });
        })       
    }



console.log($stateParams.tagId);
var tag = $stateParams.tagId;
fireBaseData.ref().child('tags').orderByChild('tag').equalTo(tag).once('child_added',function(snap){
    console.log(snap.val().userid);

    $scope.items = $firebaseArray(fireBaseData.refComments().orderByChild("userid").equalTo(snap.val().userid));
console.log($scope.items);
    

    //return snap.val();
});



   


 $scope.images = ['http://cache.bmwusa.com/cosy.arox?pov=frontside&brand=WBBI&vehicle=17IC&client=byo&paint=P0C23&fabric=FNFCJ&sa=S02W8,S0322,S0508,S0610&width=630&height=270&resp=png&bkgnd=transparent', 'http://buyersguide.caranddriver.com/media/assets/submodel/7810.jpg', 'https://www.bmwgroup.com/content/dam/bmw-group-websites/bmwgroup_com/panoptikum/Panoptikum_Elektromobilitaet_BMW_i8_mobil.jpg.grp-transform/large/Panoptikum_Elektromobilitaet_BMW_i8_mobil.jpg'];
  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;

  };



  $scope.tip = function(itemid,cur_pts){

        var myPopup = $ionicPopup.show({
            template: '<input ng-model="link" id="link" style="width:30%" align="center" > you have '+ $scope.mainuser.pts_bal,
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
                    }
                    else if (parseInt(link) > parseInt($scope.mainuser.pts_bal)) {
                        //don't allow the user to close unless he enters wifi password

                        $ionicPopup.alert({title: 'Insufficient points'});

                        return null
                        e.preventDefault();} 

                    else if (parseInt(link) <= 0) {
                        //don't allow the user to close unless he enters wifi password

                        $ionicPopup.alert({title: 'Invalid input'});

                        return null
                        e.preventDefault();} 
                    else {
                     

                       // fireBaseData.refUser().child($scope.mainuser.userid).on('child_added',function(data){console.log(data.key())})
console.log($scope.items[0].userid);

                        fireBaseData.refUser().child($scope.mainuser.userid).child($scope.mainuser.key).update({pts_bal    : parseInt($scope.mainuser.pts_bal) - parseInt(link)});

                     
                       fireBaseData.refComments().child(itemid).update({pts_have:parseInt(link)+cur_pts});

                       fireBaseData.ref().child('transaction_history').push({
                        points:parseInt(link),
                        itemid: itemid,
                        from: $scope.mainuser.userid,
                        to: $scope.items[0].userid
                    });
   
                       $scope.mainuser.pts_bal -= parseInt(link);

                        return 0;
                    }

                }},
                { text: 'Cancel'}
                
            ]
        });
    }


     
})