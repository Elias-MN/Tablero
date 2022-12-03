let elementsCanvas = []
let id;
interact('.draggable').draggable({
    listeners: {
        start(event) {
            id = event.target.id;
        },
        move(event) {
            elementsCanvas[id].x += event.dx
            elementsCanvas[id].y += event.dy
            event.target.style.transform =
                `translate(${elementsCanvas[id].x}px, ${elementsCanvas[id].y}px)`
        },
    }
})

let elementID = 0;
function addElementToCanvas(event) {
    let draggableElement = document.createElement("div");
    let imgElement = document.createElement("img");

    draggableElement.classList.add("draggable");
    draggableElement.setAttribute("id", elementID);

    let imgSelected = event.src;
    imgElement.setAttribute("src", imgSelected);

    draggableElement.appendChild(imgElement);
    document.body.appendChild(draggableElement);

    let elementObj = {
        id: elementID,
        x: 0,
        y: 0
    }
    elementsCanvas.push(elementObj);
    elementID++;
}

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
function setCanvas() {
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    canvas.width = window.innerWidth;
    canvas.height = 600;
}

let initialPointX;
let initialPointY;
let finalPointX;
let finalPointY;
function drawLine() {
    context.beginPath();
    context.moveTo(initialPointX, initialPointY);
    context.lineTo(finalPointX, finalPointY);
    context.stroke();
}

let lineCounter = 1;
let painting = false;
let erasering = false;
let limitsCanvas = canvas.getBoundingClientRect();
function clickCanvas(event) {
    if (erasering == true && painting == false) {
        initialPointX = event.clientX - limitsCanvas.left;
        initialPointY = event.clientY - limitsCanvas.top;
        eraserPositionCanvas();
    }

    if (painting == true && erasering == false) {
        if (lineCounter == 1) {
            initialPointX = event.clientX - limitsCanvas.left;
            initialPointY = event.clientY - limitsCanvas.top;
            lineCounter = 2;
        } else {
            finalPointX = event.clientX - limitsCanvas.left;
            finalPointY = event.clientY - limitsCanvas.top;
            lineCounter = 1;
            drawLine();
        }
    }
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let elements = document.getElementsByClassName("draggable");
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }

}

const eraserElement = document.getElementById("eraser");
const eraserButton = document.getElementById("eraserButton");
const lineButton = document.getElementById("lineButton");
function activateEraser() {
    erasering == true ? erasering = false : erasering = true;
    if (painting) {
        painting = false;
        lineButton.classList.remove("activateButton");
    }
    eraserButton.classList.contains("activateButton") ? eraserButton.classList.remove("activateButton") : eraserButton.classList.add("activateButton");
    eraserElement.style.display == "block" ? eraserElement.style.display = "none" : eraserElement.style.display = "block";
}

function activateLine() {
    painting == true ? painting = false : painting = true;
    if (erasering) {
        erasering = false;
        eraserButton.classList.remove("activateButton");
        eraserElement.style.display = "none";
    }
    lineButton.classList.contains("activateButton") ? lineButton.classList.remove("activateButton") : lineButton.classList.add("activateButton");
}

let eraserWidth = 100;
let eraserHeight = 100;
function eraserPositionCanvas() {
    context.clearRect(initialPointX - 50, initialPointY - 50, eraserWidth, eraserHeight);
}

setCanvas();

let x, y;
canvas.addEventListener("mousemove", function (event) {
    if (erasering) {
        x = event.clientX - 50;
        y = event.clientY - 50;
        eraserElement.style.left = x + "px";
        eraserElement.style.top = y + "px";
    }
});
