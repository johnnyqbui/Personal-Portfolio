(function() {
    'use strict';

    // Angular Modules

    var mainModule = angular.module('appModule', []);

    mainModule.controller('infoController', function($scope, $http) {
        // Personal Bio
        $scope.bio = {
            "name": "Johnny Bui",
            "role": "Front-End Developer",
            "contacts": {
                "email": "johnnyqbui7@gmail.com",
                "github": "https://github.com/johnnyqbui",
                "codepen": "https://codepen.io/jbui/",
                "linkedin": "https://www.linkedin.com/in/johnny-bui-b91893121"
            },
            "about": "I originally pursued a medical career for about two years before I switched my major to Computer Information Systems and took my very first Computer Science class. " +
                "It was then that I discovered my passion for coding. Since then, I've taught myself aspects of Front End Development by taking " +
                "online courses such as Udacity, Udemy, and FreeCodeCamp and even attended a hackathon. Coding is not just a passion to me, it's a lifestyle. " +
                "I am always looking for new and exciting opportunities."
        };

        // Obtain project JSON data
        $http.get('data/projects.json')
            .then(function successCallback(response) {
                var projectData = response.data;
                $scope.projects = projectData;

            }, function errorCallback(response) {
                console.log('Failed to load project data, please refresh page and try again!');
            });


    });

    mainModule.directive('projects', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/projects/projects.html',
        };

    });

    mainModule.directive('contacts', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/contacts/contacts.html',
            link: function(scope, element, attrs) {
                scope.email = 'true';
                scope.$watch('email', function() {
                    scope.toggleEmail = scope.email ? 'Email' : 'johnnyqbui7@gmail.com';
                });
            }
        };
    });

    mainModule.directive('scrollOnClick', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var areaToScroll = attrs.href;
                element.on('click', function() {
                    var target = $("." + areaToScroll).offset().top;
                    $('html, body').animate({
                        scrollTop: target
                    }, 250);
                });
            }
        };
    });
})();
