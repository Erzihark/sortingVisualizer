var bubbleSort = async function bubbleSort(arr){
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

                bars[j].style.transform = `translateX(${34}px)`;
                bars[j].style.height = arr[j] * 10 + "px";
                bars[j].style.backgroundColor = "red";
                bars[j+1].style.transform = `translateX(${-34}px)`;
                bars[j+1].style.height = arr[j+1] * 10 + "px";
                bars[j+1].style.backgroundColor = "red";
                                         
                await sleep(ANIMATION_LENGTH/4);

                bars[j].style.transform = `translateX(0)`;
                bars[j+1].style.transform = `translateX(0)`;

                await sleep(ANIMATION_LENGTH);

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