app.service('getCommunesService', function($http){
        var urlBase = 'http://localhost:8080/Burritaco-backend/';
        this.getCommunes = function(){
            url = urlBase + 'communes';
            return $http.get(url);
        };

        this.getCongestionData = function(id){
            url = urlBase+'congestions/'+id;
            return $http.get(url);
        };

        this.getAllCongestions = function(){
          url = urlBase+'congestions/communes';
          return $http.get(url);
        };
        
        this.createNodes = function(){
          url= urlBase+'communes/create/nodes';
          return $http.get(url);
        }

        this.getNeo4jGraph = function(){
          url = urlBase+'neo4j/nodes';
          return $http.get(url,{headers : {'Content-Type' : 'application/json; charset=UTF-8'}});
        }
});
