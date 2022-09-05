let ANIMATION_LENGTH = 1000;

let randomizeArray = document.getElementById("array-randomizer");

let bubbleSortBtn = document.getElementById("bubble-sort-button");
let quickSortBtn = document.getElementById("quick-sort-button");
let mergeSortBtn = document.getElementById("merge-sort-button");
let shellSortBtn = document.getElementById("shell-sort-button");

let barsContainer = document.getElementById("bars-container")

const minRange = 1;
const maxRange = 20;
const barsAmount = 20;
const unsortedArray = new Array(barsAmount);

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
    initializeSlider();
    renderBars(unsortedArray);
});

function renderBars(array){
    for(let i = 0; i < array.length; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${array[i] * 10}px`;
        //bar.style.backgroundColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
        bar.style.backgroundColor = "white"
        barsContainer.appendChild(bar);
    }
}

randomizeArray.addEventListener("click", ()=>{
    createRandomArray();
    barsContainer.innerHTML = "";
    renderBars(unsortedArray);
})

function initializeSlider(){
    
    const sliderContainer = document.getElementById("slider-container");
    const input = document.createElement("input");
    const sliderLabel = document.createElement("div");
    const initSlideVal = 1;
    const step = 1;  
    const max = 5

    sliderLabel.setAttribute("id", "slider-label");
    sliderLabel.innerHTML = "x" + initSlideVal;
    
    input.type = "range";
    input.setAttribute("id", "slider");
    input.setAttribute("value", initSlideVal);
    input.setAttribute("min", initSlideVal);
    input.setAttribute("max", max);
    input.setAttribute("step", step);
    input.set = "Speed";
    
    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(input);

    let slider = document.getElementById("slider");
    slider.addEventListener("change", ()=>{
        let sliderVal = slider.value;
        let sliderLabel = document.getElementById("slider-label");
        sliderLabel.innerHTML = "x" + sliderProps[sliderVal];
        ANIMATION_LENGTH = 1000 / sliderProps[sliderVal];
    })
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleButtons(){
    let buttons = document.querySelectorAll("input[type=button]");
    for (let i = 0; i < buttons.length; i++){
        if (buttons[i].disabled == true){
            buttons[i].disabled = false;
        } else {
            buttons[i].disabled = true;
        }
    }
}

bubbleSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    bubbleSort(unsortedArray).then(()=>{
        toggleButtons();
    });
})

quickSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    quickSort(unsortedArray).then(()=>{
        toggleButtons();
    });
})

mergeSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    mergeSort(unsortedArray).then(()=>{
        toggleButtons();
    })
})

shellSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    shellSort(unsortedArray).then(()=>{
        toggleButtons();
    })
})