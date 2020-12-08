/* API */
//GEO
const baseURLGeo = 'http://api.geonames.org/searchJSON?q=';
const apiKeyGeo = '&username=magicmizuki';

//WEATHER
//NOTICE>> in which day([i])
const baseURLW = 'http://api.weatherbit.io/v2.0/forecast/daily?city=';
const apiKeyW = '&key=07c720c9f2cc4e278df3d746cb835224';

//PIXBAY
const baseURLPix = 'https://pixabay.com/api/?';
const apiKeyPix = 'key=19218997-1072ddb595caf7151d1ff7109&q=';

/* ENVIROMENT SET */
let situation = 'linear-gradient(90deg, rgba(43, 192, 228,  0.3), rgba(234, 236, 198,  0.3))';
// document.getElementById('generate').addEventListener('click', performAction);
check();
function check() {
  if (localStorage.hasOwnProperty('location')) {
    storgeUI() ;
  } 
}

/* FUNCTIONS */
//main function
function performAction(){
  let d = new Date();
  let now = d.getTime();
  let newJournal = document.getElementById('destination').value;
  let startDate =  document.getElementById('startDate').value;
  let targetDateNum = new Date(startDate).getTime();
  let days = Math.floor((targetDateNum - now) / (1000 * 60 * 60 * 24));

  syncGeo(newJournal, startDate, days);
  console.log(':::perform action:::');
};

//clear Storage
function clearStorage () {
  localStorage.clear();
  remove();
  console.log(':::clear storage:::');
}

//remove cache
function remove () {
  let element1 = document.getElementById("journal");
  while (element1.firstChild) {
  element1.removeChild(element1.firstChild);
  }

  let element2 = document.getElementById("info");
  while (element2.firstChild) {
  element2.removeChild(element2.firstChild);
  }
  console.log(':::remove cache:::');
}



/* DATA PROCESS */
//DATA SYNC
const getSync = async (baseURLGeo, local, keyGeo)=>{
  const syncRes = await fetch(baseURLGeo+local+keyGeo);
 try {
   const syncData = await syncRes.json();
   return syncData;
 } catch(error) {
   console.log('error:', error);
 }
};

//POST DATA
const postData = async ( url = '', data = {})=>{
 const response = await fetch(url, {
 method: 'POST',
 credentials: 'same-origin',
 headers: {
     'Content-Type': 'application/json',
 }, 
 body: JSON.stringify(data), 
});

try {
  const newData = await response.json();
  console.log(newData);
  return newData;
}catch(error) {
  console.log('error:', error);
}
}

const saveUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    localStorage.setItem('location', allData.location);
    localStorage.setItem('startDate', allData.startDate);
    localStorage.setItem('temp', allData.temprature);
    localStorage.setItem('icon', allData.icon);
    localStorage.setItem('pix', allData.pix);
  }catch(error){
    console.log('error', error);
  }
}

/* SYNC */
//syncGeo
function syncGeo(newJournal, startDate, days) {
  getSync(baseURLGeo, newJournal, apiKeyGeo)
  .then( function (data) {
    let destinationLocal = data.geonames[0].name;
    let localPix = data.geonames[0].name + '+' + data.geonames[0].countryName;
    postData('/addGeo', {location: data.geonames[0].name, country: data.geonames[0].countryName, latitude: data.geonames[0].lat, startDate: startDate, days: days })
    .then(syncPic(localPix), syncWeather(destinationLocal, days))
  })
  console.log(':::sync Geo:::');
}
//syncWeather
function syncWeather(destinationLocal, days){
  getSync(baseURLW, destinationLocal , apiKeyW)
  .then( function (data) {
    postData('/addWeather', {temprature: data.data[days].temp, icon: data.data[days].weather.icon})
    .then( updateUI())
  })
  console.log(':::sync weather:::');
}

//syncPic
function syncPic(localPix){
  getSync(baseURLPix, apiKeyPix, localPix)
  .then( function (data) {
    postData('/addPix', {pix: data.hits[0].webformatURL})
})
console.log(':::sync pixbay:::');
}

/* UI */
//UPDATEUI
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();
    remove();

    let node = document.createElement('div');
    let nodeLocal = allData.location;
    node.style.height = "200px"; 
    node.style.backgroundImage = situation + ', url(\"' + allData.pix + '\")';
    node.innerHTML = '<h1>' + nodeLocal + '</h1>'; 
    node.setAttribute('id', 'node');
    document.getElementById('journal').appendChild(node);

    let panelIcon = '<img class=\"icon\" src=\"https://www.weatherbit.io/static/img/icons/' + allData.icon + '.png\">';
    let panelTemp = allData.temprature + '°C';
    let panelDate = allData.startDate;
    let panel = document.createElement('div');
    let button = '<button id="saveBtn">Save my destination</button>'
    panel.innerHTML = '<ul><li>' + panelDate + panelIcon + panelTemp + '</li></ul>' + button ;
    panel.setAttribute('id', 'panel');
    document.getElementById('info').appendChild(panel);
    document.getElementById('saveBtn').addEventListener('click', saveUI);

  }catch(error){
    console.log('error', error);
  }
}


//storgeUI
function storgeUI() {
  remove();

  let node = document.createElement('div');
  let nodeLocal = localStorage.getItem('location');
  let nodeBg = localStorage.getItem("pix");
  node.style.height = "200px"; 
  node.style.backgroundImage = situation + ', url(' + nodeBg + ')';
  node.innerHTML = '<h1>' + nodeLocal + '</h1>'; 
  node.setAttribute('id', 'node');
  document.getElementById('journal').appendChild(node);

  let infoIcon = localStorage.getItem("icon");
  let panelIcon = '<img class=\"icon\" src=\"https://www.weatherbit.io/static/img/icons/' + infoIcon + '.png\">';
  let panelTemp = localStorage.getItem('temp') + '°C';
  let panelDate = localStorage.getItem('startDate');
  let panel = document.createElement('div');
  let button = '<button id="clearBtn">Clear this destination</button>'
  info.innerHTML = '<ul><li>' + panelDate + panelIcon + panelTemp + '</li></ul>' + button ;
  panel.setAttribute('id', 'panel');
  document.getElementById('info').appendChild(panel);
  document.getElementById('clearBtn').addEventListener('click', clearStorage);

  console.log(':::storge infomation:::');
};
export{
  performAction, syncGeo, syncWeather, syncPic, updateUI
}
