
var canvasWidth = 256;
var canvasHeight = 256;
var imageWidth = 8;
var imageHeight = 8;

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

	var text =document.querySelector(".text");
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
			break;
		case '.':
			text.innerHTML += String.fromCharCode(numbers[pointer]);
			drawPixel(numbers[pointer])
			break;
		case ',':
			break;
		case '[':
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
			//
			break;
		}

		//console.log(textarea.value.length);
		index++;
	}
}



function drawPixel(value)
{
//	var c = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");

	var x = currentPixel%imageWidth
	var y = Math.floor( currentPixel/imageWidth)
	//ctx.fillStyle = 'rgb(' +getRed(value)+','+  getBlue(value)+','+ getGreen(value) +','+ getAlpha(value)+ ')'
	ctx.fillStyle = 'rgb(' +getRed(value)+','+  getBlue(value)+','+ getGreen(value) + ')'
	ctx.fillRect(x*pixelWidth, y*pixelHeight, pixelWidth, pixelHeight);

	console.log('rgb(' +getRed(value)+','+  getBlue(value)+','+ getGreen(value) + ')')

	currentPixel++;
	if(currentPixel == imageWidth*imageHeight)
		currentPixel = 0;
}
function getRed(value)
{
	return (3 & value) *64+getHighlight(value)
}
function getBlue(value)
{
	return ((12 & value)>>2) *64+getHighlight(value)
}
function getGreen(value)
{
	return ((48 & value)>>4) *64+getHighlight(value)
}

// function 

function getHighlight(value)
{
	return ((196 & value)>>6) *16
}

//function getAlpha(value)
//{
//	return 255
//	return ((196 & value)>>6) /4
//}