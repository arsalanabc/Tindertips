angular.module('conference.ContributionCtrl', ['conference.services'])
.controller('ContributionCtrl', function($scope,SessionService,$firebaseAuth,$firebaseObject, $firebaseArray){
	$scope.user = {}
	$scope.sessions = SessionService.getUsers();
	$scope.user.tag = "tag_1234"
	$scope.user.wishlist = []

	// this is for interacting with Firebase
	var fb = new Firebase("https://radiant-torch-374.firebaseio.com/comments");
	var fbAuth = $firebaseAuth(fb);
	var firebaseArray =  $firebaseArray(fb);
	var firebaseObject =  $firebaseObject(fb);
})