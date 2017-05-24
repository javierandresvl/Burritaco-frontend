app.controller('MapCtrl', function($scope, getCommunesService){
  $scope.mapData = [];
  $scope.map = [];
  initMap();
  displayCongestionMap();

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
    L.geoJSON(comunas, {
      onEachFeature: onEachFeature
    }).addTo($scope.map);
  }



  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.NOM_COM && feature.properties.NOM_PROV) {
        layer.bindPopup().setPopupContent('<strong>Comuna: </strong>'+ feature.properties.NOM_COM +
        '<br><strong>Provincia: </strong>'+ feature.properties.NOM_PROV+'<hr class="hr-burritaco"><strong>Estadística: </strong>');
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
  function displayCongestionMap(){
    getCommunesService.getChoroplethData()
    .success(function(data){
      $scope.mapData = data;
      console.log('Obtencion de datos para mapa exitoso');
      /*
      L.geoJSON(comunas, {
        style: function(feature) {
          switch (feature.properties.party) {
            case 'Republican': return {color: "#ff0000"};
            case 'Democrat':   return {color: "#0000ff"};
          }
        }
      }).addTo($scope.map);
      */
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
      console.log($scope.status);
    });
  }


});
