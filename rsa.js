var log = function log(message) {
    document.body.innerHTML += (message + '<br />');
};

var calculate = function calculate() {
    var p = document.getElementById('p').value;
    var q = document.getElementById('q').value;
    
    RSA(p, q);
};

var uncalculate = function uncalculate() {
    // TODO: where to get e and n from?
    
    unRSA(e, n);
};

var RSA = function RSA(p, q) {
    if (Math.min(p, q) < 5 && Math.max(p, q) < 11) {
        window.alert('Please input Math.min(p, q) >= 5 && Math.max(p, q) >= 11');
        
        return;
    }
    
    var n = function calculateN(p, q) {
        return p * q;
    }(p, q);
    log('n: ' + n);
    
    var phi = Mathematix.phi(p, q);
    log('phi: ' + phi);
    
    var tau = function calculateTau(phi) {
        var classes = [];
        
        for (var i = 1; i < phi; i++) {
            if (Mathematix.isCoprime(i, phi)) {
                classes.push(i);
            }
        }
        
        return classes;
    }(phi);
    log('tau: ' + tau);
    
    var keys = function calculateKeys(tau, phi) {
        var potentialKeys = function calculateGrouptable() {
            var table = [];
            var potentialKeys = [];
            
            for (var i = 1; i < tau.length; i++) {
                var row = [];
                
                for (var j = i + 1; j < tau.length; j++) {
                    var entry = tau[i] * tau[j] % phi;
                    if (entry === 1) {
                        potentialKeys.push([tau[i], tau[j]]);
                    }
                    
                    row[j] = entry;
                }
                
                table[i] = row;
            }
            
            return potentialKeys;
        }();
        log('potential keys: ' + potentialKeys);
        
        var keys = potentialKeys.length === 0 ? [] : potentialKeys[potentialKeys.length - 1];
        if (keys[0] === 1 && keys[1] === 1) {
            return [];
        } else {
            return keys;
        }
    }(tau, phi);
    log('keys: ' + keys);
    
    var e = Math.min(keys[0], keys[1]);
    var d = Math.max(keys[0], keys[1]);
    log('public: ' + e);
    log('private: ' + d);
    
    var m = 4;
    log('plain: ' + m);
    
    var c = function encrypt(m, e, n) {
        return BigInteger(m).modPow(BigInteger(e), BigInteger(n));
    }(m, e, n);
    log('encrypted: ' + c);
    
    var mAgain = function decrypt(c, d, n) {
        return BigInteger(c).modPow(BigInteger(d), BigInteger(n));
    }(c, d, n);
    
    log('decrypted: ' + mAgain);
    
    unRSA(d, n);
};

var unRSA = function unRSA(d, n) {
    var factors = Mathematix.primFactorize(n);
    log('<h3>Crackeria</h3>');
    log('factors of n: ' + factors);
    
    var phi = Mathematix.phi(factors[0], factors[1]);
    log('cracked phi: ' + phi);
    
    // d*u + phi*v = 1
    // 33*u + 40*v = 1 // mod 40
    // 33*u = 1 mod 40
    // // 40 = 33*1 + 7
    // // // 7 = 40 - 33*1
    // // 33 = 7*4 + 5
    // // // 5 = 33 - 7*4
    // // 7 = 5*1 + 2
    // // // 2 = 7 - 5*1
    // // 5 = 2*2 + 1
    // // // 1 = 5 - 2*2
    // // (2 = 1*2 + 0)
    // // // (0 = 2 - 1*2)
    // // 1 = (33 - (40 - 33*1)*4) - ((40 - 33*1 - (33 - (40 - 33*1)*4)*1) // ?
    // // 1 = 33 - 28 - 40 + 33 + 28 // mod 40
    // // 1 = 33 - 28 + 33 + 28
    // // 1 = ?
};