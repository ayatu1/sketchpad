var canvas = document.getElementById('canvas')
canvas.height = document.documentElement.clientHeight
canvas.width = document.documentElement.clientWidth

window.onresize = function () {
    var canvas = document.getElementById('canvas')
    canvas.height = document.documentElement.clientHeight
    canvas.width = document.documentElement.clientWidth
}

var context = canvas.getContext('2d');
var oldCoordinate = null
var newCoordinate = null
var isStart = false
var isPainting = false

canvas.onmousedown = function (event) {
    if(isStart) {
        isPainting = true
        oldCoordinate = {
            x: event.clientX,
            y: event.clientY
        }
        context.beginPath();
        context.lineWidth = 3
        context.moveTo(oldCoordinate.x, oldCoordinate.y)
    }
}
canvas.onmousemove = function () {
    if(isPainting) {
        newCoordinate = {
            x: event.clientX,
            y: event.clientY
        }
        //记录当前坐标，开始画线
        context.lineTo(newCoordinate.x, newCoordinate.y)
        context.stroke();
        oldCoordinate = newCoordinate
    }
    //
    // console.log(2)
}
canvas.onmouseup = function () {
    isPainting = false
}
var brush = document.getElementById('brush')
var rubber = document.getElementById('rubber')
var save = document.getElementById('save')
brush.onclick = function () {
    isStart = true
    brush.classList.add('active')
    rubber.classList.remove('active')
    save.classList.remove('active')
}
rubber.onclick = function () {
    isStart = false
    rubber.classList.add('active')
    brush.classList.remove('active')
    save.classList.remove('active')
}
save.onclick = function () {
    isStart = false
    save.classList.add('active')
    brush.classList.remove('active')
    rubber.classList.remove('active')

}
var black = document.getElementById('black')
var red = document.getElementById('red')
var blue = document.getElementById('blue')
black.onclick = function () {
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    black.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    black.classList.remove('active')
    red.classList.remove('active')
}


