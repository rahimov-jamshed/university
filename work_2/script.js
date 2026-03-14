const API = 'https://api.frankfurter.app';

async function loadCurrencies() {
    const res  = await fetch(`${API}/currencies`);
    const data = await res.json();

    const from = document.getElementById('from');
    const to   = document.getElementById('to');

    for (const [code, name] of Object.entries(data)) {
        const opt = `<option value="${code}">${code} — ${name}</option>`;
        from.innerHTML += opt;
        to.innerHTML   += opt;
    }

    from.value = 'EUR';
    to.value   = 'USD';
}

async function convert() {
    const amount = document.getElementById('amount').value;
    const from   = document.getElementById('from').value;
    const to     = document.getElementById('to').value;
    const result = document.getElementById('result');

    if (amount <= 0) {
        result.textContent = 'Enter a valid amount';
        return;
    }

    if (from === to) {
        result.textContent = `${amount} ${from} = ${amount} ${to}`;
        return;
    }

    result.textContent = 'Converting...';

    const res  = await fetch(`${API}/latest?amount=${amount}&from=${from}&to=${to}`);
    const data = await res.json();
    const converted = data.rates[to];

    result.textContent = `${amount} ${from} = ${converted} ${to}`;
}

loadCurrencies();
