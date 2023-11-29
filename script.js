var canvas = new fabric.Canvas('c', {
    backgroundColor: 'rgb(100,100,200)'
    // selectionColor: 'red',
    // selectionLineWidth: 2
});

function showShapes() {
    var shapes = document.getElementById('shape-buttons');
    shapes.classList.toggle('hidden');
}

canvas.on('object:added',function(){
    if(!isRedoing){
        h = [];
    }
    isRedoing = false;
});
  
var isRedoing = false;
var h = [];

function undo(){
    if(canvas._objects.length>0){
        h.push(canvas._objects.pop());
        canvas.renderAll();
    }
}

function redo(){

if(h.length>0){
    isRedoing = true;
    canvas.add(h.pop());
}
}

function clearCanvas() {
    canvas.clear();
}

function add(type) {
    var shape;
    if(type === 1) {//rect
        shape = new fabric.Rect({
            width: 20, height: 20, fill: 'red', left: 100, top: 100
        });
    }else if(type === 2) {//tria
        shape = new fabric.Triangle({
            width: 20, height: 30, fill: 'red', left: 100, top: 100
        });
    }else if(type === 3) {//circ
        shape = new fabric.Circle({
            radius: 20, fill: 'red', left: 100, top: 100
        });
    }
    canvas.add(shape);
}

function save() {
    var json = canvas.toJSON();
}
// var triangle = new fabric.Triangle({
//     width: 20, height: 30, fill: 'blue', left: 50, top: 50
// });
// canvas.add(triangle);
var deleteIcon = "https://cdn.iconscout.com/icon/free/png-256/free-delete-737-475058.png";

  var img = document.createElement('img');
  img.src = deleteIcon;

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0,
    y: 0,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    cornerSize: 24
  });

  function deleteObject(eventData, transform) {
		var target = transform.target;
		var canvas = target.canvas;
		    canvas.remove(target);
        canvas.requestRenderAll();
	}

document.addEventListener('click', function() {
    var canvasButtons = document.getElementById('buttons');
    var shapeButtons = document.getElementById('shape-buttons');
    if(!canvasButtons.contains(event.target)) {
        if(canvas.getActiveObjects().size > 0) {

        }
    }
});