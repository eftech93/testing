const express = require('express');
const { router : notesRoutes } = require('./src/notes_feature/NotesController');
const app = express();
const PORT = 3000;

app.use('/api/notes', notesRoutes);

app.use('/*', (req, res, next) => {
    console.log(`[APP][REQ][${req.path}]`);
    next();
});

app.listen(PORT, () => {
    console.log(`[SERVER][PORT][${PORT}]`);
});