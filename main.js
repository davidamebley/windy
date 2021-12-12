const SIZE = 1000;
var audioCtx;
var audioBuffer;


function main(){
	// SOUND INIT
	// window.addEventListener('mousedown', initSound);
  // window.addEventListener('mousedown', playThunderSound);
  window.addEventListener('load', playThunderSound);

	// ANIMATION
	setInterval(drawScene, 200);//Draw Scene every 200millis
}

function drawScene(){
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	
	//Forcing the canvas to have equal width and height
	canvas.width=SIZE;
	canvas.height=SIZE;

	// Giving our work some nice background
	drawBackground(ctx);

	//Defining some more properties for the sec. house
	let properties = {
		levels:4,
		wallColor:"brown",
		roofColor:getRandomColor(),
		door:false
	}

	//Adding mountains
	drawMountains(ctx, [SIZE*0.5,SIZE*0.8], SIZE*0.4);

	//Adding a tree
	drawTree3(ctx, [SIZE*0.8,SIZE*0.55], SIZE*0.15, properties);

	drawHouse(ctx, [SIZE*0.7,SIZE*0.6], SIZE*0.2, properties);
	//Drawing more houses
	drawHouse(ctx, [SIZE*0.6,SIZE*0.7], SIZE*0.3, properties);
	

	//Adding a tree
	drawTree1(ctx, [SIZE*0.10,SIZE*0.75], SIZE*0.4, properties);
	drawTree2(ctx, [SIZE*0.9,SIZE*0.75], SIZE*0.4, properties);
	//Defining some more properties for the house
	properties = {
		levels:6,
		wallColor:"brown",
		roofColor:"red",
		door:true
	}
	//House
	drawHouse(ctx, [SIZE*0.34,SIZE*0.8], SIZE*0.4, properties);

	//Adding more grass
	drawMultipleGrass(ctx,-1.2,0.4,-1.22,0.3,-1.25,0.35,-1.2,0.4,-1.19,0.3,-1.18,0.35,2,12);
	
}

// ************************AUDIO STUFF***********
function playThunderSound(){
	var audio = new Audio('https://bit.ly/3ESOaAa');
  //Play audio continuosly
  if (typeof audio.loop == 'boolean')
  {
      audio.loop = true;
  }
  else
  {
      audio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
  }
  audio.play();

}


// Giving our work some nice background
function drawBackground(ctx){
	//Sky
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = getSkyColor();
	ctx.rect(0,0,SIZE,SIZE*0.5);
	ctx.fill();

	//Ground/Grass
	ctx.beginPath();
	//Change grass bg color based on sky color
	if(getSkyColor() != "dark"){
		ctx.fillStyle = "green";
	}else{
		ctx.fillStyle = "rgba(0,50,0,1)";
	}
	ctx.rect(0,SIZE*0.5,SIZE,SIZE*0.5);
	ctx.fill();
	ctx.restore();
}
//Creating sky color
function getSkyColor(){
	return getRandomSkyColor();
}
//Gen. random sky color
function getRandomSkyColor(){
	let colors = ["dark", "lightblue", "white"];
	let max = 2; //Setting the range of possible values
	let min = 0;
	let color = 0;

	color = Math.floor(Math.random() * (max - min +1)) + min;
	return colors[color]; //Get random color from our list
}

//Creating a func to get rand color
function getRandomColor(){
	let red = Math.floor(Math.random()*255);
	let green = Math.floor(Math.random()*255);
	let blue = Math.floor(Math.random()*255);
	return "rgba("+red+","+green+","+blue+",1)";
}

function drawHouse(ctx, location, scale, properties){//Scale specifies the size of the drawing
	
	ctx.lineWidth=0.04;
	ctx.beginPath();
	
	ctx.save();//Store current context coordinates
	ctx.translate(location[0], location[1]); //Translate to specify which portion of the context to offset our drawing
	ctx.scale(scale, scale); //We specify the actual size of the house

	
	//Drawing the walls/body of the house
	ctx.fillStyle = properties.wallColor; //Gving color to walls
	for(let i=1; i<=properties.levels; i++){//Drawing the house to have levels
		ctx.beginPath();
		ctx.rect(-0.5, -0.1, 1.0, 0.1);//Params: x,y coordinates, width, height
		ctx.stroke();
		ctx.fill(); //Applying wall color
		ctx.translate(0, -0.1);//We want to move each level above the other
		ctx.rotate((Math.random()-0.5)*0.1);//in radians // We try to have a crooked house
		//360 deg. is 2 PI radians
	}

	//Drawing the roof of the house
	ctx.fillStyle = properties.roofColor; //Gving color to roof
	ctx.beginPath();
	//We set the y coordinate of each line to zero because it will be set automatically by the body of the house
	ctx.moveTo(-0.5,-0.0);
	ctx.lineTo(+0.5,-0.0);
	ctx.lineTo(+0.0,-0.4);//We set this manually for a nicer look. This is for the penacle of the roof
	ctx.lineTo(-0.5,-0.0);
	ctx.closePath();//To avoid weird drawn lines
	ctx.stroke();
	ctx.fill(); //Applying roof color
	
	ctx.restore();// Reset the translated coordinates to default
	
	//Adding a (door
		if (properties.door==true) {
			ctx.save();
			ctx.translate(location[0],location[1]);
			ctx.scale(scale,scale);
			ctx.lineWidth=0.04;
	
			ctx.fillStyle="black";
			ctx.beginPath();
			ctx.rect(0.1,-0.4,0.2,0.4);
			ctx.stroke();
			ctx.fill();

			ctx.restore();
	}
	//ctx.fillStyle="green";
	//ctx.fillRect(0,0,SIZE,SIZE);
}


