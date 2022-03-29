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

  // Consider every suffix up to 6 digits
  for (let j = 1; j <= 6; j++) {
    // Number should not have
    // a leading zero and it
    // should be a prime number
    if (
      i - j >= 0 &&
      number[i - j] != "0" &&
      isPrime(number.substring(i - j, i))
    ) {
      cnt += countPrimeStrings(number, i - j);
      cnt %= MOD;
    }
  }

  // Return the final result
  return cnt;
}

// Driver code
let s1 = "11373";
let l = s1.length;
console.log(countPrimeStrings(s1, l));

//to test code open https://jsfiddle.net/ and then copy all code into javascript file and then click run
