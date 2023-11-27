var columns = 4; //setting up in refresh function becuase we want it to restart after start over
var rows = 4;
var currColumn = 0;
var currRow = 0;
var endgame = false;
let apiUrl = "http://localhost:3000/v1/wordle";
let data;

async function getJson(url) {

	const response = await fetch(url, {
		headers: {
			"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv"
		}
	});
	let data2 = await response.json();
	console.log(JSON.stringify(data2));
	if (response) {
		hideloader();
	}
	document.getElementById('startover').innerText = "Start Over";
	data = data2;
}

function hideloader() { //loading function
	document.getElementById('startover').innerText = "Loading...";
}

function update(wordObject) { //update function

	let Uword = wordObject.word;
	let word = Uword.toUpperCase();
	console.log(word);
	let correct = 0;


	for (let i = 0; i < columns; i++) {
		let currTile = document.getElementById(
			currRow.toString() + "-" + i.toString()
		);
		let letter = currTile.innerText;
		currTile.style.borderColor = "white";

		if (letter == word[i]) {
			currTile.classList.add("correct");
			correct += 1;
		} else if (word.includes(letter)) {
			currTile.classList.add("inword");
		} else {
			currTile.classList.add("incorrect");
		}

		if (correct == columns) {
			correctGif();
			correctGuess(wordObject);
			endgame = true;
		}
	}
}

function darkmodeToggle() { //darkmodeToggle function
	var element = document.body;
	element.classList.toggle("darkmodecss");
}

function instructions() { //how-to-play popup function
	var x = document.getElementById("rightHTP");
	if (x.style.display == "none") {
		x.style.display = "inline-flex";
	} else {
		x.style.display = "none";
	}
}

function hintBanner(wordObject) { //popup banner function
	let hint = wordObject.hint;
	var y = document.getElementById("hintBanner");
	if (y.style.display === "none") {
		y.style.display = "block";
		y.innerText = "𝘏𝘪𝘯𝘵: " + hint + ".";
	} else {
		y.style.display = "none";
	}
}

function correctGuess(wordObject) {

	if (document.getElementById("hintBanner").style.display === "block") {
		document.getElementById("hintBanner").style.display = "none";
	}
	let word = wordObject.word;
	var z = document.getElementById("correctGuess");
	z.innerText = "You guessed the word " + word + " correctly!";
	z.style.display = "block";
}

function OOG(wordObject) {
	if (document.getElementById("hintBanner").style.display === "block") {
		document.getElementById("hintBanner").style.display = "none";
	}
	let cWord = wordObject.word;
	let c = document.getElementById("OOG");
	c.innerText = "You missed the word " + cWord + " and lost!";
	c.style.display = "block";
}

function correctGif() {
	var gif = document.getElementById("correct");
	var board = document.getElementById("board");
	var inputbox = document.getElementById("inputbox");
	inputbox.style.display = "none";
	board.style.display = "none";
	gif.style.display = "inline-flex";
}

async function startOver() {
	document.getElementById('startOver').disabled = true;
	window.location.reload();
}

async function refresh() {
	for (let i = 0; i < rows; i++) { //setting up board
		for (let j = 0; j < columns; j++) {
			let tile = document.createElement("span");
			tile.id = i.toString() + "-" + j.toString();
			tile.classList.add("tile");
			document.getElementById("board").appendChild(tile);
		}
	}

	var htp = document.getElementById("rightHTP"); //making sure toggle elements are initally invisible
	htp.style.display = "none";

	var banner = document.getElementById("hintBanner");
	banner.style.display = "none";

	var animation = document.getElementById("correct");
	animation.style.display = "none";

	var correct = document.getElementById("correctGuess");
	correct.style.display = "none";

	var OOG2 = document.getElementById("OOG");
	OOG2.style.display = "none";

	let currTile = document.getElementById( //setting index 0-0 tile to have a black border
		currRow.toString() + "-" + currColumn.toString()
	);
	currTile.style.borderColor = "black";

	await getJson(apiUrl);

	randomIndex = Number.parseInt(Math.random() * data.dictionary.length); //setting up index and json word object
	wordObject = data.dictionary[randomIndex];

	document.getElementById("hint").addEventListener('click', (event) => {
		hintBanner(wordObject);
	});

	document.addEventListener("keyup", (e) => { //event for input

		if (endgame) {
			return;
		}

		if ("KeyA" <= e.code && e.code <= "KeyZ") { //if correct key is pressed in a valid position on board
			if (currColumn < columns) {
				let currTile = document.getElementById(
					currRow.toString() + "-" + currColumn.toString()
				);
				if (currTile.innerText == "") {

					let keyInput = document.getElementById("inputbox"); //set up for input box
					keyInput.innerText = e.code[3];
					keyInput.style.fontSize = "80px";
					keyInput.style.color = "white";
					keyInput.style.textShadow = "4px 4px 4px #080808";

					currTile.innerText = e.code[3]; //set up for board tile
					document.getElementById(
						currRow.toString() + "-" + currColumn.toString()
					).style.borderColor = "grey";
					currColumn += 1;
					if (currColumn == 4) {
						return;
					}
					document.getElementById(currRow.toString() + "-" + currColumn.toString()).style.borderColor = "black";
				}
			}

		} else if (e.code == "Backspace") {
			if (0 < currColumn && currColumn <= columns) { //if backspace is pressed at valid position on board
				if (currColumn != columns) {
					document.getElementById(
						currRow.toString() + "-" + currColumn.toString()
					).style.borderColor = "grey";
				}
				currColumn -= 1;

				let keyInput = document.getElementById("inputbox");
				keyInput.innerText = "⌫";
				keyInput.style.fontSize = "80px";
				keyInput.style.color = "white";
				keyInput.style.textShadow = "4px 4px 4px #080808";

			}
			let currTile = document.getElementById(
				currRow.toString() + "-" + currColumn.toString()
			);
			currTile.innerText = "";

			document.getElementById(
				currRow.toString() + "-" + currColumn.toString()
			).style.borderColor = "black";


		} else if (e.code == "Enter") { //if enter is pressed, conditions will handle if pressed at valid position or not
			if (currColumn != columns) {
				let keyInput = document.getElementById("inputbox");
				keyInput.innerText = "⏎";
				keyInput.style.fontSize = "80px";
				keyInput.style.color = "white";
				keyInput.style.textShadow = "4px 4px 4px #080808";

				setTimeout(function() {
					window.alert("PLEASE FINISH YOUR WORD");
				}, 10)

			} else {
				let keyInput = document.getElementById("inputbox");
				keyInput.innerText = "⏎";
				keyInput.style.fontSize = "80px";
				keyInput.style.color = "white";
				keyInput.style.textShadow = "4px 4px 4px #080808";

				update(wordObject);
				currRow += 1;
				currColumn = 0;
				if (currRow != rows) {
					document.getElementById(
						currRow.toString() + "-" + currColumn.toString()
					).style.borderColor = "black";
				}
			}
		}
		console.log(currRow);

		if (currRow == rows && endgame != true) {
			OOG(wordObject);
			endgame = true;
		}
	});
}

//calling function
window.onload = function() {
	refresh();
};