var carSpeed = 0;
var battery = 100; //full battery
var kmToGo = 500; // 500 km on full battery
var kmAlready = 2800; // already 2800 km driven
var kwh = 95; // kwh is 95 when full
var r= document.querySelector(':root');
var charger = document.querySelector('.imagecharger');
var opacity = 0;
var lightsopacity = 0;


// r.style.setProperty('--percentagebattery', battery);
// r.style.setProperty('--p', carSpeed);
// r.style.setProperty('--kwhpercentage', kwh);
// r.style.setProperty('--drivertextd', underline);
// r.style.setProperty('--drivertextp', underline);
// r.style.setProperty('--opacity', opacity);
// r.style.setProperty('--lightsopacity', lightsopacity);
document.querySelector("#kwh").innerText = kwh + ' kWh';
document.querySelector("#kmalready").innerText = kmAlready + ' km';
document.querySelector("#kmtogo").innerText = kmToGo + ' km';
r.style.setProperty('--percentagebattery', battery);
r.style.setProperty('--kwhpercentage', kwh);

var underline = 'underline';
var none = 'none';

function showTime(){
    let date = new Date(); 
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let session = "AM";

    if(hours == 0){
        hours = 12;
    }
    if(hours > 12){
        hours = hours - 12;
        session = "PM";
     }

     
   hours = (hours < 10) ? "0" + hours : hours;
   minutes = (minutes < 10) ? "0" + minutes : minutes;
    
   let time = hours + ":" + minutes + " " + session;

  document.querySelector(".time").innerText = time; 
  let t = setTimeout(function(){ showTime() }, 1000);
}
showTime();

// function accelerateHigherKm(){
//   while(MouseEvent.mouseDOnw)
//   carSpeed = carSpeedOld + newcarSpeed;
//   document.querySelector("#kmnumber").innerText = carSpeed; 
// }

function checkBattery(){
  console.log(battery);
  r.style.setProperty('--percentagebattery', battery);
  if(battery > 0 && battery < 3){
    carSpeed = 0
    document.querySelector("#kmnumber").innerText = carSpeed; 
    r.style.setProperty('--p', carSpeed / 2.4);
  }
  return battery;
}
setInterval(checkBattery, 2000);


const accelerateButton = document.querySelector('#acceleratordisplay').addEventListener('click', accelerate)
function accelerate(){
  if(carSpeed < 210 && battery > 10){
    carSpeed += 5;
    document.querySelector("#kmnumber").innerText = carSpeed; 
    r.style.setProperty('--p', carSpeed / 2.4);
    r.style.setProperty('--drivertextd', underline);
    r.style.setProperty('--drivertextp', none);
  }
};

const brakeButton = document.querySelector('#brakedisplay').addEventListener('click', brake)
function brake(){
  if(carSpeed < 5){
    carSpeed = 0;
    document.querySelector("#kmnumber").innerText = carSpeed; 
    r.style.setProperty('--p', carSpeed / 2.4);
    r.style.setProperty('--drivertextp', underline);
    r.style.setProperty('--drivertextd', none);
    return carSpeed;
  }else if(carSpeed > 5 || carSpeed == 5){
    carSpeed -= 5;
    document.querySelector("#kmnumber").innerText = carSpeed; 
    r.style.setProperty('--p', carSpeed / 2.4);
    r.style.setProperty('--drivertextp', none);
    return carSpeed;
  }
};

var cruiceControlCheck = false;
const cruisecontrolButton = document.querySelector('#cruisecontrol').addEventListener('click', cruiseControl)
function cruiseControl(){
    if(cruiceControlCheck == false){
        console.log('cruise control is on');
        document.querySelector('#cruisecheck').innerText = 'Cruise control ON';
        r.style.setProperty('--kmlinecolor', '#82E0AA');
        r.style.setProperty('--cruiseopacity', '1');
        return cruiceControlCheck = true;
    }else {
        console.log('cruise control is off');
        document.querySelector('#cruisecheck').innerText = 'Cruise control OFF';
        r.style.setProperty('--kmlinecolor', '#94b5fe');
        r.style.setProperty('--cruiseopacity', '0');
        return cruiceControlCheck = false;
    }
}

