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