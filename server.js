const express = require('express');
const { process_params } = require('express/lib/router');

const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// this starts the express server
app.listen(PORT, () => {
    console.log(`Server ONLINE listening to ${PORT}`);
});

// for when the user makes a GET request to the server but that isn't supported by the app
app.use((req, res) => {
    res.status(404).end();
});

// when the user connects to the server, they will see this message
app.get('/', (req, res) => {
    res.json({message: 'Monkey Time!'});
});

