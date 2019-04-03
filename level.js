const ACTORS = {
    'o': Coin,
    '@': Player,
    '=': Lava,
    '|': Lava,
    'v': Lava

};

const MAX_STEP = 0.05;

function Level (plan) {
    if (!validateLevel(plan)) throw new Error('You need a player and a coin');
    
    this.width = plan[0].length;
    this.heigth = plan.length;
    this.status = null; // Para saber si se esta jugando
    this.finishDelay = null; // Cuando matan al player , el delay para empezar de nuevo
    //this.actor = null;

    this.grid = [];
    this.actors = [];   //Array donde guardamos nuestros actores


    for (let y=0; y< this.heigth; y++) {
        let line = plan[y];
        let gridLine = [];
        for (let x=0; x<this.width; x++) {
            let character = line[x];
            let characterType = null;
            let Actor = ACTORS[character];
            if (Actor) this.actors.push(new Actor(new Vector(x,y),character));
            //if (ACTORS[character]) this.actors.push(new Coin(new Vector(x, y), character));
            
            if (character === 'x')  characterType = 'wall';
            else if (character === '!') characterType = 'lava';
            gridLine.push(characterType)   
        }

        this.grid.push(gridLine);
    }

    this.actor = this.actors.filter(actor => actor.type === 'player')[0];
    console.log(this.actor);
    //for (let i=0; i<this.actors.length; i++) {
    //    if (this.actors[i].type === 'player') this.actor = this.actors[i];
   // }
}

Level.prototype.isFinished = function () {
    return (this.status != null && this.finishDelay < 0)
}

Level.prototype.animate = function (step, keys) {
    if (this.status !== null) this.finishDelay -= step;
    
    while(step > 0) {
        let thisStep = Math.min(step, MAX_STEP); 
        this.actors.forEach(actor => actor.act(thisStep, this, keys));
        step -= thisStep;
    }

}


Level.prototype.obstacleAt = function (position, size) {
    let xStart = Math.floor(position.x);
    let xEnd = Math.ceil(position.x + size.x);
    let yStart = Math.floor(position.y);
    let yEnd = Math.ceil(position.y + size.y);

    if (xStart < 0 || xEnd > this.width || yStart < 0) return 'wall';
    if (yEnd > this.height) return 'lava';

    for (let y = yStart; y < yEnd; y++) {
        for (let x = xStart; x < xEnd; x++) {
            let fieldType = this.grid[y][x];
            if (fieldType) return fieldType;
        }
    }
}

Level.prototype.playerTouched = function (type) {
    if (type === 'lava' && this.status === null) {
        this.status = 'lost';
        this.finishDelay = 1;
    
    } else if (type === 'coin') {
        this.actors = this.actors.filter(otherActor !== actor);
        if (!remainCoins(this.actors)) {
            this.status = 'won';
            this.finishDelay = 2;
        }
    }
}

//Función para que valida un nivel, tiene que tener mínimo un jugador y una moneda, usamos el método de string y arrays IndexOf que nos devuelve el indíce de un valor del array o del string
// Si no existe nos devuelve un -1 
//Tenemos que usar una High order functions
function validateLevel(level) {
    //for (let i = 0; i < level.length; i++) {
    //     if (level[i].indexOf('@') !== -1) return true;

    //}
    return (level.some(row => row.indexOf('@') !== -1) && level.some(row => row.indexOf('o') !== -1));
}

function remainCoins (actors) {
    return actors.some(actor => actor.type === 'coin');
}