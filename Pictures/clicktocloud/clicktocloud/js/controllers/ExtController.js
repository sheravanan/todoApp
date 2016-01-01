listModule.controller('ExtController',
  ['$scope',
    function ($scope) {
      $scope.pickerState = {};

      $scope.saveState = function(){
        console.log($scope.pickerState);
        alert('code to send data to backend');
      };
    }
  ]
);