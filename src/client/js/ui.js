import { remove } from './api'
import { clearStorage } from './api'

//storageUI
function storageUI() {
    remove();
    let situation = 'linear-gradient(90deg, rgba(43, 192, 228,  0.3), rgba(234, 236, 198,  0.3))';  
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
  
    console.log(':::storage infomation:::');
  };

  export {
    storageUI
  }