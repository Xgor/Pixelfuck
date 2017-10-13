
var canvasWidth = 512;
var canvasHeight = 512;
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

function onLoad()
{
	changeResolution();
}

function RunCode()
{
	currentPixel = 0
//	changeResolution();
	
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
		case '{':
			numbers[pointer]= numbers[pointer] << 1
			break;
		case '}':
			numbers[pointer] = numbers[pointer]>>1
			break;
		}
		index++;
	}
}

function setResolution(res)
{
	var radios = document.getElementsByName("resolution");
	for (var i = 0, length = radios.length; i < length; i++) {
	    if (radios[i].value == res) {
	        radios[i].checked = true;
	        break;
	    }
	}
}

function changeResolution()
{

	switch(document.querySelector('input[name="resolution"]:checked').value)
	{
	case "p8":
		imageWidth = 8
		imageHeight = 8
		break;
	case "p16":
		imageWidth = 16
		imageHeight = 16
		break;
	case "p32":
		imageWidth = 32
		imageHeight = 32
		break;
	}

	pixelWidth = canvasWidth/imageWidth;
	pixelHeight = canvasHeight/imageHeight;
}

function drawPixel(value)
{
	var ctx = canvas.getContext("2d");

	var x = currentPixel%imageWidth
	var y = Math.floor( currentPixel/imageWidth)
	ctx.fillStyle = 'rgb(' +getRed(value)+','+  getGreen(value)+','+ getBlue(value) + ')'
	ctx.fillRect(x*pixelWidth, y*pixelHeight, pixelWidth, pixelHeight);

//	console.log(getRed(value));

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

function getExample()
{
	var textarea = document.querySelector(".txtarea");

	switch(document.getElementById("example").value)
	{
	case "chess":
		textarea.innerHTML = "->>++++[<.<.>.<.>.<.>.<..>.<.>.<.>.<.>.>-]"
		setResolution("p8");
		break;
	case "pacman":
		textarea.innerHTML = "->---->>++++++[<......>-]<.<.....>.........<.........>.>++[<.....<...........>>-]<....<..........>......<.......>.....<<.>>...<.....>......<<...>>..<.......>.....<<.>>...<..........>..>++[<.....<...........>>-]<......<.........>.........<.....>>++++[<......>-]"
		setResolution("p16");
		break;
	case "colors":  
		textarea.innerHTML = ".+[.+]";
		setResolution("p16");
		break;
	}
	//RunCode();
	//alert('Selection changed!');
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
