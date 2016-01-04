todolist.directive("customTodo", ['dataService',function(dataService){
return {
  restrict : "E",
  scope : {},
  templateUrl : "directive/todoComponent.html",
  link : function (scope){

    scope.todos = [];
	 dataService.getTodoList().then(function(data){	     
	     angular.forEach(data.todos, function(value,key){
	     	value.startTime=new Date();
	     	value.endTime='';
	     	value.duration='';
	     	scope.todos.push(value);
	     	//console.log(JSON.stringify(scope.todos)+ " JUK ");  	
	     });
	});

	scope.addTodo = function (){
  		scope.todos.push({"todo":scope.todo, "status":scope.select, "startTime":new Date(), "endTime":"","duration":""});
  		scope.todo = "";
    };

	scope.removeTodo = function (removeItem){
	     scope.todos.splice(removeItem,1);
	};

  },
  controller: function ($scope) {
  	$scope.selectEntity = function (index) {
  		startTime = $scope.todos[index].startTime;
    	endTime = new Date();
    	duration = moment.duration(endTime-startTime).humanize();
    	$scope.todos[index].endTime = endTime;
    	$scope.todos[index].duration = duration;
	};
  }
}
}]);