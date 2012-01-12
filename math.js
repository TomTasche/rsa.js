var Mathematix = function initMathematix() {
    var pf = function pf(n) {
        // TODO: this is spongy!
        var primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
        var factors = [];
        
        for (var i = 0; i < primes.length; i++) {
            if (n % primes[i] === 0) {
                factors.push(primes[i]);
                
                n = n / primes[i];
                
                i = 0;
            }
        }
        
        return factors;
    };
    
    var gcd = function gcd(a, b) {
        // taken from: http://userpages.umbc.edu/~rcampbel/NumbThy/Class/Programming/JavaScript/
        var temp;
        
        if(a < 0) {
            a = -a;
        }
        if(b < 0) {
            b = -b;
        }
        if(b > a) {
            temp = a; a = b; b = temp;
        }
        
        while (true) {
            a %= b;
            if (a === 0) {
                return b;
            }
            
            b %= a;
            if (b === 0) {
                return a;
            }
        }
        
        return b;
    };
    
    var isCoprime = function isCoprime(a, b) {
        return gcd(a, b) === 1;
    };
    
    var phi = function phi(p, q) {
        return ((p - 1) * (q - 1));
    };
    
    return {
        gcd: gcd,
        greatestCommonDivisor: gcd,
        
        isCoprime: isCoprime,
        
        pf: pf,
        primFactorize: pf,
        
        phi: phi
    };
}();