$(document).ready(function(){

	var timeRemain = 19;
	var correctNumber = 0;
	var incorrectNumber = 0;

	var questionOne = "";
	var questionTwo = "";
	var questionThree = "";
	//Number of questions gone through
	var iterations = 0;
	//Keeps track of answered questions
	var checkOne = false;
	var checkTwo = false;
	var checkThree = false;

	var timedOut = true;
	//Makes it so the user can't pick the right answer after missing a question
	var hold = false;


	//Runs the game
	var countdown =	setInterval(function()
		{
			processGame();
		},
	1000);


	//Checks all the answers to see if they're right or wrong, and keeps track of right and wrong answers
	function checkAnswers()
	{

		if(iterations == 0)
		{

			if(questionOne == "White Wolf" && checkOne != true)
			{
				$("#answer1").html("Correct");
				correctNumber++;
			}

			if(questionOne != "White Wolf" && checkOne != true)
			{
				$("#answer1").html("Incorrect, timed out. Correct Answer: A");
				incorrectNumber++;
			}
			$("#answer1").show();
		}
			//-------------------------------------------------------------------

		if(iterations == 1)
		{
			if(questionTwo == "720" && checkTwo != true)
			{
				$("#answer2").html("Correct");
				correctNumber++;
			}

			if(questionTwo != "720" && checkTwo != true)
			{
				$("#answer2").html("Incorrect, timed out. Correct Answer: D");
				incorrectNumber++;
			}
			$("#answer2").show();
		}
			//-------------------------------------------------------------------

		if(iterations == 2)
		{
			if(questionThree == "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch" && checkThree != true)
			{
				$("#answer3").html("Correct");
				correctNumber++;
			}

			if(questionThree != "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch" && checkThree != true)
			{
				$("#answer3").html("Incorrect, timed out. Correct Answer: C");
				incorrectNumber++;
			}
			$("#answer3").show();
		}
			//-------------------------------------------------------------------
		if(iterations == 3)
		{
			$("#statsRight").html("Correct: " + correctNumber);
			$("#statsWrong").html("Incorrect: " + incorrectNumber);

			$("#question1Container").show();
			$("#question2Container").show();
			$("#question3Container").show();

			$("#answer1").show();
			$("#answer2").show();
			$("#answer3").show();
			$("#statsContainer").show();
			$("#buttonContainer").show();
		}
	}



	//Shows the correct question
	function updateQuestions() 
	{


		if(iterations == 0)
		{
			questionOne = $("input[type=radio][name=Q1]:checked").val();
			$("#question1Container").hide();
			$("#question2Container").show();
		}


		if(iterations == 1)
		{
			questionTwo = $("input[type=radio][name=Q2]:checked").val();
			$("#question2Container").hide();
			$("#question3Container").show();	
		}

		if(iterations == 2) 
		{
			questionThree = $("input[type=radio][name=Q3]:checked").val();
			$("#question3Container").hide();		
		}
	}



	//Looks to see if a radio button has been selected. If so, checks if it's right or wrong.
	function checkButtons()
	{
		if(iterations == 0 && checkOne == false)
		{
			if($("input[type=radio][name=Q1]").is(":checked"))
			{
				timeRemain = 5;
				questionOne = $("input[type=radio][name=Q1]:checked").val();

				if(questionOne == "White Wolf")
				{
					$("#answer1").html("Correct");
					correctNumber++;
				}

				if(questionOne != "White Wolf")
				{
					$("#answer1").html("Incorrect. Correct Answer: A");
					incorrectNumber++;
				}

				$("#answer1").show();
				$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");
				checkOne = true;
				timedOut = false;

			}
		}


		if(iterations == 1 && checkTwo == false)
		{
			if($("input[type=radio][name=Q2]").is(":checked"))
			{

				timeRemain = 5;
				questionTwo = $("input[type=radio][name=Q2]:checked").val();

				if(questionTwo == "720")
				{
					$("#answer2").html("Correct");
					correctNumber++;
				}

				if(questionTwo != "720")
				{
					$("#answer2").html("Incorrect. Correct Answer: D");
					incorrectNumber++;
				}

				$("#answer2").show();
				$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");
				checkTwo = true;
				timedOut = false;
	
			}
		}


		if(iterations == 2 && checkThree == false)
		{
			if($("input[type=radio][name=Q3]").is(":checked"))
			{

				timeRemain = 5;
				questionThree = $("input[type=radio][name=Q3]:checked").val();

				if(questionThree == "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch")
				{
					$("#answer3").html("Correct");
					correctNumber++;
				}

				if(questionThree != "Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch")
				{
					$("#answer3").html("Incorrect. Correct Answer: C");
					incorrectNumber++;
				}

				$("#answer3").show();
				$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");
				checkThree = true;
				timedOut = false;
			}
		}



	}


	//Checks the times/if the user has selected an answer
	function processGame()
	{
			if(hold == false)
			{	
				checkButtons();
			}
				
			$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");
			//Once the time hits 0, if the user didn't click a button it displays if they got it right or wrong, and if they did click a button then it goes to the next question since checkButtons handles display as well
			if(timeRemain == 0 && iterations != 3)
			{

				if(timedOut == true)
				{
					timeRemain = 5;
					$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");
					checkAnswers();
					timedOut = false;
					hold = true;
				}



				else if(timedOut == false)
				{	
					timeRemain = 20;
					$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");

					updateQuestions();
					iterations++;

					timedOut = true;
					hold = false;
				}

			}

			if(iterations == 3)
			{
				checkAnswers();
				clearInterval(countdown);
				$("#timeLeft").html("Time Remaining: Time's up!");
			}

			timeRemain--;
	}





	//Resets the game's variables and unchecks the radio buttons, and then runs the game again
	$("#resetGame").click(function(){ 

		$("input[type=radio][name=Q1]").prop("checked", false);
		$("input[type=radio][name=Q2]").prop("checked", false);
		$("input[type=radio][name=Q3]").prop("checked", false);

		clearInterval(countdown);
		$("#question1Container").show();
		$("#question2Container").hide();
		$("#question3Container").hide();

		$("#answer1").hide();
		$("#answer2").hide();
		$("#answer3").hide();
		$("#statsContainer").hide();
		$("#buttonContainer").hide();

		timeRemain = 20;
		$("#timeLeft").html("Time Remaining: " + timeRemain + " Seconds");
		correctNumber = 0;
		incorrectNumber = 0;

		questionOne = "";
		questionTwo = "";
		questionThree = "";
		//Number of questions gone through
		iterations = 0;
		//Keeps track of answered questions
		checkOne = false;
		checkTwo = false;
		checkThree = false;

		timedOut = true;
		//Makes it so the user can't pick the right answer after missing a question
		hold = false;


		countdown = setInterval(function()
		{
			processGame();
		},
		1000);
	});





});