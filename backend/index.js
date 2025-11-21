const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Завантажує змінні з .env

const app = express();
const port = process.env.PORT || 3000; // Порт з налаштувань або 3000 за замовчуванням

// Визначаємо список дозволених доменів
// У реальному житті цю адресу теж краще виносити в .env, але поки пропишемо тут
const allowedOrigins = [
  'https://victorious-mud-014ec2603.3.azurestaticapps.net', // ВСТАВТЕ ТУТ ВАШУ АДРЕСУ!!!
  'http://localhost:8080' // Залишаємо для локальної розробки
];

const corsOptions = {
  origin: function (origin, callback) {
    // Дозволяємо запити без origin (наприклад, мобільні додатки або postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());

// Наш тестовий API роут
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Привіт! Це оновлення прилетіло через GitHub Actions!',
    timestamp: new Date().toISOString()
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Backend сервер запущено на http://localhost:${port}`);
});