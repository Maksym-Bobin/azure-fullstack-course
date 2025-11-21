<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" width="100">
    <h1>Vue 3 + Node.js в Azure</h1>
    
    <div class="card">
      <p>Статус з'єднання з API:</p>
      <h3>{{ apiMessage }}</h3>
      
      <button @click="callApi" :disabled="isLoading">
        {{ isLoading ? 'Завантаження...' : 'Отримати дані з Backend' }}
      </button>
    </div>
  </div>
</template>

<script>
// Використовуємо Options API
export default {
  name: 'App',
  data() {
    return {
      apiMessage: 'Натисніть кнопку для перевірки ... !',
      isLoading: false
    }
  },
  methods: {
    async callApi() {
      this.isLoading = true;
      this.apiMessage = 'Надсилання запиту ...';

      try {
        // Отримуємо базову URL з налаштувань. 
        // Якщо ми локально - рядок буде порожнім (і спрацює проксі).
        // Якщо в Azure - підставиться адреса бекенду.
        const baseUrl = process.env.VUE_APP_API_URL || '';

        // 1. Робимо запит через вбудований fetch
        const response = await fetch(`${baseUrl}/api/test`);

        // 2. Перевіряємо, чи статус відповіді OK (200-299)
        // fetch не викидає помилку автоматично при 404 або 500, на відміну від axios
        if (!response.ok) {
          throw new Error(`HTTP помилка! статус: ${response.status}`);
        }

        // 3. Явно розбираємо JSON
        const data = await response.json();
        
        // 4. Використовуємо отримані дані
        this.apiMessage = data.message + ' (Час: ' + data.timestamp + ')';
        
      } catch (error) {
        console.error(error);
        this.apiMessage = 'Помилка з\'єднання: ' + error.message;
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
button:disabled {
  background-color: #ccc;
}
</style>
