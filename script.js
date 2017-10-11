
var canvasWidth = 256;
var canvasHeight = 256;
var imageWidth = 16;
var imageHeight = 16;

var pointer = 0;
var memorySize = 3000;
var currentPixel;
var numbers = [];
var loops = [];

var canvas
var context
var pixelWidth 
var pixelHeight

//var checkerboard = "->.<.>.<.>.<.>.<..>.<.>.<.>.<.>.<>.<.>.<.>.<.>.<..>.<.>.<.>.<.>.<>.<.>.<.>.<.>.<..>.<.>.<.>.<.>.<>.<.>.<.>.<.>.<..>.<.>.<.>.<.>.<"

function myFunction()
{
	currentPixel = 0

	
	pixelWidth = canvasWidth/imageWidth;
	pixelHeight = canvasHeight/imageHeight;

	canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0,canvas.width,canvas.height )

	var text =document.querySelector("#output");
	var textarea = document.querySelector(".txtarea");
	text.innerHTML = "";

	for (var i = 0; i < memorySize; i++) {
		numbers[i] = 0;
	}

	var index = 0;
	while(index <textarea.value.length)
	{
		switch(textarea.value[index])
		{
		case '<':
			pointer--;
			if(pointer< 0)
				pointer += memorySize;
			break;
		case '>':
			pointer++;
			if(pointer == memorySize)
				pointer -= memorySize;
			break;
		case '+':
			numbers[pointer]++;
			if(numbers[pointer]==256)
				numbers[pointer]=0;
			break;
		case '-':

			numbers[pointer]--;
			if(numbers[pointer]< 0)
				numbers[pointer] = 255
			break;
		case '.':
			text.innerHTML += String.fromCharCode(numbers[pointer]);
			drawPixel(numbers[pointer])
			break;
		case ',':
			console.log("Sorry not implemented")
			break;
		case '[':
		// NOT CORRECT IMPLEMENTATION ON BRAINFUCK 
		// THIS SHOULD JUMP TO LOOP END IF DONE
			loops.push(index);
			break;
		case ']':
			if(numbers[pointer] != 0)
			{
				index = loops[loops.length-1];
			}
			else
			{
				loops.pop();
			}
			break;
		case '0':
			numbers[pointer] = numbers[pointer]^1
			break;
		case '1':
			numbers[pointer] = numbers[pointer]^2
			break;
		case '2':
			numbers[pointer] = numbers[pointer]^4
			break;
		case '3':
			numbers[pointer] = numbers[pointer]^8
			break;
		case '4':
			numbers[pointer] = numbers[pointer]^16
			break;
		case '5':
			numbers[pointer] = numbers[pointer]^32
			break;
		case '6':
			numbers[pointer] = numbers[pointer]^64
			break;
		case '7':
			numbers[pointer] = numbers[pointer]^128
			break;
		}
		index++;
	}
}



function drawPixel(value)
{
	var ctx = canvas.getContext("2d");

	var x = currentPixel%imageWidth
	var y = Math.floor( currentPixel/imageWidth)
	ctx.fillStyle = 'rgb(' +getRed(value)+','+  getGreen(value)+','+ getBlue(value) + ')'
	ctx.fillRect(x*pixelWidth, y*pixelHeight, pixelWidth, pixelHeight);

	console.log(getRed(value));

	currentPixel++;
	if(currentPixel == imageWidth*imageHeight)
		currentPixel = 0;
}
function getBlue(value)
{
	return Math.floor((3 & value) *85*getHighlight(value))
}
function getGreen(value)
{
	return Math.floor(((12 & value)>>2) *85*getHighlight(value))
}
function getRed(value)
{
	return Math.floor(((48 & value)>>4) *85*getHighlight(value))
}

// (196 & value)>>6)
// (3 & value)

function getHighlight(value)
{
	return 0.25+((196 & value)>>6)*0.25
}
