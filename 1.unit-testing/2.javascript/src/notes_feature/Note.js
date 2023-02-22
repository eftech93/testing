class Note{
    constructor(message){
        this.id = (Math.random() + 1).toString(36);
        this.message = message;
        this.date = new Date().toISOString();
    }
}


module.exports = Note;