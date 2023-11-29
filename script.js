var canvas = new fabric.Canvas('c', {
    backgroundColor: '#FFFFFF'
    // selectionColor: 'red',
    // selectionLineWidth: 2
});

var shapeColor = 'red';

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
    canvas.backgroundColor = document.getElementById('bgColor').value;
}

function add(type) {
    var shape;
    if(type === 1) {//rect
        shape = new fabric.Rect({
            width: 20, height: 20, fill: shapeColor, left: 100, top: 100, cornerStyle: 'circle', cornerColor: '#00000', cornerStrokeColor: '#FFFFFF', transparentCorners: false, padding: 10
        });
    }else if(type === 2) {//tria
        shape = new fabric.Triangle({
            width: 20, height: 30, fill: shapeColor, left: 100, top: 100, cornerStyle: 'circle', cornerColor: '#00000', cornerStrokeColor: '#FFFFFF', transparentCorners: false, padding: 10
        });
    }else if(type === 3) {//circ
        shape = new fabric.Circle({
            radius: 20, fill: shapeColor, left: 100, top: 100, cornerStyle: 'circle', cornerColor: '#00000', cornerStrokeColor: '#FFFFFF', transparentCorners: false, padding: 10
        });
    }
    canvas.add(shape);
}

function save() {
    // Get the canvas data URL
    var dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1
    });
  
    // Create a link element
    var link = document.createElement('a');
    link.href = dataURL;
  
    // Set the file name (you can customize this)
    link.download = 'canvas_image.png';
  
    // Append the link to the body
    document.body.appendChild(link);
  
    // Trigger a click on the link to start the download
    link.click();
  
    // Remove the link from the body
    document.body.removeChild(link);
  }

function penMode() {
    if(canvas.isDrawingMode === true) {
        canvas.isDrawingMode = false;
    }else canvas.isDrawingMode = true;
}

function updateShapeColor(value) {
    shapeColor = value;
    canvas.freeDrawingBrush.color = value;
}

function updateBGColor(value) {
    canvas.backgroundColor = value;
    canvas.renderAll();
}

// var triangle = new fabric.Triangle({
//     width: 20, height: 30, fill: 'blue', left: 50, top: 50
// });
// canvas.add(triangle);
var deleteIcon = "https://cdn.iconscout.com/icon/free/png-256/free-delete-737-475058.png";

  var deleteImg = document.createElement('img');
  deleteImg.src = deleteIcon;

function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
        var size = this.cornerSize;
        ctx.save();
        ctx.translate(left, top);
        ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
        ctx.drawImage(icon, -size/2, -size/2, size, size);
        ctx.restore();
    }
}

fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.7,
    y: -0.7,
    offsetY: 16,
    cursorStyle: 'pointer',
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24
  });

  function deleteObject(eventData, transform) {
		var target = transform.target;
		var canvas = target.canvas;
		    canvas.remove(target);
        canvas.requestRenderAll();
	}