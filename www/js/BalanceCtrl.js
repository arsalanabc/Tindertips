/**
 * Created by Charles on 01/08/17.
 */
angular.module('conference.BalanceCtrl', ['conference.services'])
.controller('BalanceCtrl', function($scope, $ionicPopup, FacebookService, TwitterService, LinkedInService) {
    $scope.user = {};
    var fbConnected=false;

    FacebookService.getStatus(function (result) {
        if (result.status == 'connected')
            fbConnected=true;
    })

    if (fbConnected) {
        FacebookService.getProfile(function (user) {
            $scope.user = user;
            $scope.user.pic = "http://graph.facebook.com/" + user.id + "/picture?height=100&type=normal&width=100";
        }, null);
    }
    else {
        // Some Default User Info
        $scope.ptbal = 0;
    }

    // open radio pop-up prompt for users to choose number of points to purchase
    
    $scope.openOptions = function(){
          
        // For ionic v2
          
        // var newPop = angular.AlertController.create({
        //     title: "Point Purchase",
        //     buttons: [{ text: "Cancel", role: "Cancel", handler: data=>{console.log('Cancel clicked')}}],
        // }) 
        
        var myPopup = $ionicPopup.show({
            template: '<form><table style="width:100%" align="center"><tr align="center">\
            <td align="center">1 pt<p>$ 0.75</p><input type="radio" value=1 ng-model="ptadded"></td>\
            <td align="center">5 pts<p>$ 2.59</p><input type="radio" value=5 ng-model="ptadded"></td>\
            <td align="center">10 pts<p>$ 4.99</p><input type="radio" value="10" ng-model="ptadded"></td> \
            <td align="center">20 pts<p>$ 9.99</p><input type="radio" value="20" ng-model="ptadded"></td> \
            <td align="center">50 pts<p>$ 22.99</p><input type="radio" value=50 ng-model="ptadded"></td>\
            <td align="center">100 pts<p>$ 49.99</p><input type="radio" value=100 ng-model="ptadded"></td>\
            <td align="center">1000 pts<p>$ 399.99</p><input type="radio" value=1000 ng-model="ptadded"></td></tr></table></form>',
            title:'Point Purchase',
            subTitle:'Choose one of the followings.',
            scope:$scope,
            buttons:[
                { text: 'Submit', onTap: function(e) {
                    
                    var myInput = document.getElementsByTagName('input');
                    for (var i=0; i < myInput.length; i++){
                        if(myInput[i].type === 'radio' && myInput[i].checked){
                            $scope.ptadded = myInput[i].value;
                        }
                    }
                    var popup2 = $ionicPopup.confirm({
                        template:"<div><p>Please confirm amount of points you're purchasing:\
                         </p><strong style='width:100%;font-size: 35px;color: red; text-align:center'>\
                         " + $scope.ptadded + " points</strong></div>",
                        buttons:[
                            { text: 'Purchase', onTap: function(e){
                                $scope.ptbal += parseInt($scope.ptadded);
                            } },
                            { text: 'Cancel ', onTap: function(){
                                myPopup.then();
                            } }
                        ]
                    })
                    // if($scope.ptadded){
                    //     var conf = confirm("Please confirm the amount you're purchasing: \n" + $scope.ptadded + " points");
                    //     if (conf){
                    //         $scope.ptbal += parseInt($scope.ptadded);
                    //         return $scope.ptadded;
                    //     } else{
                    //         e.preventDefault();
                    //         this.close();
                    //     }
                    // }
                    
                }},
                { text: 'Cancel'}
                
            ]
        });
    }
});