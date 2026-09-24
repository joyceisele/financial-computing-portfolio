const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DB_FILE = './db.json';

function readDatabase() {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

function writeDatabase(data) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(data, null, 2)
  );
}

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'financial-computing-backend'
  });
});
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Name, email and password are required'
    });
  }

  const db = readDatabase();

  const existingUser = db.users.find(
    (user) => user.email === email
  );

  if (existingUser) {
    return res.status(409).json({
      message: 'User already exists'
    });
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    password
  };

  db.users.push(newUser);

  writeDatabase(db);

  res.status(201).json({
    message: 'Account created successfully'
  });
});
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const db = readDatabase();

  const user = db.users.find(
    (item) =>
      item.email === email &&
      item.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password'
    });
  }

  res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  });
});
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
app.get('/api/dashboard', (req, res) => {
  const db = readDatabase();

  res.json(db.dashboard);
});
app.get('/api/securities', (req, res) => {
  const db = readDatabase();
  res.json(db.securities);
});

app.get('/api/prices', (req, res) => {
  const db = readDatabase();
  res.json(db.prices);
});

app.get('/api/currencies', (req, res) => {
  const db = readDatabase();
  res.json(db.currencies);
});

app.get('/api/fx-rates', (req, res) => {
  const db = readDatabase();
  res.json(db.fxRates);
});