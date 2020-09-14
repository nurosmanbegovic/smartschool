/*let validacije = (function() {

function semestar(mjesec) {
    if(mjesec>0 && mjesec<6) return 'ljetni';
    else if(mjesec==0 || (mjesec>8 && mjesec<12)) return 'zimski';
    else return '';
  }

  function parseUMinute(vrijeme){
    var s=0;
    if(vrijeme[0]>='0' && vrijeme[0]<='9') s+=(vrijeme[0] - '0')*10;
    if(vrijeme[1]>='0' && vrijeme[1]<='9') s+=vrijeme[1] - '0';
    s*=60;
    var a;
    if(vrijeme[3]>='0' && vrijeme[3]<='9') a=(vrijeme[3] - '0')*10;
    s+=a;
    if(vrijeme[4]>='0' && vrijeme[4]<='9') a=vrijeme[4] - '0';
    s+=a;
    return s;
  }

  function preklapase(poc1, kraj1, poc2, kraj2) {
    if(parseUMinute(poc1)<parseUMinute(kraj2) && parseUMinute(poc1)>=parseUMinute(poc2)) return true;
    else if(parseUMinute(kraj1)>parseUMinute(poc2) && parseUMinute(kraj1)<=parseUMinute(kraj2)) return true;
    else if(parseUMinute(poc1)<=parseUMinute(poc2) && parseUMinute(kraj1)>=parseUMinute(kraj2)) return true;
    return false;
  }

function dajgodinu(dan){
    var s=0, a=0;
    s=dan[6]-'0';
    s*=1000;
    a=(dan[7]-'0')*100;
    s+=a;
    a=(dan[8]-'0')*10;
    s+=a;
    s+=dan[9]-'0';
    return s;
  }

  function dajmjesec(dan){
    var s=0;
    s=dan[3]-'0';
    s*=10;
    s+=(dan[4]-'0');
    s--;
    return s;
  }

  function dajdan(dan){
    var s=0;
    s=dan[0]-'0';
    s*=10;
    s+=(dan[1]-'0');
    return s;
  }

  function obojiZauzecaImpl(kalendarRef, mjesec, sala, pocetak, kraj) {
   

    for(var i=0; i<nizvanrednih.length; i++) {
      var redovi = kalendarRef.getElementsByTagName("tr");
      var mjesecvanredne= dajmjesec(nizvanrednih[i].datum);
      var godinavanredne= dajgodinu(nizvanrednih[i].datum);
      if(nizvanrednih[i].naziv == sala 
          && mjesec==mjesecvanredne
          && preklapase(pocetak,kraj,nizvanrednih[i].pocetak, nizvanrednih[i].kraj) 
          && godina==godinavanredne){
            for(var j = 0; j < redovi.length; j++){
              var celije = redovi[j].children;
              for(var k = 0; k < celije.length; k++){
                if(!celije[k].innerHTML) 
                  continue;
                if(celije[k].childNodes[0].innerHTML==dajdan(nizvanrednih[i].datum))
                    celije[k].classList.replace("slobodna", "zauzeta");
                    celije[k].removeAttribute('onclick');
                }
                
              }
            }
          }
        
    return;
  
}

var validatePeriodicno = (nizperiodicnih, novo) => {

    if(novo.pocetak!='' && novo.kraj!='' && parseUMinute(novo.kraj)>parseUMinute(novo.pocetak) && nizperiodicnih) {
        for(var i=0; i<nizperiodicnih.length; i++) {
              if(nizperiodicnih[i].naziv == novo.sala 
                  && semestar(novo.mjesec)==nizperiodicnih[i].semestar 
                  && preklapase(novo.pocetak,novo.kraj,nizperiodicnih[i].pocetak, nizperiodicnih[i].kraj)){
                    return false;
                  }
            }
        }
    
    return true;
}

var validateVanredno = (zauzeca, novo) => {
    
    return true;
}

return {
    validatePeriodicno: validatePeriodicno,
    validateVanredno: validateVanredno
};

})();

module.exports = {

    validatePeriodicno: this.validatePeriodicno,
    validateVanredno: this.validateVanredno
}
*/