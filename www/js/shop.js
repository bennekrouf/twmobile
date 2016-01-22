angular.module('nibs.offer', [])

// Routes
.config(function ($stateProvider) {

    $stateProvider

        .state('app.shop', {
            url: "/shop",
            views: {
                'menuContent' :{
                    templateUrl: "templates/shop.html"
                }
            }
        });
});
