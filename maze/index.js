const { 
  Engine, 
  Render, 
  Runner, 
  World, 
  Bodies,
  Body,
  Events
} = Matter;

const width = window.innerWidth*0.97;
const height = window.innerHeight*0.97;

const cellsHorizontal = 8;
const cellsVertical = 8;

const unitLengthX = width/cellsHorizontal;
const unitLengthY = height/cellsVertical;

const engine = Engine.create();
engine.world.gravity.y = 0;
const { world } = engine;

const render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    wireframes : true,
    width,
    height
  }
});
Render.run(render);
Runner.run(Runner.create(), engine);


// Walls
const walls = [
  Bodies.rectangle(width/2, 0, width, 2, {isStatic: true}),  // Top
  Bodies.rectangle(width/2, height, width, 2, {isStatic: true}), // Bottom
  Bodies.rectangle(0, height/2, 2, height, {isStatic: true}),  // Left
  Bodies.rectangle(width, height/2, 2, height, {isStatic: true}),  // Right
]
World.add(world, walls);


// Maze Generation

const shuffle = (arr) => {
  let counter = arr.length;

  while (counter > 0) {
    const index = Math.floor(Math.random() * counter);
    
    counter --;
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }

  return arr;
}

const grid = Array(cellsVertical).fill().map(() => Array(cellsHorizontal).fill(false));

const verticals = Array(cellsVertical).fill().map(() => Array(cellsHorizontal-1).fill(false));
const horizontals = Array(cellsVertical-1).fill().map(() => Array(cellsHorizontal).fill(false));

const startRow = Math.floor(Math.random() * cellsVertical)
const startColumn = Math.floor(Math.random() * cellsHorizontal)

const stepThroughCell = (row, column) => {
  // If I have visited the cell at [row, column], then return
  if(grid[row][column])
    return;

  // Mark this cell as being visited
  grid[row][column] = true

  // Assemble randomly-ordered list of neighbors
  const neighbors = shuffle([
    [row - 1, column, 'up'],     // Above
    [row, column + 1, 'right'],  // Right
    [row + 1, column, 'down'],   // Down
    [row, column - 1, 'left'],   // Left
  ])

  // For each neighbor...
  for (let neighbor of neighbors) {
    const [nextRow, nextColumn, direction] = neighbor
    
    // See if that neighbor is out of bounds
    if (nextRow < 0 || nextRow >= cellsVertical || nextColumn < 0 || nextColumn >= cellsHorizontal )
      continue;

    // If we have visited that neighbor, continue to next neighbor
    if (grid[nextRow][nextColumn])
      continue;

    // Remove a wall from either horizontals or verticals
    if(direction === 'left') {
      verticals[row][column - 1] = true;
    } else if (direction === 'right') {
        verticals[row][column] = true;
    }

    if(direction === 'up') {
      horizontals[row - 1][column] = true;
    } else if (direction === 'down') {
      horizontals[row][column] = true;
    }

    // Visit that next cell
    stepThroughCell(nextRow, nextColumn)
   }

}

stepThroughCell(startRow, startColumn)

horizontals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if(open)
      return;

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX / 2,
      rowIndex * unitLengthY + unitLengthY,
      unitLengthX,
      10,
      {
        label: 'wall',
        isStatic: true,
        render: {
          fillStyle: 'red'
        }
      }
    );
    World.add(world, wall)
  })
})

verticals.forEach((row, rowIndex) => {
  row.forEach((open, columnIndex) => {
    if(open)
      return;

    const wall = Bodies.rectangle(
      columnIndex * unitLengthX + unitLengthX,
      rowIndex * unitLengthY + unitLengthY / 2,
      10,
      unitLengthY,
      {
        label: "wall",
        isStatic : true,
        render: {
          fillStyle : 'red',
        }
      }
    );
    World.add(world, wall)
  })
})

// Goal

const goal = Bodies.rectangle(
  width - unitLengthX /2,
  height - unitLengthY /2,
  unitLengthX * 0.7,
  unitLengthY * 0.7,
  { 
    isStatic : true, 
    label : 'goal', 
    render: {
      fillStyle: 'green'
    }
}
)
World.add(world, goal)

// Ball

const ball = Bodies.circle(
  unitLengthX / 2,
  unitLengthY / 2,
  Math.min(unitLengthX, unitLengthY) / 4,
  { 
    isStatic : false, 
    label : 'ball',
    render: {
      fillStyle : 'blue'
    }
  }
)
World.add(world, ball)

document.addEventListener('keydown', event => {
  const {x,y} = ball.velocity;
  if(event.key === "w" || event.key === "ArrowUp"){
    Body.setVelocity(ball, {x, y: y - 5 })
  }
  if(event.key === "a" || event.key === "ArrowLeft"){
    Body.setVelocity(ball, {x: x - 5, y })
  }
  if(event.key === "s" || event.key === "ArrowDown"){
    Body.setVelocity(ball, {x, y: y + 5 })
  }
  if(event.key === "d" || event.key === "ArrowRight"){
    Body.setVelocity(ball, {x: x + 5, y })
  }
})

// Win Condition

Events.on(engine, 'collisionStart', event => {
  event.pairs.forEach(collision => {
    const labels = ['ball', 'goal']

    if(
      labels.includes(collision.bodyA.label) && 
      labels.includes(collision.bodyB.label)
    ) {
      document.querySelector('.winner').classList.remove('hidden')
      world.gravity.y = 1;
      world.bodies.forEach(body => {
        if(body.label === 'wall'){
          Body.setStatic(body, false)
        }
    })
    }
  })
})