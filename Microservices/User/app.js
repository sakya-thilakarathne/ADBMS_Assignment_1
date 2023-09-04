const express = require('express');
const app = express();


const PORT = 3003; 

app.listen(PORT, () => {
    console.log(`User is running on port ${PORT}`);
});

module.exports = app;