var WWTBAM = WWTBAM || {};

WWTBAM.Game = function() {
    // Here's our array of questions in the following format :
    // [question, potential answers, answer, money]
    questions = [
        ['In Orwell’s Animal Farm, what animal calls for the overthrow of humans?', ['A. Cats', 'B. Pigs', 'C. Dogs', 'D. Horses'], 'B. Pigs', 1000],
        ['Which does George Orwell support for?', ['A. Totalitarianism', ' B. Stalinism', 'C. Anarchism', 'D. Democratic socialism'], 'D. Democratic socialism', 5000],
        ['Where was Yeats born?', ['A. Ireland', 'B. France', 'C. Poland', 'D. Italy'], 'A. Ireland', 10000],
        ['Which is not the work of Yeats?', ['A. The Second Coming', 'B. When you are old', 'C. Leda and the Swan', 'D. The Chimney Sweeper'], 'D. The Chimney Sweeper', 40000],
        ['In Yeats’ “The Lake Isle of Innisfree”, what is the reasoning behind his desire to travel to Innisfree?', ['A. love', 'B. peace', 'C. family', 'D. career'], 'B. peace', 80000],
        ['Which film is interconnected with the novel Mrs. Dalloway?', ['A. Gone with the Wind', 'B. The Hours', 'C. Pride & Prejudice', "D. Breakfast at Tiffany's"], 'B. The Hours', 100000],
        ['Which war did George Orwell voluntarily fight in?', ['A. World War I', 'B. World War II', 'C. Spanish Civil War', 'D. Irish War of Independence'], 'C. Spanish Civil War', 300000],
        ['What kind of job was Joseph Conrad when he was young, and then this career experience affected his work, “Heart of Darkness”?', ['A. teacher', 'B. priest', 'C. sailor', 'D. painter'], 'C. sailor', 600000],
        ['Which is not the theme about Conrad’s “Heart of Darkness”?', ['A. racial discrimination', 'B. feminism', 'C. anti-war', 'D. anti-colonial'], 'C. anti-war', 700000],
        ['What doctrine is Joseph Conrad regarded as a pioneer?', ['A. romanticism', 'B. utopianism', 'C. humanitarianism', 'D. modernism'], 'D. modernism', 800000],
        ['What is Woolf’s Mrs. Dalloway commonly considered to be a response to?', ['A. Ulysses', 'B. The Lady with the Dog', 'C. A Rose for Emily', 'D. A Doll House'], 'A. Ulysses', 900000],
        ['What is the narrative method of Woolf’s Mrs. Dalloway?', ['A. stream of consciousness', 'B. multiperspectivity', 'C. first-person narrative', 'D. stream of unconsciousness'], 'A. stream of consciousness', 1000000],
    ];

    // Here are out variables
    // This will store the correct answer each time a question is asked
    var correctAnswer;
    // This is to output the question in the HTML
    var questionBox = $('.question');
    // Output the question number in here
    var questionNumber = $('.question-number');
    // This is the answers box, so we can output them inside
    var answers = $('.answers');
    // Restart button for if they go bust
    var restart = $('.restart');
    // This will show the amount of funds a player has
    var bank = $('.bank');
    // Fifty fifty button
    var fiftyFifty = $('.fifty-fifty');
    // Lineline shared class
    var lifeLine = $('.lifeline');

    // This is our question counter so we can go through each
    Qnum = -1;

    // These are the functions we call initially
    function init() {
        // We start off by calling the nextQuestion() function to start the quiz	
        nextQuestion();

        // If the restart button is clicked then we call the reStart() function
        restart.click(reStart);
    }

    // Here's our starting point, it's also the place we will come back to when we want to ask the next question
    function nextQuestion() {

        // Starting the question number off at 0, as arrays start at 0
        // If we're coming here for a second time it's going to add one onto the previous number 
        // so the 2nd time this function is called the Qnum would be 1 therefore asking the 2nd question from the array
        Qnum = Qnum + 1;

        console.log("qnum is " + Qnum)

        // Find out the total length of the questions, we need to know when to stop
        var total = questions.length;

        // If the question number is lower than the total then we can ask that question
        if (Qnum < total) {

            // Ask the question and pass the question number onto the function
            askQuestion(Qnum);

        }

        // If they've answered every question then lucky them - they're a millionaire
        else {

            // Change balance to a million
            bank.html("Money : $1000000");
            // We don't want to see a question so outputting a message instead
            questionBox.html("You're a millionaire");
            // We don't want to see any answers here
            answers.hide();
            // We don't want to see a reset button here
            restart.show();
            // We don't want to see the question number here
            questionNumber.hide();
            //Hide the lifeline buttons
            lifeLine.hide();

        }

    }

    // This outputs the question so the user can answer notice the counterNum which gives us the correct question from the array
    function askQuestion(counterNum) {

        // Take the question from the array and output it into $('.question')
        // Notice the [][], I'm accessing the [1st element in the questions array] and [first thing inside that 1st element] 
        questionBox.html(questions[counterNum][0]);

        questionNumber.html('Question number ' + (counterNum + 1));

        // Clear the answers box
        $('.answers').empty();

        // Output the answers also incuding a data attribute which contains the answer
        // Remove any whitesapce from the answers
        answers.append('<button type="button" data-answer=' + questions[counterNum][1][0].replace(/ /g, '') + '>' + questions[counterNum][1][0] + '</button>');
        answers.append('<button type="button" data-answer=' + questions[counterNum][1][1].replace(/ /g, '') + '>' + questions[counterNum][1][1] + '</button>');
        answers.append('<button type="button" data-answer=' + questions[counterNum][1][2].replace(/ /g, '') + '>' + questions[counterNum][1][2] + '</button>');
        answers.append('<button type="button" data-answer=' + questions[counterNum][1][3].replace(/ /g, '') + '>' + questions[counterNum][1][3] + '</button>');

        // Taking the 4th element from the array(money) and outputting it
        bank.html("Money : $" + questions[counterNum][3]);

        // Taking the answer from the array and storing it in global variable
        correctAnswer = questions[counterNum][2];

        console.log("Answer is " + correctAnswer);

        // Remove spaces and change to lowercase
        correctAnswer = correctAnswer.replace(/ /g, '').toLowerCase();

        // Once they click an answer we call the answerQuestion function 
        $('.answers button').on('click', answerQuestion);

        // Fifty Fifty functionality
        fiftyFifty.click(function() {

            // Hide the button
            fiftyFifty.hide();

            // start a count as we only want to remove 2 answers
            fiftyFiftycount = 0;

            //Loop through each li and check what the answers are
            $(".answers button").each(function() {

                // If count is lower than 2 then we will remove 2 incorrect answers
                if (fiftyFiftycount < 2) {

                    // If the li answer is NOT equal to the correct answer then we can remove it
                    if ($(this).data('answer').replace(/ /g, '').toLowerCase() != correctAnswer) {

                        // Hide it
                        $(this).hide();

                        // Add one to the count!
                        fiftyFiftycount = fiftyFiftycount + 1;

                    }

                }

            });

        });

    }

    // This function detects if they answered correctly
    function answerQuestion() {

        // Unbind the answer button
        $('.answers button').off();

        // Take the data attribute form the answer the user clicked and remove spaces and change to lowercase
        var UserAnswer = $(this).data('answer').replace(/ /g, '').toLowerCase();

        // Does the answer match the correct answer we stored in the variable?
        if (UserAnswer == correctAnswer) {

            // If it does then ask the next question
            nextQuestion();

        }

        // If it doesn't then they have lost and we need to reset the game
        else {

            // Tell them they've lost
            questionBox.html("Sorry you've lost your money");
            // Reset the bank balance
            bank.html("Money : $0");
            // We don't want to see any answers here
            answers.hide();
            // We do want to see a reset button here
            restart.show();
            // We don't want to see the question number here
            questionNumber.hide();
            //Show the lifeline buttons
            lifeLine.hide();
        }

    }

    // If they player fails the game they need to restart with this function
    function reStart() {

        // Reset the Qnum back to the beginning
        Qnum = -1;
        // Start the quiz off just as we did at the start calling the nextQuestion() function
        nextQuestion();
        // We need to see the answers again
        answers.show();
        // We don't want to see a reset button here 
        restart.hide();
        // We do want to see the question number here
        questionNumber.show();
        //Show the lifeline buttons
        lifeLine.show();
        // Show the button
        fiftyFifty.show();
    }

    init();
};

window.onload = function() {
    new WWTBAM.Game();
};

// // ON DOC READY
// $(function() {
//     new WWTBAM.Game();

// });