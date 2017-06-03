app.controller('GraphCtrl',function($scope,getCommunesService){


    // these are just some preliminary settings
    var g = new Graph();
    var id = {};
    var settings = {};
    var renderer = {
      container: getElementById('graph-container'),
      type: 'canvas'
    };

   // Create new Sigma instance in graph-container div (use your div name here)
   $scope.s = new sigma({
     graph: g,
     renderer: {
      container: document.getElementById('graph-container'),
      type: 'canvas'
     },
     settings: {
       borderSize:2,
       defaultNodeBorderColor:"red",
       defaultHoverLabelBGColor:"#c0deed",
       singleHover:true,
       enableEdgeHovering: true,
       defaultEdgeColor:"#c0deed",
       defaultNodeColor:"#1dcaff",
       minArrowSize:5
     }
   });



   //testServicio();
   getGraphData($scope.s);

   function getGraphData(s){
     getCommunesService.getNeo4jGraph()
     .success(function(data){
       console.log(data);
       // first you load a json with (important!) s parameter to refer to the sigma instance
       sigma.parsers.json(
            data,
            s,
            function(s) {
                // this below adds x, y attributes as well as size = degree of the node
                var i;
                nodes = $scope.s.graph.nodes();
                len = nodes.length;

                for (i = 0; i < len; i++) {
                    nodes[i].x = Math.random();
                    nodes[i].y = Math.random();
                    //nodes[i].size = $scope.s.graph.degree(nodes[i].id);
                    //nodes[i].color = (nodes[i].type == "Commune") ? '#1dcaff' : 'orange';
                }

                // Refresh the display:
                s.refresh();

                // ForceAtlas Layout
                //$scope.s.startForceAtlas2();
            }
       );
     })
     .error(function(error){
       $scope.status = 'Error en la creacion de nodos';
       console.log($scope.status);
     });
   }
});
