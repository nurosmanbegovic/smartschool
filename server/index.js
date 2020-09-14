const express = require('express'),
      cors = require('cors'),
      morgan = require("morgan"),
      fs = require("fs"),
      bodyParser = require("body-parser"),
      visitorinfo = require('./visitorinfo');

//const Validacije = require("./helpers/Validations");

const rezervacijeRoute = express.Router();


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

var validatePeriodicno = (nizperiodicnih, novo) => {

    if(novo.pocetak!='' && novo.kraj!='' && parseUMinute(novo.kraj)>parseUMinute(novo.pocetak) && nizperiodicnih) {
        for(var i=0; i<nizperiodicnih.length; i++) {
              if(nizperiodicnih[i].naziv == novo.naziv 
                  && novo.semestar==nizperiodicnih[i].semestar 
                  && preklapase(novo.pocetak,novo.kraj,nizperiodicnih[i].pocetak, nizperiodicnih[i].kraj) && nizperiodicnih[i].dan==novo.dan){
                     return false;
                  }
            }
        }
    
    return true;
}

var validateVanredno = (nizvanrednih, novo) => {
    if(novo.pocetak!='' && novo.kraj!='' && parseUMinute(novo.kraj)>parseUMinute(novo.pocetak) && nizvanrednih) {
        for(var i=0; i<nizvanrednih.length; i++) {
            var danvanredne=dajdan(nizvanrednih[i].datum);
            var mjesecvanredne= dajmjesec(nizvanrednih[i].datum);
            var godinavanredne= dajgodinu(nizvanrednih[i].datum);
            if(nizvanrednih[i].naziv == novo.naziv 
                && dajmjesec(novo.datum)==mjesecvanredne
                && preklapase(novo.pocetak,novo.kraj,nizvanrednih[i].pocetak, nizvanrednih[i].kraj) 
                && dajgodinu(novo.datum)==godinavanredne
                && dajgodinu(novo.datum)==danvanredne){
                    return false;
                }
            }
        }
          
    return true;
}

const slikeRoute=express.Router();

slikeRoute.get('/:page', (request, response) => {
    fs.readdir('./public/slikepocetna', (err, files) => {
        let lastIndex = 3*request.params.page;
        let firstIndex = lastIndex-3;
        var result = [];
        var numberOfCallbacks = {number:0};
        for(var i=firstIndex; i<lastIndex && i<files.length; i++){
            numberOfCallbacks.number++;
            //console.log(numberOfCallbacks);
            fs.readFile('./public/slikepocetna/'+files[i],(error,file)=>{
                result.push({
                    lastPage: lastIndex >= files.length?true:false,
                    fileName: files[i],
                    file: file.toString("base64")
                });
                numberOfCallbacks.number--;
                //console.log(numberOfCallbacks); 
            });
        }
        //while(numberOfCallbacks.number !== 0){}
        setTimeout(()=>        response.json(result)
        ,1000);
    });
})

rezervacijeRoute.get("/", (request, response) => {
    let zauzeca;

    fs.readFile('zauzeca.json', (err, data) => {
        if(err) throw err;
        zauzeca=JSON.parse(data);        
    response.json(zauzeca);
    });

});


rezervacijeRoute.post('/vanredno', (request, response) => { //vanredna
    let zauzeca;
    console.log(request.body);
    let novozauzece=request.body;
    fs.readFile('zauzeca.json', (err, data) => {
        if(err) throw err;
        zauzeca=JSON.parse(data);
        if(validateVanredno(zauzeca.vanredna, novozauzece)){
                zauzeca.vanredna.push(request.body);
                json = JSON.stringify(zauzeca, null, 4);
                fs.writeFile('zauzeca.json', json, {}, () => {
                response.json(zauzeca);
                });
            }     
        else {
            console.log(request.body);
        response.status(404).json({'message':'Nije moguce rezervisati salu '+novozauzece.naziv+' za navedeni datum '+novozauzece.datum+' i termin od '+novozauzece.pocetak+' do '+novozauzece.kraj+'!'});
        }
    });    
});

rezervacijeRoute.post('/redovno', (request, response) => { //periodicna
    let zauzeca;
    let novozauzece=request.body;
    fs.readFile('zauzeca.json', (err, data) => {
        if(err) throw err;
        zauzeca=JSON.parse(data);
        if(validatePeriodicno(zauzeca.periodicna, novozauzece)){         
                zauzeca.periodicna.push(request.body); 
                json = JSON.stringify(zauzeca, null, 4);
                fs.writeFile('zauzeca.json', json, {}, () => {
                    response.json(zauzeca);
                });
            }
        else response.status(404).json({'message':'Nije moguce rezervisati salu '+novozauzece.naziv+' za navedeni semestar '+novozauzece.semestar+' i termin od '+novozauzece.pocetak+' do '+novozauzece.kraj+'!'});        
    });
    
});

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(visitorinfo.visitorInfoMiddleware);


app.use('/api/rezervacije', rezervacijeRoute);
app.use('/api/slike', slikeRoute);

app.use(express.static(__dirname + '/public', { index: "pocetna.html"}));



let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});