//Adding grass
function drawGrass(ctx, location, scale, curveCoordinatesl, curveCoordinatesr){
	let spx = curveCoordinatesl[0];
	let spy = curveCoordinatesl[1];
	let cpx = curveCoordinatesl[2];
	let cpy = curveCoordinatesl[3];
	let epx = curveCoordinatesl[4];
	let epy = curveCoordinatesl[5];
	// Right leaf of grass
	let spxr = curveCoordinatesr[0];
	let spyr = curveCoordinatesr[1];
	let cpxr = curveCoordinatesr[2];
	let cpyr = curveCoordinatesr[3];
	let epxr = curveCoordinatesr[4];
	let epyr = curveCoordinatesr[5];

	ctx.lineWidth = 0.01;

	ctx.save();//STore cuurent context coordinates

	ctx.translate(location[0], location[1]); //Translate to specify which portion of the context to offset our drawing
	ctx.scale(scale, scale); //We specify the actual size of the grass

	//Drawing the left grass leaf
	ctx.beginPath();
	// ctx.strokeStyle = '#ff0000';
	ctx.moveTo(spx,spy);
	ctx.quadraticCurveTo(cpx,cpy,epx,epy);
	ctx.stroke();
	//Drawing the right grass leaf
	ctx.beginPath();
	ctx.moveTo(spxr,spyr);
	ctx.quadraticCurveTo(cpxr,cpyr,epxr,epyr);
	ctx.stroke();
	
	ctx.restore();// Reset the translated coordinates to default

}

//Mountains
function drawMountains(ctx, location, scale){
	ctx.lineWidth = 0.01;

	ctx.save();//STore cuurent context coordinates

	ctx.translate(location[0], location[1]); //Translate to specify which portion of the context to offset our drawing
	ctx.scale(scale, scale); //We specify the actual size of the grass

	//Drawing 1st Mnt
	ctx.fillStyle="rgba(120,150,0,1)";
	ctx.beginPath();
	// ctx.strokeStyle = '#ff0000';
	ctx.moveTo(-1.2,-0.7);
	ctx.quadraticCurveTo(-1.0,-1.1,-0.8,-0.7);
	ctx.stroke();
	ctx.fill();
	//Drawing 2nd Mnt
	ctx.fillStyle="rgba(120,150,0,1)";
	ctx.beginPath();
	// ctx.strokeStyle = '#ff0000';
	ctx.moveTo(-0.2,-0.7);
	ctx.quadraticCurveTo(0.0,-1.5,0.3,-0.7);
	ctx.stroke();
	ctx.fill();
	//Drawing 3rd Mnt
	ctx.fillStyle="rgba(120,150,0,1)";
	ctx.beginPath();
	// ctx.strokeStyle = '#ff0000';
	ctx.moveTo(0.6,-0.7);
	ctx.quadraticCurveTo(1.0,-1.3,1.3,-0.7);
	ctx.stroke();
	ctx.fill();

	ctx.restore();
}

//Function to repeat grass
function drawMultipleGrass(ctx,spx,spy,cpx,cpy,epx,epy,spxr,spyr,cpxr,cpyr,epxr,epyr,nrows,ncols){
	let nspx = spx;
	let nspy = spy;
	let ncpx = cpx;
	let ncpy = cpy;
	let nepx = epx;
	let nepy = epy;
	// Right leaf of grass
	let nspxr = spxr;
	let nspyr = spyr;
	let ncpxr = cpxr;
	let ncpyr = cpyr;
	let nepxr = epxr;
	let nepyr = epyr;
	for(let i=1; i<=nrows;i++){

		for(let j=1; j<=ncols; j++){
		drawGrass(ctx, [SIZE*0.5,SIZE*0.8], SIZE*0.4, [nspx,nspy,ncpx,ncpy,nepx,nepy], [nspxr,nspyr,ncpxr,ncpyr,nepxr,nepyr]);
		nspx=nspx+0.2,ncpx=ncpx+0.2,nepx=nepx+0.2;
		nspxr=nspxr+0.2,ncpxr=ncpxr+0.2,nepxr=nepxr+0.2;
		// spxr=,spyr=,cpxr=,cpyr=,epxr=,epyr=;
		}

		nspx=spx,nspy=spy-0.2,ncpx=cpx,ncpy=cpy-0.2,nepx=epx,nepy=epy-0.2;
		nspxr=spxr,nspyr=spyr-0.2,ncpxr=cpxr,ncpyr=cpyr-0.2,nepxr=epxr,nepyr=epyr-0.2;

	}
}

