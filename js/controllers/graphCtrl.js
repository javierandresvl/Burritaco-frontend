app.controller('GraphCtrl',function($scope,getCommunesService){
   $scope.mysigma = new sigma();
   getGraphData($scope.mysigma);


   function getGraphData(s){
     getCommunesService.getNeo4jGraph()
     .success(function(data){
        // these are just some preliminary settings
        sigma.parsers.json('./js/resources/data.json', {
          container: 'graph-container',
          renderer: {
              container: document.getElementById('graph-container'),
              type: 'canvas'
          },
          settings: {
              minNodeSize: 8,
              maxNodeSize: 16
          }
        }, function(s) {
          s.graph.clear();
          s.graph.read(data);
          // Display the nodes on a circle:
          s.graph.nodes().forEach(function(node, i, a) {
            node.x = Math.cos(Math.PI * 2 * i / a.length);
            node.y = Math.sin(Math.PI * 2 * i / a.length);
          });
          // nodos = s.graph.nodes();
          // var i=0;
          // var numeroNodos = s.graph.nodes().length;
          // for(i=0;i<numeroNodos;i++){
          //   if(nodo[i].type == "Person"){
          //
          //   }else{
          //
          //   }
          // }
          s.startForceAtlas2();
          });
     })
     .error(function(error){
       $scope.status = 'Error en la creacion de nodos';
       console.log($scope.status);
     });
   }
});
