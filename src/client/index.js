import { check } from './js/api'
import { syncGeo } from './js/api'
import './styles/style.scss'

/* ENVIROMENT SET */
document.getElementById('generate').addEventListener('click', performAction);
check();

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
  
export{
    performAction
}

