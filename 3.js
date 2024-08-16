function recursiveBubbleSort(arr, n = arr.length) {
  if (n === 1) {
    return;
  }

  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;
    }
  }

  recursiveBubbleSort(arr, n - 1);
}

function sortArray(data) {
  recursiveBubbleSort(data);

  let oddNumbers = data.filter((num) => num % 2 !== 0);
  let evenNumbers = data.filter((num) => num % 2 === 0);

  return {
    sortedArray: data,
    odd: oddNumbers,
    even: evenNumbers,
  };
}

let data = [2, 24, 32, 22, 31];
let result = sortArray(data);

console.log("Array:", result.sortedArray.join(", "));
console.log("Bilangan Ganjil:", result.odd.join(", "));
console.log("Bilangan Genap:", result.even.join(", "));
