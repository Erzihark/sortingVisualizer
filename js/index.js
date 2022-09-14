var direction = "vertical";
var thickness = 4;
var multiplier = 0.5;
var ANIMATION_LENGTH = 1000;
var screenWidth = 0;
var resizeTimeout;
var mobileWidth = 640;

let randomizeArray = document.getElementById("array-randomizer");

let bubbleSortBtn = document.getElementById("bubble-sort-button");
let quickSortBtn = document.getElementById("quick-sort-button");
let mergeSortBtn = document.getElementById("merge-sort-button");
let shellSortBtn = document.getElementById("shell-sort-button");

let methodLabel = document.getElementById("sorting-method-label");

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
    '5':100,
}

function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray(){
    for (let i = 0; i < barsAmount; i++){
        unsortedArray[i] = randomNum(minRange, maxRange);
    }
}

window.onresize = ()=>{   
    if (screenWidth == 0){
        screenWidth = document.documentElement.clientWidth;
    }
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(()=>{
        let currentWidth = document.documentElement.clientWidth;
        let previousWidth = screenWidth;
        let min = Math.min(previousWidth, currentWidth);
        let max = Math.max(previousWidth, currentWidth);
        if  (currentWidth == mobileWidth) return;
        if (mobileWidth >= min && mobileWidth <= max){
            swapBarDimensions();
        }
        screenWidth = 0;  
    }, 300);
}

document.addEventListener("DOMContentLoaded", ()=>{
    createRandomArray();
    initializeSlider();
    if (document.documentElement.clientWidth <= 640){
        swapBarDimensions();
    }
    renderBars(unsortedArray);
});

function swapBarDimensions(){
    //row = vertical
    let bars = document.getElementsByClassName("bar");

    if (direction === "horizontal"){
        direction = "vertical";
        barsContainer.style.flexDirection = "row";
    } else {
        direction = "horizontal";
        barsContainer.style.flexDirection = "column";
    }

    multiplier = direction === "horizontal" ? 2 : 0.5
    
    for (let i = 0; i < bars.length; i++){
        let width = bars[i].style.width.match(/\d+/)[0];
        let height = bars[i].style.height.match(/\d+/)[0];
        bars[i].style.width = `${height * multiplier}vw`;
        bars[i].style.height = `${width * multiplier}vw`;
    }
    
}

function renderBars(array){
    for(let i = 0; i < array.length; i++){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        if (direction === "vertical"){
            bar.style.height = `${array[i]}vw`;
            bar.style.width = `${thickness}vw`;
        } else {
            bar.style.height = `${thickness}vw`;
            bar.style.width = `${array[i] * 2}vw`;
        }
        //bar.style.backgroundColor = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
        bar.style.backgroundColor = "white";
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

function toggleMethodLabel(method = ""){
    methodLabel.innerHTML = method;
}

bubbleSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    toggleMethodLabel("Bubble sorting...");
    bubbleSort(unsortedArray).then(()=>{
        toggleButtons();
        toggleMethodLabel();
    });
})

quickSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    toggleMethodLabel("Quick sorting...");
    quickSort(unsortedArray).then(()=>{
        toggleButtons();
        toggleMethodLabel();
    });
})

mergeSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    toggleMethodLabel("Merge sorting...");
    mergeSort(unsortedArray).then(()=>{
        toggleButtons();
        toggleMethodLabel();
    })
})

shellSortBtn.addEventListener("click", ()=>{
    toggleButtons();
    toggleMethodLabel("Shell sorting...");
    shellSort(unsortedArray).then(()=>{
        toggleButtons();
        toggleMethodLabel();
    })
})