var carLightsCheck = false;
const carLightsButton = document.querySelector('#lights').addEventListener('click', carLights)
function carLights(){
    if(carLightsCheck == false){
        console.log('car lights are on');
        document.querySelector('#lightscheck').innerText = 'Lights ON';
        r.style.setProperty('--lightsopacity', '1');
        return carLightsCheck = true;
    }else {
        console.log('car lights are off');
        document.querySelector('#lightscheck').innerText = 'Lights OFF';
        r.style.setProperty('--lightsopacity', '0');
        return carLightsCheck = false;
    }
}

const leftButton = document.querySelector('#left').addEventListener('click', leftBlink);
function leftBlink(){
    document.querySelector("#right").disabled = true;
    r.style.setProperty('--lightleft', '#94b5fe'); // left gets lighter
    r.style.setProperty('--lightright', '#00034c'); // right goes darker -> off
    r.style.setProperty('--seconds-left', '0.8s');
};

const rightButton = document.querySelector('#right').addEventListener('click', rightBlink);
function rightBlink(){
  document.querySelector("#left").disabled = true;
  r.style.setProperty('--lightleft', '#00034c'); // right gets lighter
  r.style.setProperty('--lightright', '#94b5fe'); // left goes darker -> off
  r.style.setProperty('--seconds-right', '0.8s');
};

const stopButton = document.querySelector('#stop').addEventListener('click', stop);
function stop(){
  document.querySelector("#left").disabled = false;
  document.querySelector("#right").disabled = false;
  r.style.setProperty('--lightleft', '#00034c');
  r.style.setProperty('--lightright', '#00034c');
  r.style.setProperty('--seconds-right', '0');
  r.style.setProperty('--seconds-left', '0');
};

const chargeButton = document.querySelector('#charge').addEventListener('click', charge);
function charge(){
  battery = 100;
  document.querySelector("#batterypercent").innerText = battery + '%';
  r.style.setProperty('--percentagebattery', battery);
  charger.style.transform = 'scale(0)';
  kmToGo = 500;
  kwh = 95;
  r.style.setProperty('--kwhpercentage', kwh);
  document.querySelector("#kwh").innerText = kwh + ' kWh';
}

var x = false;
const handbrakeButton = document.querySelector('#handbrake').addEventListener('click', handbrake);
function handbrake(){
  if( x == 0){
    document.querySelector("#acceleratordisplay").disabled = true;
    console.log('handbrake is pressed, accelerate disabled');
    r.style.setProperty('--drivertextp', underline);
    r.style.setProperty('--opacity', 1);
    document.querySelector('#handbrakecheck').innerText = 'Handbrake ON';
    x = true;
  }else {
    document.querySelector("#acceleratordisplay").disabled = false;
    console.log('accelerate enabled');
    r.style.setProperty('--drivertextp', none);
    r.style.setProperty('--opacity', 0);
    document.querySelector('#handbrakecheck').innerText = 'Handbrake OFF';
    x = false;
  }
}


// function accelerateBatteryGoesDown(){
//     battery = battery - 5;
//     document.querySelector("#batterypercent").innerText = battery + '%';
//     r.style.setProperty('--percentagebattery', battery);
    // if(battery < 25){
    //   charger.style.transform = 'scale(1)';
    // }else
    // charger.style.transform = 'scale(0)';
// }

function kmGoesDown() {
  if(carSpeed > 1 || carSpeed == 1){
    if(cruiceControlCheck == false){
        carSpeed -= 1;
        document.querySelector("#kmnumber").innerText = carSpeed; 
        r.style.setProperty('--p', carSpeed / 2.4);
    }else {
        carSpeed;
        document.querySelector("#kmnumber").innerText = carSpeed; 
        r.style.setProperty('--p', carSpeed / 2.4);
    }
  }
}

function batteryGoesDown(){
  if(carSpeed > 10 && battery > 0){
    battery -= 1;
    document.querySelector("#batterypercent").innerText = battery + '%';
    r.style.setProperty('--percentagebattery', battery);
  }
  if(battery < 25){
    charger.style.transform = 'scale(1)';
  }else
  charger.style.transform = 'scale(0)';

}

