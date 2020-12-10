"use strict";

{
    const question = document.getElementById("question");
    const choices = document.getElementById("choices");
    const btn = document.getElementById("btn");
    const result = document.getElementById("result");
    const scoreLabel = document.querySelector("#result > p");

    const quizSet = shuffle([{
            q: "”skogstokig”の意味は？",
            c: ["森に首ったけな人", "ハイキング・マニア", "川で泳ぐのが好きな人"]
        },
        {
            q: "”klädd upp till tänderna”の意味は？",
            c: ["うまく着飾る", "化粧のノリがいい", "髪型がイケてる"]
        },
        {
            q: "”lätt som en plätt”の意味は？",
            c: ["とても容易く", "とても難しい", "そんなに難しくなく"]
        },
        {
            q: "”måla inte fan på väggen”の意味は？",
            c: ["人を見たら泥棒と思え", "石橋を叩いて渡る", "長い物には巻かれろ"]
        },
        {
            q: "”tala om trollen”の意味は？",
            c: ["噂をすれば", "口は災いの元", "悪魔のような"]
        },
        {
            q: "”skita i det blå skåpet”の意味は？",
            c: ["一線を超える", "犯罪を犯す", "コカインを吸う"]
        },
        {
            q: "”sex laxar i en lax ask”の意味は？",
            c: [
                "サーモンが6匹サーモン箱にある",
                "タコが6匹釣れた",
                "エッチなことをホテルでする"
            ]
        },
        {
            q: "”kasta inte pärlor åt svin”の意味は？",
            c: [
                "豚に真珠",
                "パンが無いならケーキを食べればいいじゃない",
                "最後の晩餐"
            ]
        },
        {
            q: "”bättre en fågel i handen än tio i skogen”の意味は？",
            c: ["明日の百より今日の五十", "雨降って地固まる", "貧すれば鈍する"]
        },
        {
            q: "”ensam är stark”の意味は？",
            c: ["1人は強い", "三人寄れば文殊の知恵", "孤独は一つの安心感である"]
        }
    ]);

    let currentNum = 0;
    let isAnswered;
    let score = 0;

    let to_timeup = 180;
    let max = 10;
    let intervalid;
    let start_flag = false;

    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i - 1]] = [arr[i - 1], arr[j]];
        }
        return arr;
    }

    function showMessage() {
        const message = document.getElementById('message');
        message.textContent = `Score:${  score }/${ quizSet.length };`
    }



    function checkAnswer(li) {
        if (isAnswered) {
            return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add("correct");
            score++;
        } else {
            li.classList.add("wrong");
        }

        btn.classList.remove("disabled");
    }


    function setQuiz() {
        isAnswered = false;

        question.textContent = quizSet[currentNum].q;

        while (choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }



        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach((choice) => {
            const li = document.createElement("li");
            li.textContent = choice;
            li.addEventListener("click", () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if (currentNum === quizSet.length - 1) {
            btn.textContent = "Show Score";
        }
    }



    setQuiz();
    let quiznum = currentNum;

    btn.addEventListener("click", () => {
        if (btn.classList.contains("disabled")) {
            return;
        }
        btn.classList.add("disabled");
        count_start();

        if (currentNum === quizSet.length - 1) {
            scoreLabel.textContent = `Score: ${ score }/${ quizSet.length }`;
            result.classList.remove("hidden");
        } else {
            currentNum++;
            count_start();
            setQuiz();
        }
    });



    function count_start() {
        if (start_flag === false) {
            intervalid = setInterval(count_down, 1000);
            start_flag = true;
        }
    }

    function count_down() {
        console.log("count_down");
        let timer = document.getElementById("timer");
        if (to_timeup === 0) {
            timer.innerHTML = 'TIME UP!';
            count_stop();

            scoreLabel.textContent = `Score:${ score }/${ quizSet.length }`;
            result.classList.remove('hidden');
            showMessage();
        } else {
            to_timeup--;
            padding();
        }
    }

    function padding() {
        let timer = document.getElementById("timer");
        let min = 0;
        let sec = 0;
        min = Math.floor(to_timeup / 60);
        sec = to_timeup % 60;
        min = ("0" + min).slice(-2);
        sec = ("0" + sec).slice(-2);
        timer.innerHTML = min + ":" + sec;
        message.innerHTML = (currentNum + 1) + "/" + "10";
    }

    function count_stop() {
        console.log(count_stop);
        clearInterval(intervalid);
        start_flag = false;
    }


    count_start();
    showMessage();
}