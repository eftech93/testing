const express = require('express')
const NotesService = require('./NotesService');
const NoteDao = require('./NoteDao');

class NotesController{
    constructor(notesService){
        this.service = notesService;
    }

    getAllNotes = (req, res, next) =>{
        const allNotes = this.service.getAllNotes();
        res.status(200).json(allNotes);
    }

    getNote = (req, res, next) => {
        if(req.params.noteId === null || req.params.noteId === undefined || req.params.noteId.legth !== 37){
            res.status(400).send("Bad request");
            return;
        }
        try{
            const note = this.service.findNoteById(req.params.noteId);
            res.status(200).json(note);
        }catch(e){
            res.status(404).send("Not found");
            return;
        }
        
        res.status(200).json(note);
    }

    createNote = (req, res, next) => {
        if(req.params.noteId === null || req.params.noteId === undefined || req.params.noteId.legth !== 37){
            res.status(400).send("Bad request");
        }

    }

    deleteAllNotes = (req, res, next) => {
        const ids = this.service.deleteAllNotes();
        res.status(200).json(ids)
    }

    toRouter = () => {
        const router = express.Router();
        router.get('/', this.getAllNotes);
        router.get('/:noteId', this.getNote);
        router.post('/', this.createNote);
        router.delete('/', this.deleteAllNotes);
        return router;
    }
}


module.exports = {
    NotesController,
    router: new NotesController(new NotesService(new NoteDao())).toRouter()
}