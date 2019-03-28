function Vector (x ,y) {
    this.x = x;
    this.y = y;
}

//Metodo para sumar,recibe otro vector como parámetro y los sumamos 
Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

//Metodo para multiplicar, recibe un multiplicado o factor como parámetro
Vector.prototype.times = function (factor) {
    return new Vector(this.x * factor, this.y * factor);
};