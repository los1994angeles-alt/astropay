exports.handler = async (event) => {
  try {
    const TELEGRAM_TOKEN = '8917345443:AAEBqf0ME589AmQhI6t3upPal6PPgOyovH8';
    const CHAT_ID = '-1004495632730';

    const text = `📨 Webhook получен!\nМетод: ${event.httpMethod}\nТело: ${event.body}`;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text }),
    });

    return { statusCode: 200, body: 'ok' };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
