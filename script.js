window.addEventListener('load', function(){
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    canvas.width = 536;
    canvas.height = 536;
    function getPos(x, width){
        let s = 0;
        for(let i = 0; i<=x; i++){
            if(i == 0|| i == 3|| i == 6){
                s+=5;
                if(i == x)
                    break
            }  
            else{
                s+=2;
                if(i == x)
                    break
            }
            s += width
        }
        return s
    }
    class inputHandler{
        constructor(game, canvas){
            this.game = game
            this.canvas = canvas
            const btn = document.getElementById('check')
            const para = document.getElementById('result')
            if(!this.game.gameOver){
                this.canvas.addEventListener('click', (e)=>{
                    const rect = this.canvas.getBoundingClientRect()
                    const x = e.clientX - rect.left
                    const y = e.clientY - rect.top

                    const clickedCell = this.game.cells.find(cell => {
                        return x > getPos(cell.xpos, cell.width) &&
                            x < (getPos(cell.xpos, cell.width) + cell.width) &&
                            y > getPos(cell.ypos, cell.width) &&
                            y < (getPos(cell.ypos, cell.width) + cell.width)
                    })

                    if(!clickedCell) return

                    const clickedIndexes = [clickedCell.xpos, clickedCell.ypos]

                    if(this.game.selectedCellIndexes[0] === clickedIndexes[0] && this.game.selectedCellIndexes[1] === clickedIndexes[1]){
                        this.game.selectedCellIndexes = []
                    } else {
                        this.game.selectedCellIndexes = clickedIndexes
                    }
                })

                window.addEventListener('keydown', (e)=>{
                    if(e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0')
                        this.game.keys.push(e.key);
                });
                window.addEventListener('keyup', e=>{
                    if(this.game.keys.indexOf(e.key) > -1){
                        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
                    }
                });
            }
            btn.addEventListener('click', (e)=>{
                for(let i = 0; i<9; i++){
                    for(let j = 0; j<9; j++){
                        if(this.game.data[i][j] !== this.game.solution[i][j]){
                            this.game.lost = true;
                            this.game.gameOver = true;
                            para.innerHTML = 'You Lost! Refresh to try again'
                            break;
                        }
                    }
                }
                if(!this.game.lost)
                    para.innerHTML = 'You Win!'
            })
        }
    }
    class cell{
        constructor(game, xpos, ypos){
            this.game = game;
            this.width = 56;
            this.xpos = xpos;
            this.ypos = ypos;
        }

        draw(context){
            const isSelected = this.game.selectedCellIndexes[0] === this.xpos && this.game.selectedCellIndexes[1] === this.ypos
            context.fillStyle = isSelected ? '#003C7A' : '#25232F';
            context.fillRect(getPos(this.xpos, this.width), getPos(this.ypos, this.width), this.width, this.width);
            context.fillStyle = 'white'
            context.font = "30px Helvetica"
            if(this.game.data[this.ypos][this.xpos])
                context.fillText(this.game.data[this.ypos][this.xpos], getPos(this.xpos, this.width) + 20, getPos(this.ypos, this.width) + 40)
        }
    }
    
    class Game{
        constructor(width, height, canvas){
            this.width = width;
            this.height = height;
            this.cells = [];
            this.keys = [];
            this.selectedCellIndexes = []
            this.input = new inputHandler(this, canvas)
            this.constdata = [ 
                [0, 0, 0, 3, 0, 0, 0, 6, 0],
                [0, 6, 4, 0, 0, 1, 0, 2, 0],
                [0, 0, 0, 5, 0, 0, 0, 0, 0],
                [0, 2, 3, 0, 5, 0, 6, 0, 0],
                [0, 0, 9, 8, 0, 3, 7, 0, 0],
                [0, 0, 8, 0, 9, 0, 1, 4, 0],
                [0, 0, 0, 0, 0, 9, 0, 0, 0],
                [0, 1, 0, 4, 0, 0, 8, 9, 0],
                [0, 5, 0, 0, 0, 7, 0, 0, 0]
            ];
            this.data = [ 
                [0, 0, 0, 3, 0, 0, 0, 6, 0],
                [0, 6, 4, 0, 0, 1, 0, 2, 0],
                [0, 0, 0, 5, 0, 0, 0, 0, 0],
                [0, 2, 3, 0, 5, 0, 6, 0, 0],
                [0, 0, 9, 8, 0, 3, 7, 0, 0],
                [0, 0, 8, 0, 9, 0, 1, 4, 0],
                [0, 0, 0, 0, 0, 9, 0, 0, 0],
                [0, 1, 0, 4, 0, 0, 8, 9, 0],
                [0, 5, 0, 0, 0, 7, 0, 0, 0]
            ];
            this.solution = [ 
                [7, 9, 5, 3, 2, 8, 4, 6, 1],
                [8, 6, 4, 9, 7, 1, 3, 2, 5],
                [2, 3, 1, 5, 4, 6, 9, 7, 8],
                [1, 2, 3, 7, 5, 4, 6, 8, 9],
                [6, 4, 9, 8, 1, 3, 7, 5, 2],
                [5, 7, 8, 6, 9, 2, 1, 4, 3],
                [4, 8, 7, 2, 3, 9, 5, 1, 6],
                [3, 1, 2, 4, 6, 5, 8, 9, 7],
                [9, 5, 6, 1, 8, 7, 2, 3, 4]
            ];
            for(let i = 0; i<9; i++){
                for(let j = 0; j<9; j++){
                    this.cells.push(new cell(this, j, i))
                }
            }
            this.lost = false;
            this.gameOver = false;
        }
        
        draw(context){
            this.cells.forEach(cell =>{
                cell.draw(context)
            })
            
        }
        update(){
            // Input is handled by the canvas click listener.
            //console.log(this.keys)
            if(this.selectedCellIndexes.length>0 && this.keys.length>0 && this.constdata[this.selectedCellIndexes[1]][this.selectedCellIndexes[0]] === 0){
                this.data[this.selectedCellIndexes[1]][this.selectedCellIndexes[0]] = Number(this.keys[0])
                console.log(this.data[this.selectedCellIndexes[0]][this.selectedCellIndexes[1]])
            }

        }
    }
    const game = new Game(canvas.width, canvas.height, canvas)
    function animate(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    
    animate();
});
