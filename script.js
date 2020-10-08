document.addEventListener('DOMContentLoaded', () => {
    const brush = {
        active: false,
        move: false,
        pos: {x: 0, y: 0},
        prevPos: null
    }

    const screen = document.querySelector('#screen');
    const context = screen.getContext('2d');

    screen.width = 700;
    screen.height = 500;

    context.lineWidth = 7; //Espessura do traço
    context.strokeStyle = "red"; //Cor dos traços

    const drawLine = (line) => {
        context.beginPath();
        context.moveTo(line.prevPos.x, line.prevPos.y);
        context.lineTo(line.pos.x, line.pos.y);
        context.stroke();
    }
    // drawLine({pos: {x:350, y: 250}, prevPos:{x: 10, y:10}})

    screen.onmousedown = (event) => {brush.active = true};
    screen.onmouseup = (event) => {brush.active = false};

    screen.onmousemove = (event) => {
        brush.pos.x = event.clientX
        brush.pos.y = event.clientY
        brush.move = true
    }

    const cycle = () => {
        if(brush.active && brush.move && brush.prevPos){
            drawLine({pos: brush.pos, prevPos: brush.prevPos})
            brush.move = false;
        }
        brush.prevPos = {x: brush.pos.x, y: brush.pos.y}

        setTimeout(cycle, 10);
    }
    cycle()
})