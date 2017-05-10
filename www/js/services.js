angular.module('conference.services', ['ngResource','firebase'])

.factory('SessionService_old', function ($resource) {
   
    // Node backend - works when running on emulator, browser and with PhoneGap Dev App
    //return $resource('http://localhost:5000/sessions/:sessionId');

    // When testing directly on device using ios run, need to use the URL to your network such as below
    // return $resource('http://192.168.1.5:5000/sessions/:sessionId');
    return {
        getlist: function(){
    var users = [
        {
            id: 1,
            firstName: "Andrew",
            lastName: "McGivery",
        },
        {
            id: 2,
            firstName: "John",
            lastName: "Smith",
        }
    ];
    return users;}}
    //return $resource('http://localhost:8100/js/sessions.JSON');

  
})


.factory('fireBaseData', function($firebase) {
  var ref = new Firebase("https://tinder-tips.firebaseio.com"),
    refCart = new Firebase("https://tinder-tips.firebaseio.com/cart"),
    refUser = new Firebase("https://tinder-tips.firebaseio.com/users"),
    refCategory = new Firebase("https://tinder-tips.firebaseio.com/category"),
    refOrder = new Firebase("https://tinder-tips.firebaseio.com/orders"),
    refFeatured = new Firebase("https://tinder-tips.firebaseio.com/featured"),
    refMenu = new Firebase("https://tinder-tips.firebaseio.com/menu"),
    refJobs = new Firebase("https://tinder-tips.firebaseio.com/jobs"),
    refCompany = new Firebase("https://tinder-tips.firebaseio.com/company"),
    refComments = new Firebase("https://tinder-tips.firebaseio.com/comments");
  return {
    ref: function() {
      return ref;
    },
    refCart: function() {
      return refCart;
    },
    refUser: function() {
      return refUser;
    },
    refCategory: function() {
      return refCategory;
    },
    refOrder: function() {
      return refOrder;
    },
    refFeatured: function() {
      return refFeatured;
    },
    refMenu: function() {
      return refMenu;
    },
    refJobs: function() {
      return refJobs;
    },
    refCompany: function() {
      return refCompany;
    },
    refComments: function() {
      return refComments;
    }
  }
})

.factory('SessionService', function($http, $firebaseArray, fireBaseData) {
    var users = [];
    
    return {
        /*
        getUsers: function(){
             return $http.get('js/sessions.JSON').then(function(result){
                //angular.copy(result.data, users);
                //users = result;
                //console.log("data"+result.data);
                 users = result.data;

                //
                
                 return users;
                
            });},
            */

        getUsers: function(){
             //return $firebaseArray(new Firebase("https://radiant-torch-374.firebaseio.com/comments"));
             return $firebaseArray(fireBaseData.refComments());
        },

        getUser: function(id){         
         //console.log("https://radiant-torch-374.firebaseio.com/comments/"+id); 
         var arr = [];

         //var session = new Firebase("https://radiant-torch-374.firebaseio.com/comments/"+id).once('
            var session = fireBaseData.refComments().child(id).once('value', function(snap) {

                arr['date'] = snap.val()['date'];
                arr['description'] = snap.val()['description'];
                arr['select'] = snap.val()['select'];
                arr['time'] = snap.val()['time'];
                arr['title'] = snap.val()['title'];
                arr['placeholder'] = snap.val()['placeholder'];
                arr['pic'] = snap.val()['pic'];


                console.log('accounts matching id', arr);
                
                //return arr;

            });
            
            return arr;

        }

       
    }
})



.service('FavoriteService', ['$filter', function($filter) {
      var service = {
       
        // favorites: $firebaseArray(fireBaseData.refComments()),
        addFave: function ( item, successCallback, dupeCallback ) {
            // Only add if doesn't exist
            var session = filterById(service.favorites,item.id);
            console.log('in addFave '+ session);
            if (session == null) {
                service.favorites.push(item);
                successCallback(item);
            }
            else dupeCallback();

            // Filter function to look for a dupe
            function filterById(faves, id) {
                return faves.filter(function(faves) {
                    return (faves['id'] == id);
                })[0];
            }
        },
        removeFave: function (item) {
            //service.favorites.splice(service.favorites.indexOf(item),1);
            var obj = $filter('filter')(favorites, function (fave) {
                console.log("Fave id " + fave.id)
                return fave.id === item.id;})[0];
            service.favorites.splice(service.favorites.indexOf(obj),1);
        }
    }
    return service;
}])



