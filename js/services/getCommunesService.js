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

        this.getChoroplethData = function(){
          url = urlBase+'congestions/communes';
          return $http.get(url);
        };
});
