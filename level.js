const ACTORS = {
    'o': Coin,
    '@': Player,
    '=': Lava,
    '|': Lava,
    'v': Lava

};

function Level (plan) {
    this.width = plan[0].length;
    this.heigth = plan.length;
    this.status = null; // Para saber si se esta jugando
    this.finishDelay = null; // Cuando matan al player , el delay para empezar de nuevo

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
    console.log(this.actors);

}

Level.prototype.isFinished = function () {
    return (this.status != null && this.finishDelay < 0)
}