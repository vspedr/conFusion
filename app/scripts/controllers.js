'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
            $scope.showMenu = false;
            $scope.showPromotion = false;
            $scope.showChef = false;
            $scope.message = "Loading...";
            
            menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    //console.log(response);
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    //console.log(response);
                }
            );
            /*
            $scope.dishes= {};
            
            menuFactory.getDishes()
            .then(
                function(response) {
                    $scope.dishes = response.data;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                }
            );
            */
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory) {
            
            $scope.sendFeedback = function() {
                
                //console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    
                    feedbackFactory.getFeedback().save($scope.feedback);
                    console.log($scope.feedback);
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
            $scope.showDish = false;
            $scope.message = "Loading...";
            menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                    function(response){
                    $scope.dish = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    console.log($scope.message);
                }
            );
            /*
            $scope.dish = {};
            menuFactory.getDish(parseInt($stateParams.id,10))
            .then(
                function(response){
                    $scope.dish = response.data;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    console.log($scope.message);
                }
            );
            */
        }])

        .controller('DishCommentController', ['$scope', 'menuFactory',function($scope, menuFactory) {
            
            $scope.newComment = {rating:5, comment:"", author:"", date:""};
            
            $scope.submitComment = function () {
                $scope.newComment.date = new Date().toISOString();
                console.log($scope.newComment);
                $scope.dish.comments.push($scope.newComment);

                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                $scope.commentForm.$setPristine();
                $scope.newComment = {rating:5, comment:"", author:"", date:""};
            };
        }])

        // implement the IndexController and About Controller here
        .controller('IndexController',
            ['$scope', 'menuFactory', 'corporateFactory', 
            function($scope, menuFactory, corporateFactory) {
                $scope.message =  'Loading...';
                
                menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.featuredDish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                        //console.log($scope.message);
                    }    
                );
                
                menuFactory.getPromotion().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.featuredPromotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                        //console.log($scope.message);
                    }
                    
                );
                
                corporateFactory.getLeaders().get({id:3})
                .$promise.then(
                    function(response){
                        $scope.chef = response;
                        $scope.showChef = true;
                    },
                    function(response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                        //console.log($scope.message);
                    }
                );
                
                /*
                $scope.featuredDish = {};
                menuFactory.getDish(0)
                .then(
                    function(response){
                        $scope.featuredDish = response.data;
                        $scope.showDish = true;
                    },
                    function(response){
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                        console.log(response.statusText);
                    }
                );
                */
                //$scope.featuredPromotion = menuFactory.getPromotion(0);
                //$scope.chef = corporateFactory.getLeader(3);
        }])
        
        .controller('AboutController',
            ['$scope', 'corporateFactory',
            function($scope, corporateFactory) {
                //$scope.leaders = corporateFactory.getLeaders();
                $scope.message = "Loading...";
                $scope.showLeaders = false;
                corporateFactory.getLeaders().query(
                    function(response){
                        $scope.leaders = response;
                        //console.log(response)
                        $scope.showLeaders = true;
                    },
                    function(response){
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                        //console.log(response);
                    }
                );
            }])

;
