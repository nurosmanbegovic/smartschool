var aktivnaStranica = 0;
var lastPage = false;
var broj_posljednje=0;

var loadedStranice = [];
var pret=document.getElementById('prethodni');
var sljed=document.getElementById('sljedeci');
pret.disabled=true;

sljedecaStranica();

    /*Pozivi.dohvatiStranicuSlika(1, callback);

function callback(response){
    for(i in response) {
    var imageNode = document.createElement("img");
    imageNode.setAttribute("id",response[i].fileName);
    imageNode.setAttribute("src", "data:image/jpeg;charset=utf-8;base64,"+response[i].file);
    document.getElementById("container").appendChild(imageNode); 
}}
*/

function sljedecaStranica(){
    if(aktivnaStranica == loadedStranice.length) Pozivi.dohvatiStranicuSlika(aktivnaStranica+1,kreirajElementSaSlikama);
    else {
        aktivnaStranica++;
        otkrijOdgContainer(aktivnaStranica)
    }
    
}

function prethodnaStranica(){
    if(aktivnaStranica>1) {
        aktivnaStranica--;
        otkrijOdgContainer(aktivnaStranica);
    }
}

function kreirajElementSaSlikama(response){
    lastPage = response[0].lastPage;
    console.log(lastPage);
    if(lastPage) {
        sljed.disabled=true;
        broj_posljednje=aktivnaStranica+1;
        console.log(broj_posljednje);
    }
    var containerElement = document.createElement("div");
    containerElement.setAttribute("id","id_"+(aktivnaStranica+1));
    containerElement.setAttribute("class","slikacontainer");
    containerElement.style.display = "block";
    response.forEach(element => {
        var imageNode = document.createElement("img");
                imageNode.setAttribute("id",element.fileName);
                imageNode.setAttribute("src", "data:image/jpeg;charset=utf-8;base64,"+element.file);
                imageNode.setAttribute("class","slika item-1")
                containerElement.appendChild(imageNode); 
    });
    aktivnaStranica++;
    loadedStranice.push(aktivnaStranica);
    sakrijSlikaContainere();
    document.getElementById("container").appendChild(containerElement);
    
}

function sakrijSlikaContainere(){
    var niz = document.getElementsByClassName("slikacontainer");
    if(niz.length!=0){
    for (var i=0; i<niz.length;i++) {
        console.log(niz[i]);
        
        niz[i].style.display="none";
    };
}
}

function otkrijOdgContainer(containerId){
    sakrijSlikaContainere();
    document.getElementById("id_"+containerId).style.display="block";
}

function prethodni() {    
    sljed.disabled=false;
    prethodnaStranica();
    if(aktivnaStranica==1) pret.disabled=true;
}

function sljedeci() {
    pret.disabled=false;
    sljedecaStranica();
    console.log('aktivna stranica: '+ aktivnaStranica);
    console.log('posljednja stranica: '+ broj_posljednje);
    if(lastPage && aktivnaStranica==broj_posljednje) sljed.disabled=true;

}