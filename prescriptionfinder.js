
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
     console.log(manList[33]);
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
    tableString += "<th>Medication Name </th><th> Nhs Number </th><th> Manufacturer </th><th> Manufacturer Phone Number</tr>";

    for(i in medList){
        if(medList[i].medicationName.toUpperCase().includes(name.value.toUpperCase())){
            tableString += "<tr><td>"+medList[i].medicationName+"</td><td>";
            tableString += medList[i].nhsnumber+"</td>";
            tableString += "<td>"+manList[medList[i].manufacturerid].manufacturer_name; +"</td></tr>";
            tableString += "<td>"+manList[medList[i].manufacturerid].phoneNumber; +"</td></tr>";
        }
    } 

    tableString += "</table>";
    document.getElementById("table").innerHTML = tableString;
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
            console.log
        }
    } 

    tableString += "</table>";
    document.getElementById("storetable").innerHTML = tableString;
}

/////////////////////put request////////////////////////

function updatestock(newnumber, medid){
console.log(stockcheckList[0].stockno);
let url = "http://localhost:8080/api/stockcheck/"
let data = {};
data.stockno = newnumber;
let json = JSON.stringify(data);

let xhr = new XMLHttpRequest();
xhr.open("PUT",url+medid,true);
xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
xhr.onload = function(){
    let stockcheck = JSON.parse(xhr.responseText);
    if(xhr.readyState == 4 && xhr.status == "200"){
        console.table(stockcheck);
    } else {
        console.error(stockcheck);
    }
    }

xhr.send(json);

console.log(stockcheckList[0].stockno);
}



/////////////////for the search check stock table//////////////

function checkStock(name){
    document.getElementById("stocktable").innerHTML="";
    tableString = "";
    tableString += "<table><tr>";
    tableString += "<th>Medication</th><th> Store </th><th> Stock Number</th><th> Change Stock No. </th></tr>";

    for(i in medList){
     if(medList[i].medicationName.toUpperCase().includes(name.value.toUpperCase())){
         tableString += "<tr><td>"+medList[i].medicationName+"</td>";
         tableString += "<td> " +  getStoreName(stockcheckList[medList[i].medId - 1].storeid)+ "</td>";
         tableString += "<td id='stock'> " + stockcheckList[medList[i].medId - 1].stockno+"</td>";
         console.log(medList[i].medId);
         tableString += "<td><input type='text' id= \"newstockno\"></td>"
         tableString += "<td><button onclick='updatestock(document.getElementById(\"newstockno\").value, "+medList[i].medId +");'>hi</button></td></tr>"


      // tableString += "<td><input type='text' id='newstockno"+i+"'><button onclick='document.getElementById("+'"'+"stock"+i+'"'+").innerHTML=document.getElementById("+'"'+"newstockno"+i+'"'+").value';"

       // tableString += "updatestock(document.getElementById('stock').value,"+ medList[i].medId+" )";
      //tab"onclick='updatestock(document.getElementById("+'"'+"newstockno"+i+'"'+").value,"+medList[i].medId+")'>hi</button></td></tr>";

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


////////////////////add a new medicine//////////////
function addMedicine(){
	let url = "http://localhost:8080/api/medication";
		newmanufacturerid =parseInt(document.getElementById('manufacturer').value);
		newmedicationName=document.getElementById('medname').value;
		newnhsnumber=document.getElementById('nhsnum').value;
		
	let json = JSON.stringify(
			{
				"manufacturerid" : newmanufacturerid,
				"medicationName" : newmedicationName,
				"nhsnumber" : newnhsnumber

			});

	let xhr= new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.setRequestHeader('Content-type','application/json');
	xhr.setRequestHeader('Access-Control-Allow-Origin','*');
	xhr.send(json);
	}


///////////////add a new store///////////////////

function addStore(){
	let url = "http://localhost:8080/api/store";
		newstorename = document.getElementById('storename').value;
		newstoreno = document.getElementById('storenum').value;
		newstoreaddre = document.getElementById('storeaddress').value;

	let json = JSON.stringify(
	{
		"storename" : newstorename,
		"address" : newstoreaddre,
		"phonenumber" : newstoreno
	});

	let xhr = new XMLHttpRequest();
	xhr.open("POST",url,true);
	xhr.setRequestHeader('Content-type', 'application/json');
	xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.send(json);
	if(xhr.readyState == 4 && xhr.status == "200"){
		document.getElementById('storeadded').innerHTML="Store Added to Database!!";

	}

}









