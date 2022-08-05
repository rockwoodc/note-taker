const express = require('express');
const PORT = process.env.PORT || 3004;
const app = express();










app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });