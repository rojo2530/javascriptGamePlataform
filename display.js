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