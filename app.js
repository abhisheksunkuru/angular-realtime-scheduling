// create our angular module and inject firebase
angular.module('scheduleApp', ['ngRoute','firebase'])

//angular route
.config(['$routeProvider',function($routeProvider){
  $routeProvider
  .when("/",{
    templateUrl: 'index.html',
    controller: 'mainController'
  })
  .otherwise({
    redirectTo: '/'
  })
}])
// create our main controller and get access to firebase
.controller('mainController', function($scope, $firebase) {

  // connect to firebase
  var ref = new Firebase("https://realtime-scheduling-app.firebaseio.com/days")
  var fb = $firebase(ref);

  // sync as object
  var syncObject = fb.$asObject();
  //Three way data binding
  syncObject.$bindTo($scope, 'days');


  //function to set default data
  $scope.reset = function(){
    fb.$set({
      monday: {
        name: 'Monday',
        slots: {
          0900: {
            time: '9:00am',
            booked: false
          },
          0110: {
            time: '11:00am',
            booked: false
          }
        }
      },
      tuesday: {
        name: 'Tuesday',
        slots: {
          0900: {
            time: '9:00am',
            booked: false
          },
          0110: {
            time: '11:00am',
            booked: false
          }
        }
      }
    })
  }

});