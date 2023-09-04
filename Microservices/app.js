const express = require('express');
const app = express();
const User = require('./User/app');
const Order = require('./Order/app');
const Inventory = require('./Inventory/app');

const PORT = 3000; // Define which port to run the server (npm run dev)

// Start MicroserviceA, MicroserviceB, and MicroserviceC
app.use('/user', User);
app.use('/order', Order);
app.use('/inventory', Inventory);



app.listen(PORT, () => {
    console.log(`Main Server is running on port ${PORT}`);
});