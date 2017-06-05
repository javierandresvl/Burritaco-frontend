app.controller('GraphicCtrl',function($scope, getCommunesService){
  $scope.communes = [];
  $scope.dataGraph = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  $scope.selectedCommune = 0;
  $scope.fechaInicio=null;
  $scope.fechaFinal=null;

  //Esta función recupera la info para el dropbox de comunas, ejecutando el servicio
  //correspondiente
  getCommunes();

  function getCommunes(){
    getCommunesService.getCommunes()
    .success(function(data){
      $scope.communes = data;
      $scope.communes.sort(function(a,b){
        var resultado = a.communeName<b.communeName;
        return a.communeName.localeCompare(b.communeName);
      });
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
    });
  }

  function getDataCongestionCommune(id){
    getCommunesService.getCongestionData(id)
    .success(function(data){
      $scope.options={
        title:{
          display:true,
          text:"Detalle de reportes de congestión durante el día en: "+$scope.selectedCommune.communeName,
          fontSize: 20,
          fontFamily: "Arial",
          fontColor: "black",
        },
        scales: {
          yAxes: [
            {
              id: 'y-axis',
              type: 'linear',
              display: true,
              position: 'left',
              scaleLabel: {
                            display: true,
                            labelString: "Número de reportes",
                            fontFamily: "Arial",
                            fontColor: "black",
                            fontSize: 14
                        }
            }
          ]
        },
        elements: {
          line: {
            tension: 0
          }
        }
      }
      for (var key in data) {
        switch (key) {
          case "00:00": $scope.dataGraph[0]=data[key];
          case "01:00": $scope.dataGraph[1]=data[key];
          case "02:00": $scope.dataGraph[2]=data[key];
          case "03:00": $scope.dataGraph[3]=data[key];
          case "04:00": $scope.dataGraph[4]=data[key];
          case "05:00": $scope.dataGraph[5]=data[key];
          case "06:00": $scope.dataGraph[6]=data[key];
          case "07:00": $scope.dataGraph[7]=data[key];
          case "08:00": $scope.dataGraph[8]=data[key];
          case "09:00": $scope.dataGraph[9]=data[key];
          case "10:00": $scope.dataGraph[10]=data[key];
          case "11:00": $scope.dataGraph[11]=data[key];
          case "12:00": $scope.dataGraph[12]=data[key];
          case "13:00": $scope.dataGraph[13]=data[key];
          case "14:00": $scope.dataGraph[14]=data[key];
          case "15:00": $scope.dataGraph[15]=data[key];
          case "16:00": $scope.dataGraph[16]=data[key];
          case "17:00": $scope.dataGraph[17]=data[key];
          case "18:00": $scope.dataGraph[18]=data[key];
          case "19:00": $scope.dataGraph[19]=data[key];
          case "20:00": $scope.dataGraph[20]=data[key];
          case "21:00": $scope.dataGraph[21]=data[key];
          case "22:00": $scope.dataGraph[22]=data[key];
          case "23:00": $scope.dataGraph[24]=data[key];
          case "fecha inicial": $scope.fechaInicio=data[key];
          case "fecha termino": $scope.fechaFinal=data[key];
        }
      }
      $scope.recopilation="Datos correspondientes al período entre: "+$scope.fechaInicio+" hasta "+$scope.fechaFinal;
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
    title:{
      display:true,
      text:"Reportes de congestión durante el día en: ",
      fontSize: 20,
      fontFamily: "Arial",
      fontColor: "black",
    },
    scales: {
      yAxes: [
        {
          id: 'y-axis',
          type: 'linear',
          display: true,
          position: 'left',
          scaleLabel: {
                        display: true,
                        labelString: "Número de reportes",
                        fontFamily: "Arial",
                        fontColor: "black",
                        fontSize: 14
                    }
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
