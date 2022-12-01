import routes from "./presentation/root.controller";

const express = require("express");
const app = express();
const port = 3000;

app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
