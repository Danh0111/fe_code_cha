class urHandler {
    constructor() {
        this.undoStack = [];
        this.redoStack = [];
    }
    insert(state) {
        const data = JSON.parse(state)
        if(this.redoStack.length == 0){
            this.redoStack.push(data)
        }else{
            this.undoStack.push(this.redoStack[this.redoStack.length-1])
            this.redoStack.push(data)
        }
    }
    getPrevState() {
        if (this.undoStack.length >= 1) {
            let state = this.undoStack.splice(this.undoStack.length-1,1);
            console.log('st: ',state)
            this.redoStack.push(state[0]);
            return state
        }else if(this.undoStack.length == 0 && this.redoStack[this.redoStack.length - 1].length != 0){
            this.redoStack.push([])
            return [];
        }else if( this.undoStack.length == 0 && this.redoStack[this.redoStack.length - 1].length == 0){
            return 'Can not undo';
        }
    }
    getNextState() {
        if (this.redoStack.length >= 2 && this.redoStack.length - this.undoStack.length > 1) {
            let state = this.redoStack.splice(this.redoStack.length-1,1);
            console.log("sta: ",state)
            console.log(this.redoStack[this.redoStack.length - 1])
            if(state[0].length != 0 ){
                this.undoStack.push(state[0]);
            }
            return this.redoStack[this.redoStack.length - 1]
        }else if(this.redoStack.length >= 2 && this.redoStack.length - this.undoStack.length <= 1){
            return 'Can not redo'
        }
        else{
            return this.redoStack[this.redoStack.length - 1];
        }
    }
}

module.exports = new urHandler()