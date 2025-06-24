const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send("I'm alive!");
});

app.listen(PORT, () => {
  console.log(`🌐 Fake web server running on port ${PORT}`);
});
