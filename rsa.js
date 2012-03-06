var log = function log(message) {
    document.body.innerHTML += (message + '<br />');
};

var calculateGrouptable = function calculateGrouptable(tau, phi) {
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
}

var calculateTau = function calculateTau(phi) {
    var classes = [];
    
    for (var i = 1; i < phi; i++) {
        if (Mathematix.isCoprime(i, phi)) {
            classes.push(i);
        }
    }
    
    return classes;
}

function decrypt(c, d, n) {
    return BigInteger(c).modPow(BigInteger(d), BigInteger(n));
}

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
    
    var tau = calculateTau(phi);
    log('tau: ' + tau);
    
    var keys = function calculateKeys(tau, phi) {
        var potentialKeys = calculateGrouptable(tau, phi);
        log('potential keys: ' + potentialKeys);
        
        var keys = potentialKeys[potentialKeys.length - 1];
        if (keys[0] === 1 && keys[1] === 1) {
            log('no possible keys found');
        } else {
            return keys;
        }
    }(tau, phi);
    log('keys: ' + keys);
    
    var e = Math.min(keys[0], keys[1]);
    var d = Math.max(keys[0], keys[1]);
    log('public keys: ' + e);
    log('private keys: ' + d);
    
    var m = 4;
    log('plain text: ' + m);
    
    var c = function encrypt(m, e, n) {
        return BigInteger(m).modPow(BigInteger(e), BigInteger(n));
    }(m, e, n);
    log('encrypted text: ' + c);
    
    var mAgain = decrypt(c, d, n);
    
    log('decrypted text: ' + mAgain);

    unRSA(e, n, c);
};

var unRSA = function unRSA(e, n, c) {
    var factors = Mathematix.primFactorize(n);
    log('<h3>Cracking RSA</h3>');
    log('factors of n: ' + factors);
    
    var phi = Mathematix.phi(factors[0], factors[1]);
    log('cracked phi: ' + phi);
    
    var tau = calculateTau(phi);
    
    var potentialKeys = calculateGrouptable(tau, phi);
    var d;
    for (var i = 0; i < potentialKeys.length; i++) {
        if (potentialKeys[i][0] == e) {
            d = potentialKeys[i][1];
        }
    }
    
    log('cracked d: ' + d);
    
    log('cracked text: ' + decrypt(c, d, n));
};
