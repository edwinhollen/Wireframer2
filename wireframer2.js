'use strict';
const el_canvas = document.querySelector('#canvas');
const btn_undo = document.querySelector('#btn_undo');
const btn_clear = document.querySelector('#btn_clear');
const btn_expand = document.querySelector('#btn_expand');
const btn_shrink = document.querySelector('#btn_shrink');

el_canvas.width = 320;
el_canvas.height = 480;

let dotSpacing = 16;
let isMouseDown = false;

const shapes = [];
const undoStack = [];

let render = function() {
	const ctx = el_canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'hsl(0, 0%, 80%)';
	for (let y = dotSpacing; y < el_canvas.height; y += dotSpacing) {
		for (let x = dotSpacing; x < el_canvas.width; x += dotSpacing) {
			ctx.beginPath();
			ctx.arc(x, y, 1, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();
		}
	}
	shapes.forEach(shape => {
		ctx.fillStyle = 'hsl(0, 0%, 0%)';
		ctx.beginPath();
		ctx.rect(shape.x * dotSpacing, shape.y * dotSpacing, shape.width * dotSpacing, shape.height * dotSpacing);
		ctx.stroke();
		ctx.closePath();
	});
};

// Event handlers
// Canvas mouse down
el_canvas.addEventListener('mousedown', e => {
	if (e.button !== 0) return; // Ignore non-left click
	const x = e.offsetX;
	const y = e.offsetY;

	shapes.push({
		x: (Math.round(x / dotSpacing) * dotSpacing) / dotSpacing,
		y: (Math.round(y / dotSpacing) * dotSpacing) / dotSpacing,
	});
	isMouseDown = true;
	render();
});
// Canvas mouse move
el_canvas.addEventListener('mousemove', e => {
	if (!isMouseDown) return;
	shapes.slice(-1)[0].width = (Math.round(e.offsetX / dotSpacing) - shapes.slice(-1)[0].x);
	shapes.slice(-1)[0].height = (Math.round(e.offsetY / dotSpacing) - shapes.slice(-1)[0].y);
	render();
});
// Canvas mouse up
el_canvas.addEventListener('mouseup', e => {
	isMouseDown = false;
	render();
});
// Undo button
btn_undo.addEventListener('click', e => {
	if (shapes.length < 1) return;
	shapes.pop();
	render();
});
// Clear button
btn_clear.addEventListener('click', e => {
	while (shapes.length > 0) shapes.pop();
	render();
});
// Expand button
btn_expand.addEventListener('click', e => {
	el_canvas.width += dotSpacing;
	el_canvas.height += dotSpacing;
	render();
});

// Shrink button
btn_shrink.addEventListener('click', e => {
	el_canvas.width -= dotSpacing;
	el_canvas.height -= dotSpacing;
	render();
});
render();
