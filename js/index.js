let ANIMATION_LENGTH = 1000;

let randomizeArray = document.getElementById("array-randomizer");

let bubbleSortBtn = document.getElementById("bubble-sort-button");
let quickSortBtn = document.getElementById("quick-sort-button");

let slider = document.getElementById("slider");

let barsContainer = document.getElementById("bars-container")
let minRange = 1;
let maxRange = 20;
let barsAmount = 20;
let unsortedArray = new Array(barsAmount);

const sliderProps = {
    '1':1,
    '2':2,
    '3':5,
    '4':10,
    '5': 100,
}

function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray(){
    for (let i = 0; i < barsAmount; i++){
        unsortedArray[i] = randomNum(minRange, maxRange);
    }
}


document.addEventListener("DOMContentLoaded", ()=>{
    createRandomArray();
    renderBars(unsortedArray);
});

function renderBars(array){
    for(let i = 0; i < array.length; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${array[i] * 10}px`;
        bar.style.backgroundColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
        barsContainer.appendChild(bar);
    }
}

randomizeArray.addEventListener("click", ()=>{
    createRandomArray();
    barsContainer.innerHTML = "";
    renderBars(unsortedArray);
})

slider.addEventListener("change", ()=>{
    let sliderVal = slider.value;
    let sliderLabel = document.getElementById("slider-label")
    sliderLabel.innerHTML = "x" + sliderProps[sliderVal] ;
    ANIMATION_LENGTH = 1000 / sliderProps[sliderVal];
})

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function bubbleSort(arr){
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < arr.length; i++){

        for (let j = 0; j < arr.length - i - 1; j++){
            
            if (arr[j] > arr[j+1]){

                for (let k = 0; k < bars.length; k++){
                    if(k !== j && k !== j + 1){
                        bars[k].style.backgroundColor = "white";
                    }
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                let position = bars[j].style.transform ? parseInt(bars[j].style.transform.match(/\d+/)[0], 10) : 0;

                bars[j].style.transform = `translateX(${position + 34}px)`;
                bars[j].style.height = arr[j] * 10 + "px";
                bars[j].style.backgroundColor = "red";
                bars[j+1].style.transform = `translateX(${position - 34}px)`;
                bars[j+1].style.height = arr[j+1] * 10 + "px";
                bars[j+1].style.backgroundColor = "red";

                await sleep(ANIMATION_LENGTH);
                
                bars[j].style.transform = `translateX(0)`;
                bars[j+1].style.transform = `translateX(0)`;

            } else {
                bars[j].style.height = arr[j] * 10 + "px";
                bars[j].style.backgroundColor = "lightgreen";
                bars[j+1].style.height = arr[j+1] * 10 + "px";
                bars[j+1].style.backgroundColor = "lightgreen";

                await sleep(ANIMATION_LENGTH/2)
            }
            
        }
        await sleep(ANIMATION_LENGTH);
    }
    await sleep(1);
    for (let i = 0; i < bars.length; i++){
        bars[i].style.backgroundColor = "lightgreen";
    }
    return arr
}

async function quickSort(arr){

}



bubbleSortBtn.addEventListener("click", ()=>{
    bubbleSort(unsortedArray);
    
})