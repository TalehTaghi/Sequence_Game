const numbers = Array.from({length: 16}, (_, i) => i + 1);
const timer = document.getElementById("timer");
const cells = document.getElementsByTagName("td");


function Shuffle(array)
{
    let shuffledArray = array.slice();

    for (let i = shuffledArray.length - 1; i > 0; i--)
    {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[j];
        shuffledArray[j] = temp;
    }

    return shuffledArray;
}

function Table()
{
    let randomNumbers = Shuffle(numbers);
    
    for (let i = 0; i < randomNumbers.length; i++)
    {
        cells[i].innerText = randomNumbers[i];
        cells[i].style.backgroundColor = "black";
    }
}

function Finish(condition, countTime)
{
    let color;

    for(let cell of cells) cell.onclick = function () { return; };

    if (condition == "time")
    {
        color = "red";
        timer.innerHTML = `<i class="fas fa-thumbs-down" style="color: ${color}"></i><p>TIME OVER!</p>`;        
    }

    else if (condition == "lost")
    {
        color = "red";
        timer.innerHTML = `<i class="fas fa-thumbs-down" style="color: ${color}"></i><p>YOU LOST!</p>`;
    }

    else if (condition == "won")
    {
        color = "green";
        timer.innerHTML = `<i class="fas fa-thumbs-up" style="color: ${color}"></i><p>YOU WON!</p>`;
    }

    timer.style.backgroundColor = color;
    let replay = `<button onclick="Start()"><i class="fas fa-redo-alt" style="color: ${color}"></i></button>`;
    timer.innerHTML += replay;

    clearInterval(countTime);
}

function Timer()
{
    let timeLeft = 15;
    
    timer.style.display = "flex";
    timer.style.backgroundColor = "green";
    timer.innerText = `Time left: ${timeLeft} seconds`;  

    let countTime = setInterval(() => {
        timeLeft -= 1;

        if (timeLeft <= 0)
        {
            Finish("time", countTime);
        }

        else 
        {
            if (timeLeft <= 10)
            {
                timer.style.backgroundColor = "orange";
            }

            if (timeLeft <= 5)
            {
                timer.style.backgroundColor = "red";
            }

            timer.innerText = `Time left: ${timeLeft} seconds`;
        }
    }, 1000);

    return countTime;
}

function Game(countTime)
{
    let counter = 0;

    for(let cell of cells)
    {
        cell.onclick = function () {
            if (cell.innerText == ++counter)
            {
                cell.style.backgroundColor = "green";
            }
            else
            {
                cell.style.backgroundColor = "red";
                Finish("lost", countTime);
            }

            if (counter == 16)
            {
                Finish("won", countTime);
            }
        };
    }
}

function Start() 
{
    document.getElementById("start").style.display = "none";

    Table();
    let countTime = Timer();
    Game(countTime);
}