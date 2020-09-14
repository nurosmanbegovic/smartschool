let Pozivi = (function() {

    function ucitajpodatke(callback){
        var ajax = new XMLHttpRequest();    
        ajax.onreadystatechange = () => {        
            if(ajax.readyState == 4 && ajax.status == 200) {
                var response = JSON.parse(ajax.responseText);
                periodicne = response.periodicna;
                vanredne = response.vanredna;
                callback();
            }
        }
        ajax.open("GET", "http://localhost:8080/api/rezervacije");
        ajax.send();
    }

    function upisipodatakvanredno(zauzece, callback){
        var ajax = new XMLHttpRequest();
        console.log(JSON.stringify(zauzece));    
        ajax.onreadystatechange = () => {        
            if(ajax.readyState == 4 && ajax.status == 200) {
                var response = JSON.parse(ajax.responseText);
                callback();
            } else if(ajax.readyState == 4 && ajax.status == 404){
                console.log(ajax.responseText);
                alert(ajax.response);
            }
        }
        ajax.open("POST", "http://localhost:8080/api/rezervacije/vanredno", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(zauzece));
    }


    function upisipodatakredovno(zauzece, callback){
        var ajax = new XMLHttpRequest();    
        ajax.onreadystatechange = () => {        
            if(ajax.readyState == 4 && ajax.status == 200) {
                var response = JSON.parse(ajax.responseText);
                callback(response);
            }
        }
        ajax.open("POST", "http://localhost:8080/api/rezervacije/redovno", true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send(JSON.stringify(zauzece));
    }


    function dohvatiStranicuSlika(stranica, callback) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = () => {
            if(ajax.readyState == 4 && ajax.status == 200){
                var response = JSON.parse(ajax.responseText);
                callback(response);
            }
        }
        ajax.open("GET", "http://localhost:8080/api/slike/"+stranica, true);
        ajax.setRequestHeader("Content-type", "application/json");
        ajax.send();
    }

    return {
        ucitajpodatke:ucitajpodatke,
        upisipodatakvanredno:upisipodatakvanredno,
        upisipodatakredovno:upisipodatakredovno,
        dohvatiStranicuSlika:dohvatiStranicuSlika
    };

  })();