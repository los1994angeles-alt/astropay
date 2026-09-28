exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);

    if (data.status !== 'paid') {
      return { statusCode: 200, body: 'ok' };
    }

    const TELEGRAM_TOKEN = '8917345443:AAEBqf0ME589AmQhI6t3upPal6PPgOyovH8';
    const CHAT_ID = '-1004495632730';

    const paidAmount = parseFloat(data.amount);
    const baseAmount = paidAmount >= 10500
      ? Math.round(paidAmount / 1.05)
      : Math.round(paidAmount / 1.09);

    const now = new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' });

    const text = `✅ Новая оплата!\n💰 Получено: ${baseAmount} ₽\n🧾 Оплачено клиентом: ${paidAmount} ₽\n🆔 ID: ${data.order_id}\n🕐 ${now} (МСК)`;

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
