exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const data = JSON.parse(event.body);

    // Принимаем только успешные платежи
    if (data.status !== 'paid' && data.event !== 'payment.paid') {
      return { statusCode: 200, body: 'ok' };
    }

    const TELEGRAM_TOKEN = '8917345443:AAEBqf0ME589AmQhI6t3upPal6PPgOyovH8';
    const CHAT_ID = '-1004495632730';

    const paidAmount = data.amount || '?';
    const orderId = data.order_id || '?';
    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    const text = `✅ Новая оплата!\n💰 Сумма: ${paidAmount} ₽\n🆔 ID: ${orderId}\n🕐 ${now} (МСК)`;

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
