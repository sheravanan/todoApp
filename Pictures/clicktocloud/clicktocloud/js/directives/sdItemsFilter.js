listModule.directive('sdItemsFilter', ['contentService', function(contentService) {
  return {
    restrict: 'E',
    scope: {
      stateModel:'='
    },
    templateUrl: "pickList.html",
    link:function(scope){
      contentService.getContent().then(function(data){
        scope.model = data;
        scope.selectedGroup = scope.model.left[0];
      });

      scope.selectGroup = function(group){
        scope.selectedGroup = group;
      };

      scope.move = function(direction){
        var source = scope.model[direction === 'right' ? 'left' : 'right'];
        var target = scope.model[direction];

        //add to target
        for(var j=0; j<scope.selectedFeatures.length; j++) {
          for (var i = 0; i < target.length; i++) {
            if(scope.selectedFeatures[j].validFor === target[i].validFor){
              if(!target[i].features){
                target[i].features = new Array();
              }
              target[i].features.push(scope.selectedFeatures[j]);
            }
          }
        }

        //remove from source
        for(var j=0; j<scope.selectedFeatures.length; j++) {
          for (var i = 0; i < source.length; i++) {
            if(scope.selectedFeatures[j].validFor === source[i].validFor){
              source[i].features.splice(source[i].features.indexOf(scope.selectedFeatures[j]),1);
            }
          }
        }

        //update the right view
        scope.rightView = [];
        for(var i=0; i< scope.model.right.length; i++){
          if(scope.model.right[i].features){
            scope.rightView = scope.rightView.concat(scope.model.right[i].features);
          }
        }

        scope.stateModel = scope.model.right;
        scope.selectedFeatures =[];

      }
    }
  }
}]);
