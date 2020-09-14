let assert = chai.assert;

class periodicna {
    constructor(dan, semestar, pocetak, kraj, naziv, profesor) {
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

describe('Kalendar', function() {
 describe('obojiZauzeca()', function() {
    it('all days should be free', function() {
        var nizperiodicnih=[];
        var nizvanrednih=[];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-01','12:00','13:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('slobodna')) count++;
            }
        }
        assert.equal(count, 30,"Svih 30 celija je slobodno");
    });

    it('5 days should be red', function() {
        
        var periodicno1= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno2= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var vanredno1=new vanredna('06.11.2019','12:00','14:00','1-02','prof. Vensada');
        var vanredno2=new vanredna('06.11.2019','12:00','14:00','1-02','prof. Vensada');
        var nizperiodicnih=[periodicno1, periodicno2];
        var nizvanrednih=[vanredno1, vanredno2];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 5,"5 celija je zauzeto");
    });

    it('0 days should be red in winter semester', function() {
        
        var periodicno1= new periodicna(1,'ljetni','12:00','14:00','1-02', 'prof. Vensada');
        var nizperiodicnih=[periodicno1];
        var nizvanrednih=[];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 0,"0 celija je zauzeto");
    });

    it('0 days should be red in november', function() {
        var vanredno1=new vanredna('06.02.2019','12:00','14:00','1-02','prof. Vensada');
        var nizperiodicnih=[];
        var nizvanrednih=[vanredno1];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 0,"0 celija je zauzeto u novembru");
    });

    it('30 days should be red', function() {
        
        var periodicno1= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno2= new periodicna(2,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno3= new periodicna(3,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno4= new periodicna(4,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno5= new periodicna(5,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno6= new periodicna(6,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno7= new periodicna(0,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var nizperiodicnih=[periodicno1, periodicno2, periodicno3, periodicno4, periodicno5, periodicno6, periodicno7];
        var nizvanrednih=[];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 30,"30 celija je zauzeto");
    });


    it('count1=count2 days should be red', function() {
        
        var periodicno1= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var vanredno1=new vanredna('06.11.2019','12:00','14:00','1-02','prof. Vensada');
        var nizperiodicnih=[periodicno1];
        var nizvanrednih=[vanredno1];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count1=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count1++;
            }
        }
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count2=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count2++;
            }
        }
        assert.equal(count1, count2,"Isti broj celija je zauzeto");
    });


    it('5 days should be red', function() {
        
        var periodicno1= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno2= new periodicna(2,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno3= new periodicna(3,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno4= new periodicna(4,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno5= new periodicna(5,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno6= new periodicna(6,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var periodicno7= new periodicna(0,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var nizperiodicnih=[periodicno1, periodicno2, periodicno3, periodicno4, periodicno5, periodicno6, periodicno7];
        var nizvanrednih=[];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count1=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count1++;
            }
        }


        var periodicno= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var vanredno=new vanredna('06.11.2019','12:00','14:00','1-02','prof. Vensada');
        var nizperiodicnih=[periodicno];
        var nizvanrednih=[vanredno];
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 5,"5 celija je zauzeto");
    });

    it('4 days should be red, vanredno se poklapa s periodicnim', function() {
        
        var periodicno1= new periodicna(2,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var vanredno1=new vanredna('06.11.2019','12:00','14:00','1-02','prof. Vensada');
        var nizperiodicnih=[periodicno1];
        var nizvanrednih=[vanredno1];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','12:00','14:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                console.log(redovi[i].children[j].innerHTML+' '+ redovi[i].children[j].classList);
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 4,"Isti broj celija je zauzeto");
    });


    it('pocetak>kraj 0 zauzetih celija', function() {
        
        var periodicno1= new periodicna(1,'zimski','12:00','14:00','1-02', 'prof. Vensada');
        var vanredno1=new vanredna('06.11.2019','12:00','14:00','1-02','prof. Vensada');
        var nizperiodicnih=[periodicno1];
        var nizvanrednih=[vanredno1];
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        Kalendar.ucitajPodatke(nizperiodicnih, nizvanrednih);
        Kalendar.obojiZauzeca(tableRef,'10','1-02','14:00','16:00');
        var redovi = tableRef.getElementsByTagName('tr');
        var count=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].classList.contains('zauzeta')) count++;
            }
        }
        assert.equal(count, 0,"0 celija je zauzeto");
    });
    

 });
 describe('iscrtajKalendar()', function(){
     
   it('should show a month with 30 days', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        var redovi = tableRef.getElementsByTagName('tr');
        var count = 0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                count++;
            }
        }
        assert.equal(count, 30,"Broj ćelija treba biti 30");
    });

    it('should show a month with 31 days', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,0);
        var redovi = tableRef.getElementsByTagName('tr');
        var count = 0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                count++;
            }
        }
        assert.equal(count, 31,"Broj ćelija treba biti 31");
    });

    it('the first day should be friday', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        var redovi = tableRef.getElementsByTagName('tr');
        var first = -1;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].childNodes[0].innerHTML=='1') first=j;
            }
        }
        assert.equal(first, 4,"1. je petak (4)");
    });

    it('the last day should be sunday', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,10);
        var redovi = tableRef.getElementsByTagName('tr');
        var last = -1;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].childNodes[0].innerHTML=='30') last=j;
            }
        }
        assert.equal(last, 5,"30. je subota (5)");
    });

    it('dani od 1 do 31', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,0);
        var redovi = tableRef.getElementsByTagName('tr');
        var dan=0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                if(redovi[i].children[j].childNodes[0].innerHTML==dan+1) {
                    dan++;
                    if(redovi[i].children[j].childNodes[0].innerHTML=='1') {
                        if(j!=1) {
                            dan=0;
                            break;
                        }
                    }
                }
                else {
                    dan=0; 
                    break;
                }
            }
        }
        assert.equal(dan, 31,"Januar pocinje u utorak (1) i ima 31 dan");
    });

    it('should show a month with 28 days', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,1);
        var redovi = tableRef.getElementsByTagName('tr');
        var count = 0;
        for(var i = 0; i < redovi.length; i++){
            for(var j = 0; j < redovi[i].children.length; j++){
                if(!redovi[i].children[j].innerHTML)
                    continue;
                count++;
            }
        }
        assert.equal(count, 28,"Broj ćelija treba biti 28");
    });
    
    it('should have 6 rows, 31 days and starts on sunday', function() {
        var tableRef = document.createElement('table');
        Kalendar.iscrtajKalendar(tableRef,8);
        var redovi = tableRef.getElementsByTagName('tr');
        var count = 0;
        for(var i = 0; i < redovi.length; i++){
            count++;
        }
        assert.equal(count, 6,"Broj redova treba biti 6");
    });

    })
 })
