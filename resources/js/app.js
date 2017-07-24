(function () {
  'use strict'

  var elstro = angular.module('elstro', ['ngMessages']);

  elstro.controller('formCtrl', ['$scope', '$http', function($scope, $http) {

    $scope.formModel = {};

    $scope.submitForm = function() {
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if ($scope.contactForm.$invalid) {
        return;
      }

      var request = {
        method: 'POST',
        url: window.location.href + 'contact-form.php',
        headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: $scope.formModel
      }

      $http(request)
      .then(function successCallback(response){
        console.log('Yeah');
        $scope.submitted = false;
        $scope.formModel = {};
        $scope.contactForm.$setUntouched();
        $scope.contactForm.$setPristine();
      },
      function errorCallback(response){
        console.log('Nope');
      });

    };

  }]);
})();
