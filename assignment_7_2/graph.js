/*graph.js file*/

function getEquation(){				/* This function will parse the given equation and find the points */
	var eq=document.getElementById("equation").value;
	var start=document.getElementById("start").value -0;
	var steps=document.getElementById("steps").value-0;
	var end=document.getElementById("end").value-0;
	var i=0;
	var len=eq.length;
	var x_coeff=0;
	var y_coeff=0;
	var constant=0;
	var y1=0,x1=0,y2=0,x2=0;
	var stepSize=0;
	var x=[],y=[];
	if(eq[0]=="x")
	{
		x_coeff= 1;
	}
	else
	{
		while(eq[i]!="x")
		{
			x_coeff=x_coeff + eq[i];
			i++;
		}
		x_coeff[i]='\0';
	}
	i++;
	if(eq[i]=="+" || eq[i]=="-")
	{
		i++;
		if(eq[i]=="y")
		{
			y_coeff=1;
		}
		else
		{
			while(eq[i]!="y")
			{
				y_coeff=y_coeff+eq[i];		
				i++;	
			}
			y_coeff[i]='\0';
		}
	}
	i++;
	if(eq[i]=="=")
	{
		i++;
		while(eq[i]<=len)
		{
			constant=constant+eq[i];	
			i++;	
		}
	}
	constant[i]='\0';

	var i=0,j=0;
	for(j=0,i=start;i<=end && j<=end;i+=steps,j++)		/*Calculate points  based on user input*/
	{
		x[j]=i;
		y[j]=(constant - (i*x_coeff))/y_coeff;
	}
	
	plotLine(x,y,j);					/* Call plotLine function to plot line*/
							/* x and y are calculated point array and j is the end locatoin of arrays*/
}

function plotLine(x,y,j){
	var c = document.getElementById("canvas");      /*get the canvas by it's id*/
	var ctx = c.getContext('2d');			/*Use canvas drawing properties*/

	/*for some points line is too small so scale x and y by fixed point, we can even scale it by steps*/		
	for(i=0;i<j;i++)
	{
		x[i]=x[i]*5;
		y[i]=y[i]*5;
	}
	for(i=0;i<j;i++)				/*Plot points*/
	{
		ctx.rect(x[i],y[i],2,2);
		ctx.stroke();
	}

	ctx.beginPath();				/*Connect points by line*/
 	ctx.moveTo(x[0],y[0]);
    	ctx.lineTo(x[j-1],y[j-1]);
  	ctx.strokeStyle="red";
  	ctx.stroke();


}

window.onload = function() {				/*On loading the page it should show graph  axes*/
	var c = document.getElementById("canvas");
	var ctx = c.getContext('2d');
	ctx.translate(10, canvas.height-10);		/*Translate origin to lower left corner*/
	ctx.scale(1,-1);				/*set the scale to match translated origin*/

	ctx.beginPath();				/*draw x-Axis */
	ctx.moveTo(0,0);
	ctx.lineTo(canvas.width,0);
	ctx.strokeStyle="green";
	ctx.stroke();

	for(i=10;i<=canvas.width;i+=10)
	{						/*Make markings on the graph at interval 0f 10*/
		ctx.moveTo(i*5,0);
		ctx.lineTo(i*5,10);
		ctx.strokeStyle="green";
		ctx.stroke();
	}


	ctx.moveTo(0,0);				/*draw y-Axis*/
	ctx.lineTo(0,canvas.height);
	ctx.strokeStyle="green";
	ctx.stroke();

	for(i=10;i<=canvas.height;i+=10)
	{
		ctx.moveTo(0,i*5);
		ctx.lineTo(10,i*5);
   		ctx.strokeStyle="green";
  		ctx.stroke();
	}
}


