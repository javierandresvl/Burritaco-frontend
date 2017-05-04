app.controller('MainCtrl', function($scope){
	$scope.items = [
      'Angular JS',
      'Sass',
      'NPM'
    ];

  $scope.addNew = function(){
    $scope.items.push($scope.newItem);
    console.log($scope.items);
  }

	
});
