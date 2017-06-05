app.controller('MapCtrl', function($scope, getCommunesService){
  var myaccesstoken = 'pk.eyJ1IjoicGFzdG9yZHJvZ28iLCJhIjoiY2ozMTRqNWtuMDAwNTJxbHNrdDNzaXBzaiJ9.yQPnbO88iRmQywPV-JKFXg';
  $scope.mapData = [];
  $scope.map = [];
  $scope.info = [];
  $scope.legend= [];
  $scope.recopilation =[];
  $scope.geojson =L.geoJSON(comunas);
  $scope.volarA = function(){
    $scope.map.flyTo([-33.6050, -70.64]);
  };

  $scope.map = initMap();
  addBackgroundLayer(myaccesstoken);
  addCommunesLayer();
  initLegend();
  addLegendLayer();
  initInfo();
  addInfoLayer();
  getMapData();

  /*
  Listeners para eventos
  */
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    $scope.info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
      $scope.geojson.resetStyle(e.target);
      $scope.info.update();
  }

  function zoomToFeature(e) {
    $scope.map.fitBounds(e.target.getBounds());
  }

  function getColor(d) {
    var limite =5000;
    var hue = 120-Math.floor(120 * d / limite);
    return (d>limite)? "hsl(0, 100%, 50%)":(d<=limite && d>=0)? "hsl("+hue+", 100%, 50%)": "hsl(120,100%,50)";
  }

  function initLegend() {
    $scope.legend=L.control({position: 'bottomright'});
    $scope.legend.onAdd = function (map) {

      this.div1 = L.DomUtil.create('div', 'info legend'),
          grades = [0,250,500,750,1000,1250,1500,1750,2000,2250,2500,2750,3000,3250,3500,3750,4000,4250,4500,4750,5000],
          labels = [];

      // loop through our density intervals and generate a label with a colored square for each interval
      var i=0;
      var largo = grades.length;
      for ( i = 0; i < largo; i++) {
          this.div1.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return this.div1;
    };
  }

  function addLegendLayer() {
    $scope.legend.addTo($scope.map);
  }

  function initInfo(){
      $scope.info = L.control({position: 'topright'});
      $scope.info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
      };
      // method that we will use to update the control based on feature properties passed
      $scope.info.update = function (props) {
        this._div.innerHTML = '<h4>Reportes de congestión</h4>' +  (props ?
          '<b>' + props.NOM_COM + '</b><br />Provincia: '+props.NOM_PROV+'<br /> ' + $scope.mapData[String(props.COD_COMUNA)] + ' reportes'
          : 'Pasa el mouse sobre alguna comuna');
      };
  }

  function addInfoLayer(){
    $scope.info.addTo($scope.map);
  }

  function initMap(){
    return map = L.map('mapid',{
        zoom: 8,
        center: [-33.6050, -70.64]
    });
  }

  function addBackgroundLayer(accesstoken){
    mapboxgl.accessToken = accesstoken;
    L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={access_token}',
    {
      attribution: '© Mapbox | @ Futuchi ',
      access_token:accesstoken,
      minZoom: 8,
    }).addTo($scope.map);
  }

  function addCommunesLayer(){
    $scope.geojson.addTo($scope.map);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
  }

  function getMapData(){
    getCommunesService.getAllCongestions()
    .success(function(data){
      $scope.mapData = data;
      /*
      Rangos de colores:
        Verde inicial: hue:120 saturation:100% lightness:50%
        Rojo final: hue:0 saturation:100% lightness:50%
      */
      var hue=120;
      var stringColor = null;
      var idCom = null;
      var estilo = {
        fillOpacity: 0.5
      };
      $scope.geojson=L.geoJSON(comunas, {
        style: function(feature) {

          hue =120;
          stringColor=null;
          idCom = null;
          estilo = {
            fillOpacity: 0.5
          };
          if (feature.properties && feature.properties.NOM_COM && feature.properties.NOM_PROV){
            idCom = String(feature.properties.COD_COMUNA);
            //Número de congestiones mayor que el rango máximo por comuna para considerarse en nivel máximo
            //Número de congetiones, entre 0 y 5000
            //hue = 120-Math.floor(120 * $scope.mapData[idCom] / 5000);
            stringColor= getColor($scope.mapData[idCom]);
            estilo.fillColor= stringColor;
          }
          switch (feature.properties.COD_COMUNA) {
            case 1:   return estilo;
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
            case 53:   return estilo;
          }
        },
        onEachFeature: onEachFeature
      }).addTo($scope.map);
      //Detalle para fecha de recopilacion de datos en el mapa
      $scope.recopilation="Datos correspondientes al período entre: "+data["fecha inicial"]+" hasta "+data["fecha termino"];
    })
    .error(function(error){
      $scope.status = 'Error al consultar por comunas';
      console.log($scope.status);
    });
  }
});
