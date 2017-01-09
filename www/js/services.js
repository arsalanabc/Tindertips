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

.factory('SessionService', function($http, $firebaseArray) {
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
             return $firebaseArray(new Firebase("https://radiant-torch-374.firebaseio.com/comments"));
        },

        getUser: function(id){         
         //console.log("https://radiant-torch-374.firebaseio.com/comments/"+id); 
         var arr = [];
            var session = new Firebase("https://radiant-torch-374.firebaseio.com/comments/"+id).once('value', function(snap) {

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
        favorites: [],
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
            var obj = $filter('filter')(service.favorites, function (fave) {
                console.log("Fave id " + fave.id)
                return fave.id === item.id;})[0];
            service.favorites.splice(service.favorites.indexOf(obj),1);
        }
    }
    return service;
}])



