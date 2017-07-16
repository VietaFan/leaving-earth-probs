var fact = [1,1,2,6];
var outcomes = [];
for (var n=0; n<4; ++n) {
    outcomes.push([]);
    for (var x=0; x<=n; ++x) {
        for (var y=0; x+y<=n; ++y) {
            outcomes[n].push([x,y,n-x-y]);
        }
    }
}
var drawProbs = {};
var charmap = {'S': 0, 'M': 1, 'X': 2};
function drawProb(X) {
    return 0.7**X[0]*0.15**(X[1]+X[2])*fact[X[0]+X[1]+X[2]]/(fact[X[0]]*fact[X[1]]*fact[X[2]]);
}
for (var n=0; n<4; ++n) {
    for (var i=0; i<outcomes[n].length; ++i) {
        drawProbs[outcomes[n][i]] = drawProb(outcomes[n][i]);
    }
}
function condProb(seq, X) {
    var n = X[0]+X[1]+X[2];
    var prob = 1.0, current;
    var Y = [], c;
    for (var i=0; i<X.length; ++i)
        Y.push(X[i]);
	for (var i=0; i<seq.length; ++i) {
		c = seq.charAt(i);
        if (c == 'B') {
            Y[current]--;
            n--;
        } else {
            current = charmap[c];
            prob *= Y[current]/n;
        }
    }
    return prob;
}
function getProbs(seq, startNum) {
    if (startNum === undefined) {
        startNum = 3;
    }
	var probs = {}, totalProb = 0.0;
    for (var i=0; i<outcomes[startNum].length; ++i) {
        var X = outcomes[startNum][i];
        probs[X] = condProb(seq, X)*drawProbs[X];
        totalProb += probs[X];
    } 
    for (X in probs) {
        probs[X] /= totalProb;
    }
    var bought = [0,0,0];
    for (var i=1; i<seq.length; ++i) {
        if (seq[i] == 'B') {
            bought[charmap[seq[i-1]]]++;
        }
    }
    var ans = {};
    var s = startNum-bought[0]-bought[1]-bought[2];
    for (var i=0; i<outcomes[s].length; ++i) {
        var T = [];
        for (var j=0; j<3; ++j) {
            T.push(outcomes[s][i][j]+bought[j]);
        }
        ans[outcomes[s][i]] = probs[T];
    }
    return ans;
}
function nextProbs(seq, startNum) {
    var probs = getProbs(seq, startNum);
    var n = startNum;
	for (var i=0; i<seq.length; ++i) {
        if (seq[i] == 'B') {
            --n;
        }
    }
    var ans = [];
    for (var i=0; i<3; ++i) {
        var p = 0;
        for (X in probs) {
            p += probs[X]*(X.charCodeAt(2*i)-48)/n;
        }
        ans.push(p);
    }
    return ans;
}

