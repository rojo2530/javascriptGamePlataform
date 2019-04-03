function Lava(initialPosition, characterType) {
    this.position = initialPosition;
    this.size = new Vector (1,1);

    if (characterType === '=')
        this.speed = new Vector(2, 0); //Lava que se mueva horizontalmente

    else if (characterType === '|')
        this.speed = new Vector(0, 2); //Lava que se mueva verticalmente
    else if (characterType === 'v') {
        this.speed = new Vector(0, 3); //Lava que se mueve verticalmente pero inicia de nuevo una vez toca una pared
        this.respawnPosition = initialPosition;
    } 

}

Lava.prototype.type = 'lava';

Lava.prototype.act = function (step, level) {
    //console.log(Level.obstacleAt);
    let newPosition = this.position.plus(this.speed.times(step));
    if (!level.obstacleAt(newPosition, this.size)) this.position = newPosition;
    else if (this.respawnPosition) this.position = this.respawnPosition;
    else this.speed = this.speed.times(-1);
}