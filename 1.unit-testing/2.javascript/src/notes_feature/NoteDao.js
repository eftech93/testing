class NoteDao{
    static notes = [];

    deleteAll(){
        const ids = NoteDao.notes.map(note => note.id);
        return ids;
    }

    findById(id){
        return NoteDao.notes.find(note => note.id === id);
    }

    findByMessage(message){
        return NoteDao.notes.find(note => note.message === message);
    }

    getAll(){
        return NoteDao.notes;
    }

    save(note){
        NoteDao.notes.push(note);
        return note;
    }
}

module.exports = NoteDao;