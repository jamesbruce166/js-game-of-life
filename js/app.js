const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const gridLength = 600;
const gridPixels = 90;
const pixelSize = gridLength / gridPixels;
let grid = [];
let nextGen = [];

function runMain() {
	layoutGrid(true);
	draw();

	setInterval(nextFrame, 330);
}

function nextFrame() {
	for (let i = 0; i < grid.length; i++) {
		nextGen[i] = grid[i].slice();
		for (let j = 0; j < grid[i].length; j++) {
			update(i, j);
		}
	}
	grid = nextGen.slice();
	draw();
}

function update(i, j) {
	// Any live cell with fewer than two live neighbours dies, as if by underpopulation.
	if (isAlive(i, j) && neighbours(i, j) < 2) {
		nextGen[i][j] = 0;
	}
	// Any live cell with two or three live neighbours lives on to the next generation.
	else if (
		isAlive(i, j) &&
		(neighbours(i, j) === 2 || neighbours(i, j) === 3)
	) {
		nextGen[i][j] = 1;
	}
	// Any live cell with more than three live neighbours dies, as if by overpopulation.
	else if (isAlive(i, j) && neighbours(i, j) > 3) {
		nextGen[i][j] = 0;
	}
	// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
	else if (!isAlive(i, j) && neighbours(i, j) === 3) {
		nextGen[i][j] = 1;
	}
}

function neighbours(i, j) {
	return (
		isAlive(i - 1, j) + // left
		isAlive(i + 1, j) + // right
		isAlive(i, j - 1) + // top
		isAlive(i, j + 1) + // bottom
		isAlive(i - 1, j - 1) + // top left
		isAlive(i + 1, j + 1) + // bottom right
		isAlive(i - 1, j + 1) + // bottom left
		isAlive(i + 1, j - 1) // top right
	);
}

function isAlive(i, j) {
	return i < 0 || j < 0 || i > gridPixels - 1 || i > gridPixels - 1
		? Number(0)
		: Number(grid[i][j]);
}

function layoutGrid(isRandom) {
	for (let i = 0; i < gridPixels; i++) {
		for (let j = 0; j < gridPixels; j++) {
			if (!grid[i]) grid[i] = [];
			grid[i][j] = isRandom ? Math.round(Math.random()) : 0;
		}
	}
}

function draw() {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] == 1) {
				drawPixel(i, j);
			} else {
				clearPixel(i, j);
			}
		}
	}
}

function drawPixel(x, y) {
	ctx.fillStyle = 'rgb(230,0,0)';
	ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

function clearPixel(x, y) {
	ctx.fillStyle = 'rgb(0,0,0)';
	ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

runMain();