//Adding 1st tree
function drawTree1(ctx, location, scale, properties){//Scale specifies the size of the drawing
	
	ctx.lineWidth=0.04;
	ctx.beginPath();
	
	ctx.save();//Store current context coordinates
	ctx.translate(location[0], location[1]); //Translate to specify which portion of the context to offset our drawing
	ctx.scale(scale, scale); //We specify the actual size of the tree

	//Trunk of tree
	ctx.fillStyle = properties.wallColor;
	ctx.beginPath();
	ctx.rect(-0.02, -0.1, 0.04, 0.1);//Params: x,y coordinates, width, height
	ctx.stroke();
	ctx.fill(); //Applying color

	ctx.translate(0,-0.1);
	ctx.rotate((Math.random()-0.5)*0.7);

	//Top/Leaves of tree
	//Changing color shade based on sky color
	if(getSkyColor() !== "dark"){
		ctx.fillStyle = "rgba(0,255,0,1)";
	}else{
		ctx.fillStyle = "rgba(0,50,0,1)";
	}
	ctx.beginPath();
	ctx.moveTo(-0.2,-0.0);
	ctx.lineTo(+0.2,-0.0);
	ctx.lineTo(+0.0,-0.9);
	ctx.lineTo(-0.2,-0.0);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	ctx.restore();
}

//Adding 2nd tree
function drawTree2(ctx, location, scale, properties){//Scale specifies the size of the drawing
	
	ctx.lineWidth=0.04;
	ctx.beginPath();
	
	ctx.save();//Store current context coordinates
	ctx.translate(location[0], location[1]); //Translate to specify which portion of the context to offset our drawing
	ctx.scale(scale, scale); //We specify the actual size of the tree

	//Trunk of tree
	ctx.fillStyle = properties.wallColor;
	ctx.beginPath();
	ctx.rect(-0.02, -0.1, 0.04, 0.1);//Params: x,y coordinates, width, height
	ctx.stroke();
	ctx.fill(); //Applying color

	ctx.translate(0,-0.1);
	ctx.rotate((Math.random()-0.5)*0.7);

	//Top/Leaves of tree
	//Changing color shade based on sky color
	if(getSkyColor() != "dark"){
		ctx.fillStyle = "rgba(0,255,0,1)";
	}else{
		ctx.fillStyle = "rgba(0,50,0,1)";
	}
	ctx.beginPath();
	ctx.moveTo(-0.2,-0.0);
	ctx.lineTo(+0.2,-0.0);
	ctx.lineTo(+0.0,-0.9);
	ctx.lineTo(-0.2,-0.0);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	ctx.restore();
}

//Adding 3rd tree
function drawTree3(ctx, location, scale, properties){//Scale specifies the size of the drawing
	
	ctx.lineWidth=0.04;
	ctx.beginPath();
	
	ctx.save();//Store current context coordinates
	ctx.translate(location[0], location[1]); //Translate to specify which portion of the context to offset our drawing
	ctx.scale(scale, scale); //We specify the actual size of the tree

	//Trunk of tree
	ctx.fillStyle = properties.wallColor;
	ctx.beginPath();
	ctx.rect(-0.02, -0.1, 0.04, 0.1);//Params: x,y coordinates, width, height
	ctx.stroke();
	ctx.fill(); //Applying color

	ctx.translate(0,-0.1);
	ctx.rotate((Math.random()-0.5)*0.7);

	//Top/Leaves of tree
	//Changing color shade based on sky color
	if(getSkyColor() != "dark"){
		ctx.fillStyle = "rgba(0,255,0,1)";
	}else{
		ctx.fillStyle = "rgba(0,50,0,1)";
	}
	ctx.beginPath();
	ctx.moveTo(-0.2,-0.0);
	ctx.lineTo(+0.2,-0.0);
	ctx.lineTo(+0.0,-0.9);
	ctx.lineTo(-0.2,-0.0);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();

	ctx.restore();
}

function removeOverlay(){
	let element = document.getElementById("overlay")
	element.style.display="none";
}