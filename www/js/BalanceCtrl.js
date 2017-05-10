

angular.module('conference.BalanceCtrl', ['conference.services'])
.controller('BalanceCtrl', function($scope, $ionicPopup, FacebookService, TwitterService, LinkedInService, fireBaseData, $firebaseArray, $firebaseObject
    ) {
    $scope.user = {};

    var fbConnected=false;

    FacebookService.getStatus(function (result) {
        if (result.status == 'connected')
            fbConnected=true;
    })

    if (fbConnected) {
        FacebookService.getProfile(function (user) {

           $scope.user = fireBaseData.refUser().child(user.id).once("child_added",function(data){
            $scope.ptbal = data.val().pts_bal;
            console.log(data.val())

            $scope.getTrans(user.id)

           });
        }, null);
    }
    else {
        // Some Default User Info
        $scope.ptbal = 10;
    }

     

    // open radio pop-up prompt for users to choose number of points to purchase
    
    $scope.openOptions = function(){
          
        // For ionic v2
          
        // var newPop = angular.AlertController.create({
        //     title: "Point Purchase",
        //     buttons: [{ text: "Cancel", role: "Cancel", handler: data=>{console.log('Cancel clicked')}}],
        // }) 
        

        // TODO: 
        //      - bind submit button 
        var myPopup = $ionicPopup.show({
            template: '<form><table style="width:100%" align="center"><tr align="center">\
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
                    if (!$scope.ptadded) {
                        //don't allow the user to close unless he enters wifi password
                        console.log($scope.ptadded)
                        console.log("Am I here?o_o")
                        e.preventDefault();
                    } else {
                        $scope.ptbal += parseInt($scope.ptadded);
                        return $scope.ptadded;
                    }
                }},
                { text: 'Cancel'}
                
            ]
        });
    }
    
    $scope.getTrans = function(userid){
       // $scope.transHistory = $firebaseArray(fireBaseData.ref().child('transaction_history').orderByChild('from').equalTo(userid));
       // console.log("tset")
        //console.log($scope.transHistory)


      var listofOB = [];
      var empOB;
      fireBaseData.ref().child('transaction_history').orderByChild('from').equalTo(userid).on('child_added', snap1 => {
      
       //empOB = snap1.val(); 
       //console.log(empOB)

        fireBaseData.refUser().child(snap1.val().to).on('child_added', function(snap2){
            
            //console.log(snap2.val())
            empOB = snap1.val(); 
            empOB.to = snap2.val()
            listofOB.push(empOB);
             //console.log(empOB);
           
            //console.log(listofOB)
        })


      })
     // console.log(listofOB);
      $scope.transHistory = listofOB;

    }


});