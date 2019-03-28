const ACTORS = {
    'o': Coin

};

function Level (plan) {
    this.width = plan[0].length;
    this.heigth = plan.length;

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
            

            if (character === 'x')  characterType = 'wall';
            else if (character === '!') characterType = 'lava';
            gridLine.push(characterType)   
        }

        this.grid.push(gridLine);
    }

}