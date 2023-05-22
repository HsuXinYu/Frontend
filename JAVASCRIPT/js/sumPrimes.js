function sumPrimes(num) {
  let primes = [];
  for (let i = 2; i <= num; i++) {
    let isPrime = true;
    const sqrt = Math.sqrt(i);
    for (let j = 2; j <= sqrt; j++) {
      // console.log(i,j,i/j);
      if (Number.isInteger(i / j)) {
        isPrime = false;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
  }
  let sum = primes.reduce((a, b) => a + b);
  return sum;
}

sumPrimes(10); //17
