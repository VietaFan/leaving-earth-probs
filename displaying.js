function toCardStr(x) {
	var s = "";
	var t = "S,M,X";
	for (var i=0; i<5; i+=2) {
		for (var j=0; j<x.charCodeAt(i)-48; ++j) {
			s += t[i];
		}
	}
	return s;
}
function showProbs() {
	var inputStr = document.getElementById("eventstr").value.toUpperCase();
	var s = "";
	for (var i=0; i<inputStr.length; ++i) {
		var c = inputStr.charAt(i);
		if (c == 'B' || c == 'S' || c == 'M' || c == 'X') {
			s += c;
		}
	}
	console.log(s);
	var probs = getProbs(s,3);
	var tableStr = "<table><tr><th>Card Set</th><th>Probability</th></tr>";
	var L = [];
	for (x in probs) {
		if (probs[x] > 1e-14) {
			L.push([probs[x],x]);
		}
	}
	L.sort(function(a,b) {
		if (a[0] == b[0]) {
			return a[1] < b[1];
		}
		return a[0] < b[0];
	});
	for (var x=0; x<L.length; ++x) {
		tableStr += "<tr><td>"+toCardStr(L[x][1])+"</td><td>"+L[x][0].toFixed(6)+"</td></tr>";
	}
	tableStr += "</table>";
	var nprobs = nextProbs(s,3);
	tableStr += "<table><tr><th>Next Drawn</th><th>Probability</th></tr>";
	for (var i=0; i<3; ++i) {
		tableStr += "<tr><td>"+"SMX"[i]+"</td><td>"+nprobs[i].toFixed(6)+"</td></tr>";
	}
	tableStr += "</table>";
	document.getElementById("output").innerHTML = tableStr;
	return false;
}