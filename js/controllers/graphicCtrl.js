app.controller('GraphicCtrl',function($scope, getCommunesService){
  $scope.communes = [];
  function getCommunes(){
    getCommunesService.getCommunes()
    .success(function(data){
      $scope.communes = data;
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
    });
  }
  getCommunes();
});
