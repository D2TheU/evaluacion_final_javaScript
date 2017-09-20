var teclas = document.getElementsByClassName('tecla');

var mouseDownFunc = function() {
    console.log("Mouse down on:");
    console.log(this);
    this.style.transform = "scale(0.95)"
}
var mouseUpFunc = function() {
    console.log("Mouse up on:");
    console.log(this);
    this.style.transform = "scale(1)"
}

for (var i = 0; i < teclas.length; i++) {
    teclas[i].addEventListener('mousedown', mouseDownFunc)
    teclas[i].addEventListener('mouseup', mouseUpFunc)
}
