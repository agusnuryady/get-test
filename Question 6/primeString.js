// Javascript implementation to count total
// number of ways to split a string
// to get prime numbers

let MOD = 1000000007;
// Function to check whether a number
// is a prime number or not
function isPrime(number) {
  let num = parseInt(number);

  for (let i = 2; i * i <= num; i++) {
    if (num % i == 0) return false;
  }
  return num > 1 ? true : false;
}

// Function to find the count
// of ways to split String
// into prime numbers
function countPrimeStrings(number, i) {
  // 1 based indexing
  if (i == 0) return 1;

  let cnt = 0;
  // Consider every suffix up to numbers length
  for (let j = 0; j <= i; j++) {
    // Number should not have
    // a leading zero and it
    // should be a prime number
    if (j >= 0 && number[j] != "0" && isPrime(number.substring(j, j + 1))) {
      cnt += countPrimeStrings(number, i - j);
      cnt %= MOD;
      /*    console.log('c', number.substring(i - j, i), isPrime(number.substring(i - j, i)), cnt) */
    }
  }

  // Return the final result
  return cnt;
}

// Driver code
let s1 = "113738";
let l = s1.length;
console.log(countPrimeStrings(s1, l));

//to test code open https://jsfiddle.net/ and then copy all code into javascript file and then click run
