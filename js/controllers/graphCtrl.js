app.controller('GraphCtrl',function($scope,getCommunesService){
   $scope.mysigma = new sigma();
   getGraphData($scope.mysigma);


   function getGraphData(s){
     getCommunesService.getNeo4jGraph()
     .success(function(data){
       sigma.classes.graph.addMethod('neighbors', function(nodeId) {
         var k,
             neighbors = {},
             index = this.allNeighborsIndex[nodeId] || {};

         for (k in index)
           neighbors[k] = this.nodesIndex[k];

         return neighbors;
       });

        // these are just some preliminary settings
        sigma.parsers.json('./js/resources/data.json', {
          container: 'graph-container',
          renderer: {
              container: document.getElementById('graph-container'),
              type: 'canvas'
          },
          settings: {
            // Node
            minNodeSize: 1,
            maxNodeSize: 10,
            defaultNodeColor: '#1dcaff',
            nodeHoverColor: "default",
            defaultNodeHoverColor: "#C1BE45",
            defaultNodeBorderColor: "#C1BE45",
            singleHover: true,

            // Node label
            drawLabels: true,
            labelThreshold: 10,
            labelColor: "default",
            labelHoverShadow: "default",
            labelHoverShadowColor: "#000",
            labelHoverBGColor: "default",
            labelHoverColor: "default",
            defaultHoverLabelBGColor: "#002147",
            defaultLabelHoverColor: "#fff",
            defaultLabelColor: "#000",
            defaultLabelSize: 14,
            defaultLabelBGColor: "#c0deed",

            // Edge
            defaultEdgeColor: 'grey',
            defaultEdgeType: "curvedArrow",
            enableEdgeHovering: true,
            edgeHoverPrecision: 5,
            edgeHoverHighlightNodes: 'circle',
            edgeHoverSizeRatio: 2,
            edgeHoverExtremities: true,
            edgeColor: "default",
            edgeHoverColor: '#D1BE45',
            minArrowSize:6,
            minEdgeSize: 1,
            maxEdgeSize: 2,

            // Edge label
            drawEdgeLabels: true,
            edgeLabelColor: 'default',
            defaultEdgeLabelColor: '#fff',
            defaultEdgeLabelActiveColor: '#fff',
            defaultEdgeLabelSize: 12,
            edgeLabelSize: 'fixed',              // Available values: fixed, proportional
            edgeLabelAlignment: 'auto',          // Available values: auto, horizontal
            edgeLabelSizePowRatio: 1,
            edgeLabelThreshold: 1,
            defaultEdgeHoverLabelBGColor: '#002147',
            edgeLabelHoverBGColor: 'default',
            edgeLabelHoverShadow: 'default',
            edgeLabelHoverShadowColor: '#000',

            // Captors
            zoomMin: 0.07,
            zoomMax: 2
          }
        }, function(s) {
          //IMPORTANTE: aqui se obtiene la data y se carga al grafo de
          //la instancia de sigma correspondiente
          s.graph.clear();
          s.graph.read(data);

          var nodos = s.graph.nodes();
          // Display the nodes on a circle:
          nodos.forEach(function(node, i, nodos) {
            if(node.type == "person"){
              node.originalColor = node.color;
              node.x = Math.random();
              node.y = Math.random();
              node.color = "#1dcaff";
              node.label = "@"+node.label;
              //Para agregar peso al label
              //node.label += " | Weight: " + node.weight;
            }else if(node.type == "Commune"){
              node.originalColor = node.color;
              // node.x = Math.cos(Math.PI * 3 );
              // node.y = Math.sin(Math.PI * 3 );
              node.x = Math.random();
              node.y = Math.random();
              node.color = "orange";
            }
          });
          s = s.refresh();

          /*
          */
          var edges = s.graph.edges();
          edges.forEach(function(edge, i,edges){
            edge.originalColor = edge.color;
            //edge.label = edge.reaseon;
          });
          /*Filter
          */
          var filter = new sigma.plugins.filter(s);


          /*noverlap
          */
          var config = {
            nodeMargin: 5.0,
            scaleNodes: 1.3,
            speed: 11
          };


          var noverlaplistener = s.configNoverlap(config);

          noverlaplistener.bind('start', function(event) {

          });
          noverlaplistener.bind('stop', function(event) {

          });
          noverlaplistener.bind('interpolate', function(event) {

          });
          s.startNoverlap();

          /*DRAGNODES
          // Initialize the dragNodes plugin:
          var dragListener = sigma.plugins.dragNodes(s, s.renderers[0]);
          dragListener.bind('startdrag', function(event) {

          });
          dragListener.bind('drag', function(event) {

          });
          dragListener.bind('drop', function(event) {

          });
          dragListener.bind('dragend', function(event) {

          });
          */

          /*Event handlers
          */
          // When a node is clicked, we check for each node
      // if it is a neighbor of the clicked one. If not,
      // we set its color as grey, and else, it takes its
      // original color.
      // We do the same for the edges, and we only keep
      // edges that have both extremities colored.
      s.bind('clickNode', function(e) {
        var nodeId = e.data.node.id,
            toKeep = s.graph.neighbors(nodeId);
        toKeep[nodeId] = e.data.node;


        s.graph.nodes().forEach(function(n) {
          if (toKeep[n.id])
            n.color = n.originalColor;
          else
            n.color = 'white';
        });


        s.graph.edges().forEach(function(e) {
          if (toKeep[e.source] && toKeep[e.target])
            e.color = e.originalColor;
          else
            e.color = 'white';
        });

        // Since the data has been modified, we need to
        // call the refresh method to make the colors
        // update effective.
        s.refresh();
      });
        // When the stage is clicked, we just color each
        // node and edge with its original color.
        s.bind('clickStage', function(e) {
            s.graph.nodes().forEach(function(n) {
              if(n.type == "person"){
                n.color = "#1dcaff";
              }else if(n.type == "Commune"){
                n.color = "orange";
              }
            });

            s.graph.edges().forEach(function(e) {
              e.color = e.originalColor;
            });

            // Same as in the previous event:
            s.refresh();
          });

          /*forceAtlas
          */
          var conf = {
            scalingRatio:5,
            strongGravityMode:false,
            gravity:0,
            barnesHutOptimize:true,
            slowDown:70
          };
          s.startForceAtlas2(conf);
          s = s.refresh();
        });




     })
     .error(function(error){
       $scope.status = 'Error en la creacion de nodos';
       console.log($scope.status);
     });
   }

});
