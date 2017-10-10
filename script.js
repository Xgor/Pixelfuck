

function myFunction()
{
	var width = 64;
	var height = 64;
	var pointer = 0;
	var numbers = [];
	var loops = [];
	var text =document.querySelector(".text");
	var textarea = document.querySelector(".txtarea");
	text.innerHTML = "";

	for (var i = 0; i < width*height; i++) {
		numbers[i] = 0;
	}

	//for (var i = 0, len = textarea.value.length; i < len; i++) {
	var index = 0;
	while(index <textarea.value.length)
	{
		switch(textarea.value[index])
		{
		case '<':
			pointer--;
			//console.log(pointer);
			break;
		case '>':
			pointer++;
			break;
		case '+':
			numbers[pointer]++;
			break;
		case '-':
			numbers[pointer]--;
			break;
		case '.':
			text.innerHTML += String.fromCharCode(numbers[pointer]);

			break;
		case ',':
			break;
		case '[':
			loops.push(index);
			break;
		case ']':
			console.log(numbers[pointer]);
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
	//var c = document.getElementById("myCanvas");
	//var ctx = c.getContext("2d");
}