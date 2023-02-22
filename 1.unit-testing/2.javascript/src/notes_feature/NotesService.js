const Note = require('./Note');

class NotesService {
    
    constructor(noteDao){
        this.dao = noteDao;
    }

    getAllNotes(){
        return this.dao.getAll();
    }

    findNoteById(id){
        const note = this.dao.findById(id);
        if(note === null || note === undefined){
            throw new Error("Not found");
        }
        return note;
    }

    saveNote(message){
        const existingNote = this.dao.findByMessage(message);
        if(existingNote !== null && existingNote !== undefined){
            throw new Error("Cannot perform action")
        }
        const newNote = new Note(message);
        this.dao.save(newNote);
        return newNote;
    }

    deleteAllNotes(){
        const ids = this.dao.deleteAll();
        return ids;
    }
}


module.exports = NotesService;