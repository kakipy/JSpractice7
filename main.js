(function(){
    'use strict';

    let timer =document.getElementById('timer');
    let start =document.getElementById('start');
    let stop =document.getElementById('stop');
    let reset =document.getElementById('reset');

    let startTime;
    let elapsedTime = 0;
    let timerId;
    let timeToAdd = 0;
    let isRunning = false;

    function updateTimerText(){
        let m = Math.floor(elapsedTime/60000);
        let s = Math.floor(elapsedTime%60000 /1000);
        let ms = elapsedTime%60000;

        m = ('0'+m).slice(-2);
        s = ('0'+s).slice(-2);
        ms = ('00'+ms).slice(-3);

        timer.textContent = m +':'+s+'.'+ms;
    }

    function countUp(){
        timerId = setTimeout(function(){
            elapsedTime = Date.now() - startTime +timeToAdd;
            updateTimerText();
            countUp();
        },10);
    }

    // start.className ='btn';
    // stop.className ='btn inactive';
    // reset.className ='btn inactive';

    function updateButtonState(startButtonState,stopButtonState,resetButtonState){
        start.className = startButtonState ? 'btn' : 'btn inactive';
        stop.className = stopButtonState ? 'btn' : 'btn inactive';
        reset.className = resetButtonState ? 'btn' : 'btn inactive';
    }
    updateButtonState(true,false,false);

    start.addEventListener('click', function(){
        if(isRunning === true){
            return;
        }
        updateButtonState(false,true,false);
        isRunning = true;
        startTime = Date.now();
        countUp();
    });
    stop.addEventListener('click', function(){
        if(isRunning === false){
            return;
        }
        updateButtonState(true,false,true);
        isRunning = false;
        clearTimeout(timerId);
        timeToAdd += Date.now() -startTime;
    });
    reset.addEventListener('click', function(){
        if(isRunning === true){
            return;
        }
        updateButtonState(true,false,false);
        elapsedTime =0;
        timerId =0;
        updateTimerText();
    });



})();