// r.style.setProperty('--percentagebattery', battery);
// r.style.setProperty('--kwhpercentage', kwh);

function kmToGoGoesDown(){
  if(carSpeed > 5){
    kmToGo -= 1;
    document.querySelector("#kmtogo").innerText = kmToGo + ' km';
  }
  document.querySelector("#kmtogo").innerText = kmToGo + ' km';
}

function kwhGoesDown(){
  if(carSpeed > 1){
    kwh -= 1;
    document.querySelector("#kwh").innerText = kwh + ' kWh';
    r.style.setProperty('--kwhpercentage', kwh);
  }
  // r.style.setProperty('--kwhpercentage', kwh);
}

function kmAlreadyGoesUp(){
  if(carSpeed > 10){
    kmAlready += 1;
    document.querySelector('#kmalready').innerText = kmAlready + ' km';
  }
}

setInterval(kwhGoesDown, 2200);
setInterval(kmGoesDown, 2000);
setInterval(batteryGoesDown, 2000);
setInterval(kmToGoGoesDown, 4000);
setInterval(kmAlreadyGoesUp, 2000);

  kwhGoesDown();
  kmGoesDown();
  batteryGoesDown();
  kmToGoGoesDown();


const btn = document.getElementById('btn')
var haveEvents = 'GamepadEvent' in window;
var haveWebkitEvents = 'WebKitGamepadEvent' in window;
var controllers = {};
var rAF = window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.requestAnimationFrame;

function connecthandler(e) {
  addgamepad(e.gamepad);
}
function addgamepad(gamepad) {
  controllers[gamepad.index] = gamepad; 
  rAF(updateStatus);
}

function disconnecthandler(e) {
  removegamepad(e.gamepad);
}

function removegamepad(gamepad) {
  delete controllers[gamepad.index];
}

function vibrateController(){
  const gamepad = navigator.getGamepads()[0];

  gamepad.vibrationActuator.playEffect('dual-rumble', {
    startDelay: 0,
    duration: 200,
    weakMagnitude: 0.3,
    strongMagnitude: 0.3,
  });
}

function updateStatus() {
  scangamepads();
  var s=[];
  for (j in controllers) {
    var controller = controllers[j];
    for (var i=0; i<controller.buttons.length; i++) {
      var val = controller.buttons[i];
      var pressed = val == 1.0;
      var touched = false;
      if (typeof(val) == "object") {
        pressed = val.pressed;
        if ('touched' in val) {
          touched = val.touched;
        
        }
        val = val.value;
      }
      var pct = Math.round(val * 100) + "%";
      if(pressed){
        switch(i){
          case 6: // left back bigger button on controller
          brake();
          break;
          case 7: // right back bigger button on controller
          accelerate();
          vibrateController();
          break;
          case 12: // arrow up
          accelerate();
          vibrateController();
          break;
          case 13: // arrow down
          brake();
          break;
            case 4: // left back on controller
            leftBlink();
            break; 
            case 5: // right back on controller
            rightBlink();
            break; 
            case 1: // b button
            stop();
            break;
            case 2: // x button
            handbrake();
            break;
            case 3: // y button
            cruiseControl();
            break;
            case 0: // a button
            carLights();
            break;
        }
      }
      

     // s.push([i,pressed].join(','));
    };
    //console.log(s);

    //var axes = d.getElementsByClassName("axis");
    //for (var i=0; i<controller.axes.length; i++) {
     // var a = axes[i];
     // a.innerHTML = i + ": " + controller.axes[i].toFixed(4);
     // a.setAttribute("value", controller.axes[i]);
    //}
  };
  rAF(updateStatus);
}

function scangamepads() {
  var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
  for (var i = 0; i < gamepads.length; i++) {
    if (gamepads[i] && (gamepads[i].index in controllers)) {
      controllers[gamepads[i].index] = gamepads[i];
    }
  }
}

if (haveEvents) {
    console.log('AAA00');
  window.addEventListener("gamepadconnected", connecthandler);
  window.addEventListener("gamepaddisconnected", disconnecthandler);
} else {
    console.log('bbbb');
  setInterval(scangamepads, 500);
}