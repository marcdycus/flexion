var intervalId;
$(document).ready(function () {

    var trivia = [
        {
            questions: "What is yedda?",
            options: ["a type of yellow", "the former name of tokyo", "grass used to make straw hats", "a species of potato"],
            answer: "grass used to make straw hats",
        },
        {
            questions: "Labrose means what?",
            options: ["grotesque", "saggy lipped", "thick lipped", "a rose in a lab experiment"],
            answer: "thick lipped",
        },
        {
            questions: "A xanthippe is...",
            options: ["the scientific genus name for anteater", "the name of a pokemon", "a synonym for someone religious", "an ill-tempered woman"],
            answer: "an ill-tempered woman",
        },
        {
            questions: "All are synonyms for dictionary except...",
            options: ["lexicon", "thesaurus", "glossary", "reference"],
            answer: "thesaurus",
        },
        {
            questions: "Anatidaephobia is the fear of what?",
            options: ["a duck that is hiding and watching you", "mother-in-laws", "baths", "peanut butter getting stuck to the roof of your mouth"],
            answer: "a duck that is hiding and watching you",
        },
        {
            questions: "Steve Jobs relieved his stress how?",
            options: ["eating an entire box of oreos", "yoga", "psychidelic mushrooms", "soaking his feet in toilets"],
            answer: "soaking his feet in toilets",
        },
        {
            questions: "The last person to be executed by guillotine in Europe was in...",
            options: ["Belarus, 2018", "England, 1832", "France, 1977", "Germany, 1966"],
            answer: "France, 1977",
        },
        {
            questions: "In ancient Rome, when a man testified in court he would swear on...",
            options: ["the bible", "his testicles", "his mother", "his life"],
            answer: "his testicles",
        },
        {
            questions: "According to Michigan law, all of these are true except...",
            options: ["you must have a hunting license to hunt for unicorns", "a burgler can file a lawsuit if he's hurt in your home", "you can own a gun at the age of 12", "you may not swear in front of women or kids"],
            answer: "you may not swear in front of women or kids",
        },
        {
            questions: "The cookie monsters real name is...",
            options: ["Sid", "Garth", "Winston", "Pete"],
            answer: "Sid",
        }
    ];

    var wrong;
    var right;
    var start = false;
    var timerOn = false;
    var timeLeft = 16;
    var questionIndex;
    var showAnswer;

    var timer = {
        decrement: function (timeConverter) {
            timeLeft = timeLeft - 1;
            var converted = timeConverter(timeLeft);
            $("#timer").text(converted);
            if (!timerOn) {
                intervalId = setInterval(decrement, 1000);
                timerOn = true;
            }
            function timeConverter(t) {
                var minutes = Math.floor(t / 60);
                var seconds = t - (minutes * 60);

                if (seconds < 10) {
                    seconds = "0" + seconds;
                } return seconds;
            };

        },

    }


    $("#timer").text("15");
    var start = $("<button>");
    start.attr("id", "start");
    start.html("START");
    $("#container").prepend(start);

    $("#start").on("click", function () {
        timer.decrement();
        wrong = 0;
        right = 0;
        start = true;
        questionIndex = 0;
        $("#start").hide();
        question(questionIndex);
    });


    function question(qIndex) {

        timeLeft = 16;

        var quest = $("<div>");
        quest.attr("class", "quest");
        quest.html(trivia[qIndex].questions);
        $("#gameSpace").html(quest);

        for (var s = 0; s < trivia[qIndex].options.length; s++) {
            var ops = $("<button>");
            ops.attr("value", trivia[qIndex].options[s]);
            ops.append(trivia[qIndex].options[s]);
            $("#gameSpace").append(ops);

            ops.on("click", function (event) {

                if (event.target.value === trivia[qIndex].answer) {
                    right++;
                } else {
                    wrong++;
                }
                qIndex++
                if (qIndex === 10) {
                    clearInterval(timer);
                    $("#gameSpace").html("Right: " + right + "  Wrong: " + wrong);
                } else {
                    question(qIndex);
                };
            });
        }
    };



    function decrement() {
        timeLeft = timeLeft - 1;
        $("#timer").text(timeLeft);
        if (!timeLeft) {
            wrong++;
            timerOn = false;
            questionIndex++;
            question(questionIndex);
        }
    }

});
