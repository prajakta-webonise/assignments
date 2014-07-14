$('document').ready(function(){						/* Run the code when document is ready */
	$('input[type="submit"]').click(function(){			/* on click of button check which radio button is on and assign color accordingly */
		if(!$('input[type="radio"]').is(':checked'))    	/* If none of the radio button is selected */
		{
			alert("Please select one of the radio button");
		}
		else if($('#green').is(':checked'))
    		{
        		if($(this).hasClass('blue') || $(this).hasClass('gray')|| $(this).hasClass('red'))
			{
				$(this).removeClass();
		  		$(this).addClass('green');
			}
			if(!$(this).hasClass('green'))
				$(this).addClass('green');
		}
		else if($('#red').is(':checked'))
		{
        		if(!$(this).hasClass('red'))
				$(this).addClass('red');
			if($(this).hasClass('blue') || $(this).hasClass('gray')|| $(this).hasClass('green'))
			{
			   $(this).removeClass();
	   		   $(this).addClass('red');
			}
		}
		else if($('#blue').is(':checked'))
		{
			if(!$(this).hasClass('blue'))
			        $(this).addClass('blue');
		 	if($(this).hasClass('gray'))
			{
				$(this).removeClass('gray');
			        $(this).addClass('blue');
			}
    		}
    
	});

	$('#reset').click(function(){						/*Reset the color and the uncheck radio buttons*/
	        $('input[type="submit"]').addClass('gray');
		$('input[type="radio"]').attr('checked',false);
		$("#button1").after($("#button2"));
		$("#button2").after($("#button3"));
		$("#button4").after($("#button5"));
		$("#button5").after($("#button6"));
		$("#button7").after($("#button8"));
		$("#button8").after($("#button9"));
	});

	$('#shuffle').click(function(){						/*Shuffle the buttons along with color*/
        	$("#button1").before($("#button2"));
		$("#button1").before($("#button3"));
		$("#button4").before($("#button5"));
		$("#button4").before($("#button6"));
		$("#button7").before($("#button8"));
		$("#button7").before($("#button9"));
	});

});
