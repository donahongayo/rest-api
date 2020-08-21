import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';

import users from './routes/users';

const app = new Koa();

app.use(bodyParser());
app.use(users.routes());

const server = app.listen({ port: 5000 }, () => {
  mongoose.connect('mongodb://127.0.0.1:27017/docker-mongo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection err:'));
  db.once('open', () => {
    console.log('Database Connected');
  });
  console.log(`Server ready at http://localhost:5000/`);
});

export default server;
