 const SCALE = 20;

function createElement(type, className) {
    let element = document.createElement(type);
    if (className) element.className = className;
    return element;
}

function DomDisplay(parent,level) {
    this.wrap = parent.appendChild(createElement('div', 'game'));
    this.level = level;

    //this.wrap.appendChild(this.drawBackground());
    
    //this.wrap.appendChild();
   this.wrap.appendChild(this.drawBackground());
   //this.wrap.appendChild(this.drawActors());
   this.actorLayer = null;
    this.drawFrame();;
}

// Pasamos uno de los métodos y lo añadimos como prototype

DomDisplay.prototype.drawBackground = function () {
    let table = createElement('table', 'background');
    table.style.width = this.level.width * SCALE + 'px';  //Serían unos 80px , pero sería un valor muy pequeño, tenemos que poner una escala


    this.level.grid.forEach(row => {
        let rowElement = createElement('tr');
        rowElement.style.height = SCALE + 'px';
        table.appendChild(rowElement);
        row.forEach(type => rowElement.appendChild(createElement('td', type)));

    });

    return table;
}

DomDisplay.prototype.drawActors = function () {
    let actorsWrap = createElement('div');   //Envolvemos cada actor en un div
    this.level.actors.map(actor => {
        let actorElement = createElement('div', `actor ${actor.type}`);
        let rect = actorsWrap.appendChild(actorElement);
        rect.style.width = actor.size.x * SCALE + 'px';
        rect.style.height = actor.size.y * SCALE + 'px';
        rect.style.left = actor.position.x * SCALE + 'px';
        rect.style.top = actor.position.y * SCALE + 'px';
      //  if (actor.type === 'player')
      //      actorElement.appendChild(createElement('img','playerchulo'));
        
    });

    return actorsWrap;
}

DomDisplay.prototype.drawFrame = function () {
    if (this.actorLayer) 
        this.wrap.removeChild(this.actorLayer);
    this.actorLayer = this.wrap.appendChild(this.drawActors());
    this.wrap.className = 'game ' + (this.level.status || '');

}
    
DomDisplay.prototype.clear = function () {
    this.wrap.parentNode.removeChild(this.wrap);
}
