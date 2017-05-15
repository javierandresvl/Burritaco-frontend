app.service('getCongestionCommuneService', function($http){
        var urlBase = 'http://107.170.14.114:8080/Burritaco-backend/congestions/';
        
        this.getCongestionData = function(id){
            urlBase = urlBase+id;
            return $http.get(urlBase);
        };
});