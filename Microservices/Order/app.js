const express = require('express');
const app = express();


const PORT = 3002; 

app.listen(PORT, () => {
    console.log(`Order is running on port ${PORT}`);
});

module.exports = app;