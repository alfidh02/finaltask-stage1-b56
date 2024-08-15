function drawRightTriangle(heightValue) {
  if (heightValue <= 0 || heightValue >= 10) {
    console.log("Besar alas/tinggi harus lebih dari 0 dan kurang dari 10!");
    return;
  }

  function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;

    for (let i = 3; i < num; i += 2) {
      if (num % i === 0) return false;
    }
    return true;
  }

  function nextPrime(start) {
    let num = start;
    while (!isPrime(num)) {
      num++;
    }
    return num;
  }

  let prime = 2;

  for (let i = 1; i <= heightValue; i++) {
    let row = "";
    for (let j = 0; j < i; j++) {
      row += prime + " ";
      prime = nextPrime(prime + 1);
    }
    console.log(row);
  }
}

// Example usage:
drawRightTriangle(5);
