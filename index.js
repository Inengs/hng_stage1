const express = require('express');
const app = express();
const axios = require('axios')
const port = process.env.PORT || 3000;

function isPrime(n) {
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return true;
}

function isPerfectNumber(n) {
    if (n <= 1) {
        return false;
    }

    let divisorSum = 1;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            divisorSum += i;
            if (i * i !== n) {
                divisorSum += n / i
            }
        }
    }

    return divisorSum === n
}

function isArmstrongNumber(n) {
    if (n <= 0) {
        return false;
    }

    let digits = n.toString().split('').map(Number);
    let sum = digits.reduce((acc, digit) => acc + Math.pow(parseInt(digit, 10), digits.length), 0);

    return sum === n;
}

function sumOfDigits(n) {
    let digits = n.toString().split('').map(Number);
    let sum = digits.reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    return sum;
}

app.get('/api/classify-number', async (req, res) => {
    const value = req.query.number;

    if (!value || isNaN(value)) {
        return res.status(400).json({ number: value || undefined, error: true, message: 'invalid input value' })
    }

    const num = parseInt(value, 10);

    try {
        const factResponse = await axios.get(`http://numbersapi.com/${num}/math`);
        const funFact = factResponse.data

        let properties = [];
        if (isArmstrongNumber(num)) {
            properties.push('armstrong')
        }

        properties.push(num % 2 === 0 ? 'even' : 'odd');

        const response = {
            number: num,
            is_prime: isPrime(num),
            is_perfect: isPerfectNumber(num),
            properties: properties,
            digit_sum: sumOfDigits(num),
            fun_fact: funFact,
        }

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: true, message: 'failed to return funfact response' })
    }
})

app.listen(port, () => console.log(`Server running on port ${port}`))