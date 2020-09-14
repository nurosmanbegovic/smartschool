const naziv_mjeseca=['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
var mjeseci_dvocifreno=['01','02','03', '04', '05', '06', '07', '08', '09', '10', '11'];
var dan_dvocifreno=['01','02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

var mjesec=new Date().getMonth();
var godina=new Date().getFullYear();
var periodicne = [];
var vanredne = [];

var tabela = document.getElementById('kalendar');
var mjesec_p=document.getElementById('mjesec');
var celije=document.getElementsByTagName('td');
var poc=document.getElementById('pocetak');
var kraj=document.getElementById('kraj');

mjesec_p.innerHTML=naziv_mjeseca[mjesec];
Kalendar.iscrtajKalendar(tabela, mjesec);
Pozivi.ucitajpodatke(() => {
    Kalendar.ucitajPodatke(periodicne, vanredne);
    Kalendar.obojiZauzeca(tabela, mjesec, sala.options[sala.selectedIndex].value, poc.value, kraj.value);               
});


function izmjena() {
    Kalendar.iscrtajKalendar(tabela, mjesec);
    ucitajioboji();
}

function prethodni() {
    document.getElementById('sljedeci').disabled=false;
    if(mjesec==0 && godina==2020) {
        godina=2019;
        mjesec=11;
    }
    else mjesec--;
    if(mjesec==0 && godina==2019) document.getElementById('prethodni').disabled=true;
    mjesec_p.innerHTML=naziv_mjeseca[mjesec];
    Kalendar.iscrtajKalendar(tabela, mjesec);
    ucitajioboji();
}

function sljedeci() {
    document.getElementById('prethodni').disabled=false;
    if(mjesec==11 && godina==2019) {
        godina=2020;
        mjesec=0;
    }
    else mjesec++;
    console.log(godina);
    if(mjesec==11 && godina==2020) document.getElementById('sljedeci').disabled=true;
    mjesec_p.innerHTML=naziv_mjeseca[mjesec];
    Kalendar.iscrtajKalendar(tabela, mjesec);
    ucitajioboji();
}

function kliknuto(dat) {
    if (confirm("Da li želite rezervisati ovaj termin?")) {
        var semestar="";
        var dan=event.currentTarget.getAttribute('name');
        console.log(dan);
      if(document.getElementById('checkbox').checked==true) {
          if(mjesec>0 && mjesec<6) semestar='ljetni'; 
          else if(mjesec==0 || (mjesec>8 && mjesec<12)) semestar='zimski';
          else {
              alert('mjesec ne pripada niti jednom semestru');
          }
          if(semestar!='') {
                var zauzece= {
                    dan: dan,
                    semestar: semestar,
                    pocetak: poc.value,
                    kraj: kraj.value,
                    naziv: sala.options[sala.selectedIndex].value,
                    profesor: "prof. Vensada"
                }

                Pozivi.upisipodatakredovno(zauzece, () => {
                    Pozivi.ucitajpodatke(() => {
                        Kalendar.ucitajPodatke(periodicne, vanredne);
                        Kalendar.obojiZauzeca(tabela, mjesec, sala.options[sala.selectedIndex].value, poc.value, kraj.value);               
                    });               
                });         
            }   
        }
        else {
            var zauzece= {
                datum: dan_dvocifreno[dat-1]+'.'+mjeseci_dvocifreno[mjesec]+'.'+godina,
                pocetak: poc.value,
                kraj: kraj.value,
                naziv: sala.options[sala.selectedIndex].value,
                profesor : "prof. Vensada"
            }

          Pozivi.upisipodatakvanredno(zauzece, () => {
                Pozivi.ucitajpodatke(() => {
                    Kalendar.ucitajPodatke(periodicne, vanredne);
                    Kalendar.obojiZauzeca(tabela, mjesec, sala.options[sala.selectedIndex].value, poc.value, kraj.value);               
                });
          });
      }
    }
}

function ucitajioboji() {
    Pozivi.ucitajpodatke(() => {
        Kalendar.ucitajPodatke(periodicne, vanredne);
        Kalendar.obojiZauzeca(tabela, mjesec, sala.options[sala.selectedIndex].value, poc.value, kraj.value);               
    });
}