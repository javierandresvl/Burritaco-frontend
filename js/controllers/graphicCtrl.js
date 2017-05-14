app.controller('GraphicCtrl',function($scope, getCommunesService){
  $scope.communes = [];
  $scope.dataGraph = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  
  function getCommunes(){
    getCommunesService.getCommunes()
    .success(function(data){
      $scope.communes = data;
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
    });
  }
  
  function getDataCongestionCommune(id){
    getCommunesService.getCongestionData(id)
    .success(function(data){
      $scope.dataGraph=data;
    })
    .error(function(error){
      $scope.status = 'Error al obtener los datos del gráfico para la comuna ' + $scope.selectedCommune.communeName;
    });
  }

  $scope.$watch("selectedCommune", function(){
      console.log($scope.selectedCommune.communeId);
      getDataCongestionCommune($scope.selectedCommune.communeId);
  }, true);
  
  $scope.labels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
                  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                  "21:00", "22:00", "23:00"];

  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    },
    elements: {
      line: {
        tension: 0
      }
    }
  };

  //Esta función recupera la info para el dropbox de comunas, ejecutando el servicio
  //correspondiente
  getCommunes();

});
