const ARROW_CODES = {
    37: 'left',
    38: 'up',
    39: 'right'
};

let arrows = trackKeys(ARROW_CODES);

function trackKeys (keyCodes) {
    let pressedKeys = {};
    function handler (event) {
        if (keyCodes.hasOwnProperty(event.keyCode)) {
            let downPressed = event.type === 'keydown';
            pressedKeys[keyCodes[event.keyCode]] = downPressed;
            event.preventDefault(); //Evita el comportamiento por defecto
        }
       // console.log(pressedKeys);
    }
    addEventListener('keydown', handler); //Evento de pulsar una tecla
    addEventListener('keyup', handler);  //Evento de soltar tecla

    return pressedKeys;
}

function runAnimation (frameFunction) {
    let lastTime = null;
    function frame (time) {
       // console.log(time);
        let stop = false;
        if (lastTime !== null){
            let timeStep = Math.min(time - lastTime, 100) /1000; //para sacar ms
            stop = frameFunction(timeStep) === false;
        }
        lastTime = time;
        if (!stop) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
}

function runLevel (level, Display, callback) {
    let display = new Display(document.body, level);
    //console.log(step);
    runAnimation(function (step) {
        //console.log(step);
        level.animate(step, arrows);
        display.drawFrame();
        if (level.isFinished()) {
            display.clear();
            if (callback) callback(level.status);
            return false;
        }
        
    });
}

function runGame(level, Display) {
    let levelObject;
    try {
        levelObject = new Level(GAME_LEVELS);
    } catch (error) {
        return alert(error);
    }
    //let levelObject = new Level(GAME_LEVELS);
    runLevel(levelObject, Display, status => {
        if (status === 'lost') console.log('Hemos perdido');
        else console.log('Has ganado');
    });
}


runGame(GAME_LEVELS, DomDisplay);
//let level = new Level(GAME_LEVELS);
//let display = new DomDisplay(document.body, level);
//display.drawBackground();