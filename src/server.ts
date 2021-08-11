import app, { init } from "./app";

const port = parseInt(process.env.PORT);

init().then(() => {
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
});
