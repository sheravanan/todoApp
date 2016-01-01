listModule.factory("contentService", ["$http","$q",function($http,$q){

  var baseDataUrl = 'data/';

  var _getContent = function(){
    var groupsUrl = baseDataUrl + 'groups.json';
    var featuresUrl = baseDataUrl + 'feature.json';
    var groupsData;
    var rightGroupData;
    var deferred = $q.defer();
    $http.get(groupsUrl).success(function(data) {
      groupsData = data;
      rightGroupData = angular.copy(groupsData);
      $http.get(featuresUrl).success(function(featuresData) {

        //Update the data structre to match the requirement
        for(var i=0; i< featuresData.length; i++){
          for(var j=0; j< groupsData.length; j++){
            if(groupsData[j].validFor === featuresData[i].validFor){
              if(!groupsData[j].features){
                groupsData[j].features = new Array();
              }
              featuresData[i].type = groupsData[j].label;
              groupsData[j].features.push(featuresData[i]);
            }
          }

        }
        deferred.resolve({left:groupsData, right:rightGroupData});
      }).error(function(result, status) {
        //Failed
      });
    }).error(function(result, status) {
      //Failed
    });
    return deferred.promise;
  };


  return{
    getContent:function(){
       return _getContent();
    }
  }
}]);

