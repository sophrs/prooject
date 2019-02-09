
function loadData(){
    LoadManData();
    LoadMedData();
    LoadStoreData();
    LoadStockDate();
}

////////for the manufacturer table//////////////

let manList = [];

function LoadManData(){
     let xmlHttp = new XMLHttpRequest();
     xmlHttp.open("GET", "http://localhost:8080/api/manufacturer", false);
     xmlHttp.send(null);
     let jsonString = xmlHttp.responseText;
     manList = JSON.parse(jsonString);
     console.log(manList[1]);
 }

/////////////for the store table/////////////////////

let storeList = [];
function LoadStoreData(){
     let xmlHttp = new XMLHttpRequest();
     xmlHttp.open("GET", "http://localhost:8080/api/store", false);
     xmlHttp.send(null);
     let jsonString = xmlHttp.responseText;
     storeList = JSON.parse(jsonString);
     console.log(storeList[1]);
 }


 //////////////for the stockcheck table//////////////////
 let stockcheckList = [];
 function LoadStockDate(){
    let xmlHttp = new XMLHttpRequest();
     xmlHttp.open("GET", "http://localhost:8080/api/stockcheck", false);
     xmlHttp.send(null);
     let jsonString = xmlHttp.responseText;
     stockcheckList = JSON.parse(jsonString);
     console.log(stockcheckList[1]);
 }


//for the medication table//////////////

let medList = [];

function LoadMedData(){
     let xmlHttp = new XMLHttpRequest();
     xmlHttp.open("GET", "http://localhost:8080/api/medication", false);
     xmlHttp.send(null);
     let jsonString = xmlHttp.responseText;
     medList = JSON.parse(jsonString);
     console.log(medList[1]);
 }
    

/////for the search medication table//////

function searchMedications(name){ 
    document.getElementById("table").innerHTML = "";
    tableString = "";
    tableString += "<table><tr>";
    tableString += "<th>Medication Name </th><th> Nhs Number </th><th> Manufacturer </th></tr>";

    for(i in medList){
        if(medList[i].medicationName.toUpperCase().includes(name.value.toUpperCase())){
            tableString += "<tr><td>"+medList[i].medicationName+"</td><td>";
            tableString += medList[i].nhsnumber+"</td>";
            tableString += "<td>"+getManName(medList[i].manufacturerid);+"</td></tr>";
        }
    } 

    tableString += "</table>";
    document.getElementById("table").innerHTML = tableString;
}


function getManName(idnumber){
    for(i in manList){
        if (idnumber === manList[i].manId){
                   console.log("hey")
                 manList[i].manufacturer_name;
                 console.log("hi")
            }}
}


//////////////for the search stores table/////////////////

function searchStores(name){ 
    document.getElementById("storetable").innerHTML = "";
    tableString = "";
    tableString += "<table><tr>";
    tableString += "<th>Store Name </th><th> Phone Number </th><th> Address </th></tr>";

    for(i in storeList){
        if(storeList[i].storename.toUpperCase().includes(name.value.toUpperCase())){
            tableString += "<tr><td>"+storeList[i].storename+"</td><td>";
            tableString += storeList[i].phonenumber+"</td><td>";
            tableString += storeList[i].address+"</td></tr>"
        }
    } 

    tableString += "</table>";
    document.getElementById("storetable").innerHTML = tableString;
}

/////////////////for the search check stock table//////////////

function checkStock(name){
    let mednumber = [];
    document.getElementById("stocktable").innerHTML="";
    tableString = "";
    tableString += "<table><tr>";
    tableString += "<th>Medication</th><th> Store </th><th> Stock Number</th></tr>";

    for(i in medList){
     if(medList[i].medicationName.toUpperCase().includes(name.value.toUpperCase())){
         tableString += "<tr><td>"+medList[i].medicationName+"</td><td>";
         mednumber[i] = medList[i].medId;
         console.log(mednumber)
             } }

    for(i in stockcheckList){
    if( mednumber[i] === stockcheckList[i].medicationid){
         tableString += stockcheckList[i].storeid+ "</td><td>";
       
        tableString += stockcheckList[i].stockno+"</td><tr>";
        }
    }

    

     tableString += "</table>";
    document.getElementById("stocktable").innerHTML = tableString;
}


function getStoreName(storeid){
    for(i in storeList){
        if (storeid === storeList[i].storeid){
            return storeList[i].storename
        }
    }
}








