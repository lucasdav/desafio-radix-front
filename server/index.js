import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import validateRegistrationData from './validators/validateRegistrationData.js';

const app = express();
const port = 3002;
const baseDir = './build/';

app.use(express.static(baseDir));
app.use('/assets', express.static(path.join(baseDir, 'assets')));
app.use(bodyParser.json());
app.use(cors());

app.get('/registration', (_, res) => {
  res.sendFile('index.html', { root: baseDir });
});

app.post('/registration', validateRegistrationData, (req, res) => {
  console.log(req.body);
  res.send({ message: 'Data received', data: req.body });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});