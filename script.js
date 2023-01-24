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

function drawText() {
    context.font = "15px Arial";
    let arrayOfLines = inputText.value.split("\n");
    let distanceLines = 0;
    arrayOfLines.forEach(linea => {
        context.fillText(linea, initialPointX, initialPointY + distanceLines);
        distanceLines = distanceLines + 20;
    });
}

let lineCounter = 1;
let painting = false;
let erasering = false;
let writting = false;
let limitsCanvas = canvas.getBoundingClientRect();
const inputText = document.getElementById("inputText");
function clickCanvas(event) {
    if (painting == false && erasering == true && writting == false) {
        initialPointX = event.clientX - limitsCanvas.left;
        initialPointY = event.clientY - limitsCanvas.top;
        eraserPositionCanvas();
    }
    if (painting == true && erasering == false && writting == false) {
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
    if (painting == false && erasering == false && writting == true) {
        initialPointX = event.clientX - limitsCanvas.left;
        initialPointY = event.clientY - limitsCanvas.top;
        drawText();
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
const textButton = document.getElementById("textButton");
function activateEraser() {
    erasering == true ? erasering = false : erasering = true;
    if (painting) {
        desactivatePainting();
    }
    if (writting) {
        desactivateWritting();
    }
    eraserButton.classList.contains("activateButton") ? eraserButton.classList.remove("activateButton") : eraserButton.classList.add("activateButton");
    eraserElement.style.display == "block" ? eraserElement.style.display = "none" : eraserElement.style.display = "block";
}

function activatePainting() {
    painting == true ? painting = false : painting = true;
    if (erasering) {
        desactivateEraser();
    }
    if (writting) {
        desactivateWritting();
    }
    lineButton.classList.contains("activateButton") ? lineButton.classList.remove("activateButton") : lineButton.classList.add("activateButton");
}

function activateText() {
    writting == true ? writting = false : writting = true;
    if (painting) {
        desactivatePainting();
    }
    if (erasering) {
        desactivateEraser();
    }
    textButton.classList.contains("activateButton") ? textButton.classList.remove("activateButton") : textButton.classList.add("activateButton");

}

function desactivateEraser() {
    erasering = false;
    eraserButton.classList.remove("activateButton");
    eraserElement.style.display = "none";
}

function desactivatePainting() {
    painting = false;
    lineButton.classList.remove("activateButton");
}

function desactivateWritting() {
    writting = false;
    textButton.classList.remove("activateButton");
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

