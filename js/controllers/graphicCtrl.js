app.controller('GraphicCtrl',function($scope, getCommunesService){
  $scope.communes = [];
  $scope.data = [];
  function getCommunes(){
    getCommunesService.getCommunes()
    .success(function(data){
      $scope.communes = data;
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
    });
  }

  //Esta función recupera la info para el dropbox de comunas, ejecutando el servicio
  //correspondiente
  getCommunes();

  function getCongestionCommune(id){
    getDataCongestionCommuneService.getData(id)
    .success(function(data){
      $scope.data=data;
    })
    .error(function(error){
      $scope.status = 'Error al obtener los datos del gráfico para la comuna ' + selectedCommune.communeName;
    });
  }
  //Este debería ser el llamado a la comuna pasar id de selectedCommune
  //getCongestionCommune(pasar id);

  // Este es el elemento que debe recibir el json de la peticion get de commune
  /*
  $scope.data = [
    [2, 4, 0, 3, 15, 31, 30, 120, 333, 1200, 750, 847,
    231, 123, 456, 189, 481, 1450, 915, 450, 300, 423, 120, 54, 13]
  ];
  */
  $scope.labels = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00",
                  "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                  "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
                  "21:00", "22:00", "23:00", "24:00"];

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


});
