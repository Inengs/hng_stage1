# hng_stage1

# Number Classification API

## Overview
The **Number Classification API** takes a number as input and returns interesting mathematical properties about it, along with a fun fact.

### Features 
✅ **Prime Number Check** – Determines if the number is prime  
✅ **Perfect Number Check** – Checks if the number is a perfect number  
✅ **Armstrong Number Check** – Identifies Armstrong (narcissistic) numbers  
✅ **Even or Odd Identification** – Determines if the number is even or odd  
✅ **Digit Sum Calculation** – Computes the sum of the number’s digits  
✅ **Fun Fact Fetching** – Retrieves a mathematical fun fact from the Numbers API  

### Endpoint
GET /api/classify-number?number={value}

### Example Request:
GET http://localhost:3000/api/classify-number?number=450
