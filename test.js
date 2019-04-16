const M = "MIDDLE"
const S = "SUBJECT"
const P = "PREDICATE"

const A = "ALL ARE"
const E = "NO ARE"
const I = "SOME ARE"
const O = "SOME ARE NOT"

var Sätze = {
	[A]: (a,b)=>`Alle ${a} ist ${b}.`,
	[E]: (a,b)=>`Keine ${a} ist ${b}.`,
	[I]: (a,b)=>`Einige ${a} ist ${b}.`,
	[O]: (a,b)=>`Einige ${a} ist nicht ${b}.`,
}

var Konklusionen = {
	[A]: (a,b)=>`Also ist alle ${a} ${b}.`,
	[E]: (a,b)=>`Also ist keine ${a} ${b}.`,
	[I]: (a,b)=>`Also ist einige ${a} ${b}.`,
	[O]: (a,b)=>`Also ist einige ${a} nicht ${b}.`,
}

var Figuren = {
	1: [ [M,P] , [S,M] , [S,P]],
	2: [ [P,M] , [S,M] , [S,P]],
	3: [ [M,P] , [M,S] , [S,P]],
	4: [ [P,M] , [M,S] , [S,P]],
}

function all_are(a,b){
	for (var i=0;i<a.length;i++){
		var el = a[i];
		if (b.indexOf(el)<0){
			return false;
		}
	}
	return true;
}


function no_are(a,b){
	for (var i=0;i<a.length;i++){
		var el = a[i];
		if (b.indexOf(el)>=0){
			return false;
		}
	}
	return true;
}

function some_are(a,b){
	var some=false;
	for (var i=0;i<a.length;i++){
		var el = a[i];
		if (b.indexOf(el)>=0){
			some=true;
		}
	}
	return some;
}


function some_are_not(a,b){
	var some_are_not=false;
	for (var i=0;i<a.length;i++){
		var el = a[i];
		if (b.indexOf(a)<0){
			some_are_not=true;
		}
	}
	return some_are_not;
}

function erfüllst(a,b,q){
	switch (q){
		case A:
			return all_are(a,b);
		break;
		case E:
			return no_are(a,b);
		break;
		case I:
			return some_are(a,b);
		break;
		case O:
			return some_are_not(a,b);
		break;
		default:
			console.error("GAH");
		break;
	}
}
//S,P ist 

var Syllogismen = [
	[A,A,A,1],
	[E,A,E,1],
	[A,I,I,1],
	[E,I,O,1],
	[A,A,I,1],
	[E,A,O,1],

	[E,A,E,2],
	[A,E,E,2],
	[E,I,O,2],
	[A,O,O,2],
	[E,A,O,2],
	[A,E,O,2],

	[A,I,I,3],
	[I,A,I,3],
	[E,I,O,3],
	[O,A,O,3],
	[E,A,O,3],
	[A,A,I,3],

	[A,E,E,4],
	[I,A,I,4],
	[E,I,O,4],
	[A,E,O,4],
	[E,A,O,4],
	[A,A,I,4],
]

var TRUTH = "Wahrheit"
var LOVE = "Liebe"
var COURAGE = "Mut"

var HONESTY = "Ehrlichkeit"
var COMPASSION = "Mitgefühl"
var VALOR = "Tapferkeit"
var JUSTICE = "Gerechtigkeit"
var HONOR = "Ehre"
var SACRIFICE = "Autopferung"
var SPIRITUALITY = "Spiritualität"
// var HUMILITY = "Demut"

var Principles = [ TRUTH, LOVE, COURAGE ]

var Tugendkomposition = {
	[HONESTY]:[TRUTH],
	[COMPASSION]:[LOVE],
	[VALOR]:[COURAGE],
	[JUSTICE]:[TRUTH,LOVE],
	[HONOR]:[TRUTH,COURAGE],
	[SACRIFICE]:[LOVE,COURAGE],
	[SPIRITUALITY]:[TRUTH,LOVE,COURAGE],
	// [HUMILITY]:[],
}

var Tugenden = Object.keys(Tugendkomposition)

function druckOutput(syllogismus,figur,dat){
	// console.log("DO");
	// console.log(syllogismus);
	// console.log(figur);
	// console.log(dat);

	for (var j=0;j<figur.length;j++){
		var figurteil=figur[j];
		var teil1 = dat[figurteil[0]];
		var teil2 = dat[figurteil[1]];
		// var c1 = Tugendkomposition[teil1];
		// var c2 = Tugendkomposition[teil2];
		var q = syllogismus[j];
		// console.log(teil1,teil2,q);
		if (j<figur.length-1){
			console.log(Sätze[q](teil1,teil2));
		} else {
			console.log(Konklusionen[q](teil1,teil2));
		}
	}

	console.log();
}

for (var i=0;i<Syllogismen.length;i++){
	var syllogismus = Syllogismen[i];
	var figur = Figuren[syllogismus[3]];

	for (var ti0=0;ti0<Tugenden.length;ti0++){
		for (var ti1=0;ti1<Tugenden.length;ti1++){
			if (ti1===ti0){
				continue;
			}			
			for (var ti2=0;ti2<Tugenden.length;ti2++){
				if (ti2===ti0 || ti2===ti1){
					continue;
				}

				var dat = {
					[M] : Tugenden[ti0],
					[S] : Tugenden[ti1],
					[P] : Tugenden[ti2],
				}

				var funktioniert=true;
				for (var j=0;j<figur.length;j++){
					var figurteil=figur[j];
					var teil1 = dat[figurteil[0]];
					var teil2 = dat[figurteil[1]];
					var c1 = Tugendkomposition[teil1];
					var c2 = Tugendkomposition[teil2];
					var q = syllogismus[j];
					// console.log("EF",c1,c2,q,erfüllst(c1,c2,q));
					if (erfüllst(c1,c2,q)==false){
						funktioniert=false;
						break;
					}
				}
				if (funktioniert){
					druckOutput(syllogismus,figur,dat);
				}
			}
		}	
	}
}

//could also try false syllogisms! :D