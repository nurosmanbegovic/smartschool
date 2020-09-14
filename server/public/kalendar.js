let Kalendar = (function() {
  var trenutni_mjesec=0;
  const broj_dana = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const naziv_mjeseca=['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];

  var nizperiodicnih;
  var nizvanrednih;

  class periodicna {
    constructor(dan, semestar, pocetak, kraj, sala, profesor) {
        this.dan=dan;
        this.semestar=semestar;
        this.pocetak=pocetak;
        this.kraj=kraj;
        this.naziv=naziv;
        this.profesor=profesor;
    }
}

  class vanredna {
    constructor(datum, pocetak, kraj, naziv, profesor) {
        this.datum=datum;
        this.pocetak=pocetak;
        this.kraj=kraj;
        this.naziv=naziv;
        this.profesor=profesor;
    }
  }

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

  
  function Zeller(D, M, Y) {  // 0 = sunday, 1 = monday, etc. 

    if (M < 3) {
      M = M + 12;
      Y = Y - 1;
    }
  
    var C = Math.floor(Y / 100);
    var K = Y - 100 * C;
  
    var S = Math.floor(2.6 * M - 5.39) + Math.floor(K / 4) + Math.floor(C / 4) + D + K - 2 * C;
  
    var ans = S - 7 * Math.floor(S / 7);
    if(ans==0) return 7;  
    return ans;
  }

  function addcell(tr, i, j, pozicija_prvog){
    var td=document.createElement('td');
    let dan_u_mjesecu = i*7+j - pozicija_prvog + 1;
    if(i==0 && j<pozicija_prvog) td.innerHTML='';
    else if(dan_u_mjesecu>broj_dana[trenutni_mjesec]) td.innerHTML='';
    else {
      var newdiv = document.createElement('div');
      td.appendChild(newdiv);
      newdiv.innerHTML=dan_u_mjesecu;
      td.classList.add('slobodna');
      td.setAttribute('name',j-1);
      td.setAttribute('onclick', 'kliknuto(innerText)');
    }
    tr.appendChild(td); 
  }
    
  function addrow(tl, red, pozicija_prvog){
    var tr=document.createElement('tr');
    for(var i=1; i<=7; i++){

        addcell(tr,red,i, pozicija_prvog);
    
  
    tl.appendChild(tr);
  }
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
   if(pocetak=='' || kraj=='' || parseUMinute(kraj)<=parseUMinute(pocetak)) {
     iscrtajKalendarImpl(kalendarRef, mjesec);
      return;
    }
  var redovi = kalendarRef.getElementsByTagName("tr");
    for(var j = 0; j < redovi.length; j++){
      var celije = redovi[j].children;
      for(var k = 0; k < celije.length; k++){
        if(!celije[k].innerHTML) continue;
        else celije[k].classList.replace("zauzeta", "slobodna");
          }
    }
       
    if(nizvanrednih && nizperiodicnih){
    for(var i=0; i<nizperiodicnih.length; i++) {
      var redovi = kalendarRef.getElementsByTagName("tr");
        if(nizperiodicnih[i].naziv == sala 
            && semestar(mjesec)==nizperiodicnih[i].semestar 
            && preklapase(pocetak,kraj,nizperiodicnih[i].pocetak, nizperiodicnih[i].kraj)){
              for(var j = 0; j < redovi.length; j++){
                var celije = redovi[j].children;
                for(var k = 0; k < celije.length; k++){
                  if(!celije[k].innerHTML)
                    continue;
                  if(nizperiodicnih[i].dan == k){
                      celije[k].classList.replace("slobodna", "zauzeta");
                      celije[k].removeAttribute('onclick');
                  }
                  
                }
              }
            }
    }

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
                if(celije[k].childNodes[0].innerHTML==dajdan(nizvanrednih[i].datum)){
                    celije[k].classList.replace("slobodna", "zauzeta");
                    celije[k].removeAttribute('onclick');
                    }
                }
                
              }
            }
          }
        }
    return;
  }


  function ucitajPodatkeImpl(periodicna, vanredna) {
    nizperiodicnih=periodicna;
    nizvanrednih=vanredna;
    return;
  }


  function iscrtajKalendarImpl(kalendarRef, mjesec) {

    var tableRows = kalendarRef.getElementsByTagName('tr');
    var rowCount = tableRows.length;
      for (var x=rowCount-1; x>0; x--) {
        kalendarRef.removeChild(tableRows[x]);
      }

    trenutni_mjesec=mjesec;
    var pozicija_prvog=Zeller(1,mjesec+1,godina);
    var redovi=(pozicija_prvog-1+broj_dana[mjesec])/7;
      for(var i=0; i<redovi;i++){
        addrow(kalendarRef, i, pozicija_prvog);
      }
    
  }
  return {
    obojiZauzeca: obojiZauzecaImpl,
    ucitajPodatke: ucitajPodatkeImpl,
    iscrtajKalendar: iscrtajKalendarImpl,
    Zeller:Zeller
  };
})();