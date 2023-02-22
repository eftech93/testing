const NotesService = require('../../notes_feature/NotesService');
const NoteDao = require('../../notes_feature/NoteDao');
const Note = require('../../notes_feature/Note');

describe("Test Suite - Testing Service", ()=>{
    describe("Test Suite - Errors", () => {
        const dao = new NoteDao();
        const service = new NotesService(dao);
        test('Note not found', () => {
            dao.findById = jest.fn((id) => null);
            expect(() => {
                service.findNoteById("dfghj");
            }).toThrow(Error("Not found"));
        });

        test('Note already exist', () => {
            dao.findByMessage = jest.fn((message) => new Note(message)) // simulate that there's already an element with that message
            expect(() =>{
                service.saveNote("my message");
            }).toThrow(Error("Cannot perform action"));
        });
    });

    describe("Test Suite - Happy paths", ()=> {
        const dao = new NoteDao();
        const service = new NotesService(dao);

        test('Save new note', () => {
            dao.findByMessage = jest.fn((message) => undefined);
            dao.save = jest.fn((note) => note);
            const message = "my message";
            const storedNote = service.saveNote(message);

            expect(dao.findByMessage.mock.calls).toHaveLength(1);
            expect(dao.findByMessage.mock.calls[0][0]).toBe(message);

            expect(dao.save.mock.calls).toHaveLength(1);
            expect(dao.save.mock.calls[0][0].message).toBe(message);

            expect(storedNote.message).toBe(message);
        });
        /* test('Get All notes', () => {

        });*/ 
    });
});