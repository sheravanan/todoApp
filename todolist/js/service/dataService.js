todolist.factory("dataService", ["$http", "$q",function($http,$q){

// get the todos list

return {

 getTodoList:function (){

    var deferred = $q.defer();
    $http.get("data/todo.json")
    .success (function (data,status){
     deferred.resolve(data);
    })
    .error(function (data,status) {
      deferred.reject(data);
    });
    return deferred.promise;
    
  }
  
}

}]);