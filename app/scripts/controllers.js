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
                    $scope.showMenu = true;
                    //console.log(response);
                },
                function(response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                    //console.log(response);
                }
            );
                        
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
                    //console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    feedbackFactory.getFeedback().save($scope.feedback);
                    //console.log($scope.feedback);
                    
                    // Reset the form to pristine state
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

        .controller('IndexController',
            ['$scope', 'menuFactory', 'corporateFactory', 
            function($scope, menuFactory, corporateFactory) {
                $scope.dishMessage =  'Loading...';
                $scope.showDish = false;
                menuFactory.getDishes().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.featuredDish = response;
                        $scope.showDish = true;
                    },
                    function(response) {
                        $scope.dishMessage = "Error: " + response.status + " " + response.statusText;
                        //console.log($scope.message);
                    }    
                );
                
                $scope.promotionMessage = 'Loading...';
                $scope.showPromotion = false;
                menuFactory.getPromotion().get({id:0})
                .$promise.then(
                    function(response){
                        $scope.featuredPromotion = response;
                        $scope.showPromotion = true;
                    },
                    function(response) {
                        $scope.promotionMessage = "Error: " + response.status + " " + response.statusText;
                        //console.log($scope.message);
                    }
                    
                );
                
                $scope.chefMessage = 'Loading...';
                $scope.showChef = false;                
                corporateFactory.getLeaders().get({id:3})
                .$promise.then(
                    function(response){
                        $scope.chef = response;
                        $scope.showChef = true;
                    },
                    function(response) {
                        $scope.chefMessage = "Error: " + response.status + " " + response.statusText;
                        //console.log($scope.message);
                    }
                );
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
