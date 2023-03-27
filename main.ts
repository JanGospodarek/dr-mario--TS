class Game{
    private boardCon=<HTMLDivElement>document.getElementById('board')
    constructor(){
        this.renderBoard()
        this.renderPionek()
    }
    private renderBoard(){
        
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 8; x++) {
                const div=document.createElement('div')
                div.classList.add('cell')
                div.style.left=`${20*x}px`
                div.style.top=`${20*y}px`
                this.boardCon.append(div)
            }
            
        }
    }
    renderPionek(){
        const pionek=new Pionek(this.boardCon)
    }


}
class Pionek{
    boardDiv:HTMLDivElement
    pionek:HTMLDivElement
    movingInterval:any
    constructor(boardDiv:HTMLDivElement){
        this.boardDiv=boardDiv
        this.buildPionek()
        this.moving()
    }
    buildPionek(){
        this.pionek=document.createElement('div')
        const cell1=document.createElement('div')
        const cell2=document.createElement('div')
        cell1.style.backgroundColor='red'
        cell2.style.backgroundColor='blue'
        this.pionek.classList.add('pionek')
        cell1.classList.add('pionek-cell')
        cell2.classList.add('pionek-cell')
        this.pionek.append(cell1)
        this.pionek.append(cell2)
        this.pionek.style.left='60px'
        this.boardDiv.append(this.pionek)
        
    }
    moving(){
        let i=0
       this.movingInterval= setInterval(()=>{
        console.log(20*this.movingInterval);
        
        this.pionek.style.top=`${20*i}px`
        i++
       },400)
    }
}
const game=new Game()
