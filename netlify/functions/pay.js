exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try {
    const body = JSON.parse(event.body);
    const baseAmount = parseFloat(body.amount);
    const feePercent = baseAmount >= 10000 ? 1.05 : 1.09;
    const chargedAmount = parseFloat((baseAmount * feePercent).toFixed(2));
    const response = await fetch('https://api.rollypay.io/api/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': '7oK7Np3OzSLwR6OAimDaf84Coe6P6afOA61IDi6JHTE',
      },
      body: JSON.stringify({
        amount: String(chargedAmount.toFixed(2)),
        payment_currency: 'RUB',
        payment_method: 'sbp',
        order_id: 'astro_' + Date.now(),
        success_url: 'https://astro-pay.netlify.app/?payment=success',
        fail_url: 'https://astro-pay.netlify.app/?payment=fail',
      }),
    });
    const data = await response.json();
    return {
      statusCode: response.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: e.message }),
    };
  }
};
