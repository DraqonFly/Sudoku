import {Square} from "./Square.js";

class Grid {
    size;
    elem;
    squares;
    target;

    constructor() {
        this.elem = document.getElementsByClassName("grid")[0];
        this.size = 9;
        this.squares = new Array();
    }

    // Fill whole Grid
    fillGrid = () => {
        console.log("filling squares");
        //Iterate each square found in this Grid.
        [...document.getElementsByClassName('grid__square')].forEach( (square, id) => {
            this.squares.push(new Square(square, id))

            if(id < 5)
            this.squares[id].fillSquare()
        })

        this.squares.forEach(square => square.toString())
        this.toString();
    }

    // Visualize Each Group of Same Digits for 1 Second in Row.
    visualizeUniqueFields = () => {
        let loops = 0;
        let colors = ["#319921", "#6cfc55"]
        let interval = window.setInterval( () => {
            [...document.getElementsByClassName("grid__item")].forEach(item => {
                if(item.innerHTML === loops.toString()) {

                    if(item.innerHTML === "0") {
                        item.style.color = "pink";
                        item.style.background = "rgb(220, 110, 90)";
                    } else {
                        item.style.color = colors[1];
                        item.style.background = colors[0];
                    }

                    if(loops === 9 ) window.setTimeout(() => window.clearInterval(interval), 1000)
                } else {
                    if(item.style.color === "pink" ||item.style.color === "rgb(163, 147, 126)") {
                        item.style.background = "rgb(238, 185, 142)";
                        item.style.color =  "rgb(163, 147, 126)";
                    } else {
                        item.style.color = "black";
                        item.style.background = "#eb9c5c";
                    }
                }
            })
            loops++;
        }, 1000)
    }
    
    visualizeSameRow = (targetSquare) => {
        targetSquare.style.background = "rgb(190, 110, 90)";
        targetSquare.style.color = "whitesmoke";
        
        let squareClass;
        this.squares.forEach((square, id) => {
            if(square.elem === targetSquare)
            squareClass = square;
        })

        let loops = 0;
        let colors = ["#319921", "#6cfc55"]
        let interval = window.setInterval( () => {
            if(this.squares[loops])
            if(this.squares[loops].elem === targetSquare ||loops >= squareClass.id) {
                window.setTimeout( () =>{

                    console.warn("END")
                    this.squares.forEach((square, id) => {
                        if(id <= squareClass.id){
                            square.elem.style.background = "#eb9c5c";
                            square.elem.style.color = "black";
                        }
                    }, window.clearInterval(interval))
                }, 3000)
            }
            else {
                console.log("square-"+loops);
                let horizontalNeighbourFound = ((squareClass.id % 3 >= loops % 3) && ((loops + 3) > squareClass.id) );
                let verticalNeightbourFound = (squareClass.id % 3 === loops % 3);
                if(horizontalNeighbourFound || verticalNeightbourFound) {
                    this.squares[loops].elem.style.background = "rgb(255, 110, 90)";
                    this.squares[loops].elem.style.color = "white";
                }
            }
            loops++;
        }, 300)
    }


    // Generate a 9x9 Grid, holding 9 3x3 squares, like a Sudoku grid, really.
    generateGrid = () => {
        let itemCount = 0;
        // Iterate each row containing squares.
        for(let rowIteration=0; rowIteration<3; rowIteration++) {
            this.elem.appendChild(this.createElement('row')) // Append new row to this grid.

            // Iterate each square contained in a row.
            for(let squareIteration=0; squareIteration<3; squareIteration++) {
                let row = document.getElementsByClassName('grid__row')[rowIteration];
                row.appendChild(this.createElement('square', null, null, squareIteration + (3 *rowIteration))) // Append new square to this row.

                // Iterate each field contained in a square.
                for(let number=0; number<9; number++) {
                    let coordinates = { // Calculate coordinates for each field.
                        x: Math.floor((number%3) + (3 *squareIteration)),
                        y: (Math.floor(itemCount /3)%3) + (3 *rowIteration), 
                        square: squareIteration + (3 *rowIteration)
                    }

                    let square = document.getElementsByClassName('grid__row')[rowIteration].getElementsByClassName('grid__square')[squareIteration];
                    square.appendChild(this.createElement('item', coordinates.x, coordinates.y, coordinates.square )) // Append new field to this square.
                    itemCount++;
                }
            }
        }
    }

    // Creates an HTML-DIV-Element which optionally holds a TextNode 
    createElement = (type, x = null, y = null, s = null) => {
        var node = document.createElement('DIV');

        switch(type) { // Add node specific classname
            case 'square': node.classList.add('grid__square'); node.classList.add("s" + s); break;
            case 'row':node.classList.add('grid__row'); break;
            case 'item': node.classList.add("grid__item"); node.classList.add("s" + s); break;
        }
        if (type === 'item') { // Add item specific classnames
            node.appendChild(document.createTextNode("0"));
            node.classList.add("x" + x);
            node.classList.add("y" + y);
        }
        return node;
    }

    toString = (onlyReturn) => onlyReturn ? JSON.parse(JSON.stringify(this)) : console.log(JSON.parse(JSON.stringify(this)))
}

export let grid = new Grid();