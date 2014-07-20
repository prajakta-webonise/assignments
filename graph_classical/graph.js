/*graph.js file*/


function graph () {						/*parent */
	var c = document.getElementById("canvas");
	this.ctx = c.getContext('2d');
}

graph.prototype.get= function()					/*get method of parent*/
{
	this.ctx.translate(10, canvas.height-10);		/*Translate origin to lower left corner*/
	this.ctx.scale(1,-1);					/*set the scale to match translated origin*/
}

graph.prototype.drawAxes=function()				/*draw axes of graph. It extends graph */
{
	this.ctx.beginPath();					/*draw x-Axis */
	this.ctx.moveTo(0,0);
	this.ctx.lineTo(canvas.width,0);
	this.ctx.strokeStyle="green";
	this.ctx.stroke();

	for(i=10;i<=canvas.width;i+=10)
	{							/*Make markings on the graph at interval 0f 10*/
		this.ctx.moveTo(i*5,0);
		this.ctx.lineTo(i*5,10);
		this.ctx.strokeStyle="green";
		this.ctx.stroke();
	}


	this.ctx.moveTo(0,0);					/*draw y-Axis*/
	this.ctx.lineTo(0,canvas.height);
	this.ctx.strokeStyle="green";
	this.ctx.stroke();

	for(i=10;i<=canvas.height;i+=10)
	{
		this.ctx.moveTo(0,i*5);
		this.ctx.lineTo(10,i*5);
   		this.ctx.strokeStyle="green";
  		this.ctx.stroke();
	}
}


graph.prototype.getEquation = function(){			/* This function will parse the given equation and find the points */
	var equation=document.getElementById("equation").value;
	var start=document.getElementById("start").value -0;
	var steps=document.getElementById("steps").value-0;
	var end=document.getElementById("end").value-0;
	var i=0;
	var length=equation.length;
	var x_coeff=0;
	var y_coeff=0;
	var constant=0;
	var x=[],y=[];
	var graphObject = new graph();
	if(equation[0]=="x")						/*parse till you get x and get it's coefficient*/
	{
		x_coeff= 1;
	}
	else
	{
		while(equation[i]!="x")
		{
			x_coeff=x_coeff + equation[i];
			i++;
		}
		x_coeff[i]='\0';
	}
	i++;							
	if(equation[i]=="+" || equation[i]=="-")				/*If + or - sign move ahead*/
	{
		i++;
		if(equation[i]=="y")					/*parse till you get y and get it's coefficient*/
		{
			y_coeff=1;
		}
		else
		{
			while(equation[i]!="y")
			{
				y_coeff=y_coeff+equation[i];		
				i++;	
			}
			y_coeff[i]='\0';
		}
	}
	i++;
	if(equation[i]=="=")						/*parse till end of string to get constant*/	
	{
		i++;
		while(equation[i]<=length)
		{
			constant=constant+equation[i];	
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
	

	for(i=0;i<j;i++)					/*Scale points,because in some case line is too small*/
	{
		x[i]=x[i]*5;
		y[i]=y[i]*5;
	}
	for(i=0;i<j;i++)					/*Plot points*/
	{
		this.ctx.rect(x[i],y[i],2,2);
		this.ctx.stroke();
	}
	graphObject.plotLine(x,y,j);
}

graph.prototype.plotLine= function(x,y,j)					/*get method of parent class*/
{
	this.ctx.beginPath();					/*Connect points by line*/
	this.ctx.moveTo(x[0],y[0]);
    	this.ctx.lineTo(x[j-1],y[j-1]);
  	this.ctx.strokeStyle="red";
  	this.ctx.stroke();

}


window.onload = function(){					/*On load it displays x and y axes*/
	var graphObj = new graph();
	graphObj.get();
	graphObj.drawAxes();					/* call child method drawAxes*/
	document.getElementById("enter").onclick = function(){  /*On click of submit button child methhod getEquation is called*/
		graphObj.getEquation();
	};
}



