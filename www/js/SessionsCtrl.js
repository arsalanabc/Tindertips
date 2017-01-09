/**
 * Created by hollyschinsky on 10/30/14.
 */
angular.module('conference.SessionsCtrl', ['conference.services'])
.controller('SessionsCtrl', function($scope, SessionService, $ionicPopover, $ionicLoading, $ionicModal,$firebaseAuth,$firebaseObject, $firebaseArray) {


   $scope.sessions = SessionService.getUsers();
   console.log($scope.sessions)
   
   // Get all the sessions
   
   /*SessionService.getUsers().then(function(data) {
        $scope.sessions = data;
    });*/
   
   //console.log("$scope.user in SessionsCtrl"+ FacebookService.getProfile());
    //



 //$scope.check(); 

// THIS IS FOR TH ELOADING ICON
 /*  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    }).then(function(){
       console.log("The loading indicator is now displayed");
    });
  };
  $scope.hide = function(){
    $ionicLoading.hide().then(function(){
       console.log("The loading indicator is now hidden");
    });
  };
$ionicLoading.show();*/




// this is for interacting with Firebase
var fb = new Firebase("https://radiant-torch-374.firebaseio.com/comments");
var fbAuth = $firebaseAuth(fb);
var firebaseArray =  $firebaseArray(fb);
var firebaseObject =  $firebaseObject(fb);
//console.log(firebaseArray.$keyAt(1));
//console.log("fbauth in sesssionctrl"+fbAuth);

// this is pulling sessions/comments from firebase
//$scope.sessions = firebaseArray;
//end firebase

var date = new Date();

$scope.formSubmit = function(data){
    var title = data.title;
    var description = data.description;
    var select = data.select;

    firebaseArray.$add({
        date: date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2),
        time: Firebase.ServerValue.TIMESTAMP,
        userid : "placeholder",
        title:title,
        description: description,
        select: select
    });

    $scope.closeModal();
};




$scope.startModal = function(){
  $ionicModal.fromTemplateUrl('templates/sign-in.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
     $scope.openModal();
  });
};


  $scope.openModal = function() {
    //$scope.startModal();
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });



  
  // TODO: change this part to search through list items to wishlist
    // Filter sessions by entering text in field and selecting from drop-down
    $scope.setFilter = function() {
        var search = $scope.searchTxt;
        var field = this.field;

        if (field === 'title')
            $scope.search = {title:search};
        else if (field === 'speaker')
            $scope.search = {speaker:search};
        else if (field === 'description')
            $scope.search = {description:search};
        else $scope.search = {$:search}; // ALL cases
    };

    $scope.clear = function() {$scope.searchTxt=""};

    // About version popover handling
    $ionicPopover.fromTemplateUrl('templates/about-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.showFilterPopover = function($event) {
        $scope.popover.show($event);
    };

    $scope.closePopover = function() {
        $scope.popover.hide();
    };

    // Cleanup the popover upon destroy event
    $scope.$on('$destroy', function() {
        $scope.popover.remove();
    });
})