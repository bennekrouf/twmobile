angular.module('nibs.activity', [])

    // Routes
    .config(function ($stateProvider) {

        $stateProvider

            .state('app.activity', {
                url: "/activity",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/activity-list.html",
                        controller: "ActivityCtrl"
                    }
                }
            });
    })

    // Services
    .factory('Activity', function ($http, $rootScope) {
        return {
            all: function() {
                console.log("activities client : all");
                return $http.get($rootScope.server.url + '/activities');
            },
            create: function(activity) {
                console.log("activities client : create : ", activity);
                // return $http.get($rootScope.server.url + '/activities');

               return $http.post($rootScope.server.url + '/activities/', activity);
            },
            deleteAll: function() {
                console.log("activities client : deleteAll");
                return $http.delete($rootScope.server.url + '/activities');
            }
        };
    })

    //Controllers
    .controller('ActivityCtrl', function ($scope, $state, Activity) {
        Activity.all().success(function(activities) {
            $scope.activities = activities;
        });

        $scope.doRefresh = function() {
            Activity.all().success(function(activities) {
                $scope.activities = activities;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    });
