const express = require('express');
const app = express();


const PORT = 3001; 

app.listen(PORT, () => {
    console.log(`Inventory is running on port ${PORT}`);
});

module.exports = app;