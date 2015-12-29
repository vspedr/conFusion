'use strict';

angular.module('confusionApp')
    .constant("baseURL","http://uvkkfba9631a.vspedr.koding.io:5112/")
    .service('menuFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        this.getDishes = function(){
            //console.log('fetching dishes from server');
            return $resource(baseURL+"dishes/:id",null,  {'update':{method:'PUT' }});
        };
        
        this.getPromotion = function(){
            //console.log('fetching promotions from server')
            return $resource(baseURL+"promotions/:id",null,  {'update':{method:'PUT' }});
        };
    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function($resource, baseURL) {
        
        var corpfac = {};
        corpfac.getLeaders = function() {
            //console.log("fetching leadership data from server");
            return $resource(baseURL+"leadership/:id", null, {'update':{method:'PUT' }});
        };

        return corpfac;
    }])
    
    .factory('feedbackFactory', ['$resource', 'baseURL', function($resource, baseURL){
        var feedfac = {};
        feedfac.getFeedback = function(){
            //console.log('fetching feedback data from the server');
            return $resource(baseURL + "feedback", null, {'save':{method:'POST' }});
        };
        
        return feedfac;
    }])
;
