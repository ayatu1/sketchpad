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
var isUsing = false
var useRubber = false

//选择工具
changeTool()
//切换画笔颜色
changeColor()

if('ontouchstart' in window) {
    canvas.ontouchstart = function (event) {
        console.log(event)
        isUsing = true
        oldCoordinate = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        }
        if(useRubber) {
            context.clearRect(oldCoordinate.x, oldCoordinate.y, 30, 30)
        }
    }
    canvas.ontouchmove = function () {
        newCoordinate = {
            x: event.touches[0].clientX,
            y: event.touches[0].clientY
        }
        if(isUsing) {
            if(useRubber) {
                context.clearRect(newCoordinate.x, newCoordinate.y, 30, 30)
            } else {
                //记录当前坐标，开始画线
                drawLine(oldCoordinate.x, oldCoordinate.y, newCoordinate.x, newCoordinate.y)
                oldCoordinate = newCoordinate
            }
        }
    }
    canvas.ontouchend = function () {
        isUsing = false
    }
} else {
    canvas.onmousedown = function (event) {
        isUsing = true
        oldCoordinate = {
            x: event.clientX,
            y: event.clientY
        }
        if(useRubber) {
            context.clearRect(oldCoordinate.x, oldCoordinate.y, 30, 30)
        }
    }
    canvas.onmousemove = function () {
        newCoordinate = {
            x: event.clientX,
            y: event.clientY
        }
        if(isUsing) {
            if(useRubber) {
                context.clearRect(newCoordinate.x, newCoordinate.y, 30, 30)
            } else {
                //记录当前坐标，开始画线
                drawLine(oldCoordinate.x, oldCoordinate.y, newCoordinate.x, newCoordinate.y)
                oldCoordinate = newCoordinate
            }
        }
    }
    canvas.onmouseup = function () {
        isUsing = false
    }
}

function drawLine(x1, y1, x2, y2) {
    console.log(3)
    context.beginPath();
    context.lineWidth = 3
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke();
    context.closePath()
}

function changeColor() {
    var black = document.getElementById('black')
    var red = document.getElementById('red')
    var blue = document.getElementById('blue')
    black.onclick = function () {
        useRubber = false
        rubber.classList.remove('active')
        context.strokeStyle = 'black'
        black.classList.add('active')
        red.classList.remove('active')
        blue.classList.remove('active')
    }
    red.onclick = function () {
        useRubber = false
        rubber.classList.remove('active')

        context.strokeStyle = 'red'
        red.classList.add('active')
        black.classList.remove('active')
        blue.classList.remove('active')
    }
    blue.onclick = function () {
        useRubber = false
        rubber.classList.remove('active')

        context.strokeStyle = 'blue'
        blue.classList.add('active')
        black.classList.remove('active')
        red.classList.remove('active')
    }
}

function changeTool() {
    var brush = document.getElementById('brush')
    var rubber = document.getElementById('rubber')
    var save = document.getElementById('save')
    brush.onclick = function () {
        useRubber = false
        brush.classList.add('active')
        rubber.classList.remove('active')
        save.classList.remove('active')
    }
    rubber.onclick = function () {
        useRubber = true
        rubber.classList.add('active')
        brush.classList.remove('active')
        save.classList.remove('active')
    }
    save.onclick = function () {
        useRubber = false
        save.classList.add('active')
        brush.classList.remove('active')
        rubber.classList.remove('active')

        var strDataURI = canvas.toDataURL("image/png")
        var a = document.createElement('a')
        document.body.appendChild(a)
        a.href = strDataURI
        a.download = 'pad'
        a.click()
    }
}
