app.controller('MapCtrl', function($scope, getCommunesService){
  $scope.mapData = [];
  $scope.map = [];
  $scope.fechaInicio=null;
  $scope.fechaFinal=null;
  initMap();
  displayDataMap();

  function initMap(){
    var myaccesstoken = 'pk.eyJ1IjoicGFzdG9yZHJvZ28iLCJhIjoiY2ozMTRqNWtuMDAwNTJxbHNrdDNzaXBzaiJ9.yQPnbO88iRmQywPV-JKFXg';
    mapboxgl.accessToken = myaccesstoken;
    $scope.map = L.map('mapid',{
        zoom: 9,
        center: [-33.6050, -70.64]
    });
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={access_token}',
    {
      attribution: '© Mapbox | @ Futuchi',
      access_token:myaccesstoken,
      maxZoom: 18,
      minZoom: 4,
    }).addTo($scope.map);

    L.geoJSON(comunas).addTo($scope.map);
  }



  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.NOM_COM && feature.properties.NOM_PROV) {
        layer.bindPopup().setPopupContent('<strong>Comuna: </strong>'+ feature.properties.NOM_COM +
        '<br><strong>Provincia: </strong>'+ feature.properties.NOM_PROV+'<hr class="hr-burritaco"><strong>Estadística: </strong>'+ $scope.mapData[String(feature.properties.COD_COMUNA)]+' reportes de congestión.');
          layer.on('mouseover',function(e){
            this.openPopup();
          });
          layer.on('mouseout',function(e){
            this.closePopup();
          });
    }
  }


  /*
  Esta funcion modifica el color de cada feature(comuna) individualmente según el nivel de congestion
  en cada comuna, realizando un llamado al servicio de getChoroplethData
  */
  function displayDataMap(){
    getCommunesService.getChoroplethData()
    .success(function(data){
      $scope.mapData = data;
      $scope.fechaInicio=data["fecha inicial"];
      $scope.fechaFinal=data["fecha termino"];
      $scope.recopilation="Datos correspondientes al período entre: "+$scope.fechaInicio+" hasta "+$scope.fechaFinal;
      var hue=120;
      var stringColor = null;
      var idCom = null;
      var estilo = {
        fillOpacity: 0.5
      };
      L.geoJSON(comunas, {
        style: function(feature) {
          /*
          Rangos de colores:
            Verde inicial: hue:120 saturation:100% lightness:50%
            Rojo final: hue:0 saturation:100% lightness:50%
          */
          hue =120;
          stringColor=null;
          idCom = null;
          estilo = {
            fillOpacity: 0.5
          };
          if (feature.properties && feature.properties.NOM_COM && feature.properties.NOM_PROV){
            idCom = String(feature.properties.COD_COMUNA);
            //Número de congestiones mayor que el rango máximo por comuna para considerarse en nivel máximo
            if($scope.mapData[idCom]>=5000){
              hue=0;
              stringColor= "hsl("+hue+", 100%, 50%)";
              estilo.fillColor= stringColor;
            }else{
              //Número de congetiones, entre 0 y 5000
              hue = 120-Math.floor(120 * $scope.mapData[idCom] / 5000);
              stringColor= "hsl("+hue+", 100%, 50%)";
              estilo.fillColor= stringColor;
            }
          }
          switch (feature.properties.COD_COMUNA) {
            case 1:   return estilo;
            case 2:   return estilo;
            case 3:   return estilo;
            case 4:   return estilo;
            case 5:   return estilo;
            case 6:   return estilo;
            case 7:   return estilo;
            case 8:   return estilo;
            case 9:   return estilo;
            case 10:   return estilo;
            case 11:   return estilo;
            case 12:   return estilo;
            case 13:   return estilo;
            case 14:   return estilo;
            case 15:   return estilo;
            case 16:   return estilo;
            case 17:   return estilo;
            case 18:   return estilo;
            case 19:   return estilo;
            case 20:   return estilo;
            case 21:   return estilo;
            case 22:   return estilo;
            case 23:   return estilo;
            case 24:   return estilo;
            case 25:   return estilo;
            case 26:   return estilo;
            case 27:   return estilo;
            case 28:   return estilo;
            case 29:   return estilo;
            case 30:   return estilo;
            case 31:   return estilo;
            case 32:   return estilo;
            case 33:   return estilo;
            case 34:   return estilo;
            case 35:   return estilo;
            case 36:   return estilo;
            case 37:   return estilo;
            case 38:   return estilo;
            case 39:   return estilo;
            case 40:   return estilo;
            case 41:   return estilo;
            case 42:   return estilo;
            case 43:   return estilo;
            case 44:   return estilo;
            case 45:   return estilo;
            case 46:   return estilo;
            case 47:   return estilo;
            case 48:   return estilo;
            case 49:   return estilo;
            case 50:   return estilo;
            case 51:   return estilo;
            case 52:   return estilo;
          }
        },
        onEachFeature: onEachFeature
      }).addTo($scope.map);
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
      console.log($scope.status);
    });
  }
});
