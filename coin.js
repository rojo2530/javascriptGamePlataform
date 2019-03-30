function Coin(initialPosition) {
    //Inicializamos dos variables en la misma linea
    this.basePosition = this.position = initialPosition.plus(new Vector(0.2,0.1));
    this.size = new Vector(0.6,0.6);
    this.wooble = Math.PI * 2 * Math.random();   //El temblor de la moneda, usamos la longitud del circulo por un núm aleatorio
}

Coin.prototype.type = 'coin';
