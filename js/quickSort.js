var quickSort = async function quickSort(arr){

    let bars = document.getElementsByClassName("bar");

    async function partition(arr, l, r){
        let mid = Math.floor((l + r)/2)
        let pivot = arr[mid];
        let randRGB = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
        bars[mid].style.backgroundColor = "yellow"
        while(l <= r){
            while(arr[l] < pivot){
                l++;
                bars[l].style.backgroundColor = "blue"
                bars[l].style.backgroundColor = "white"
                await sleep(ANIMATION_LENGTH/4);
            }
            while(arr[r] > pivot){
                r--;
                bars[r].style.backgroundColor = "cyan"
                bars[r + 1].style.backgroundColor = "white"
                await sleep(ANIMATION_LENGTH/4);
            }
            if (l <= r){
                
                let temp = arr[r];
                arr[r] = arr[l];

                bars[r].style.backgroundColor = randRGB;
                bars[l].style.transform = `translateX(${(17 * (r - l))}px)`;

                arr[l] = temp;
                
                bars[l].style.backgroundColor = randRGB;
                bars[r].style.transform = `translateX(${(17 * -(r - l))}px)`;
                
                await sleep(ANIMATION_LENGTH/2);

                bars[l].style.height = arr[l] * 10 + "px";
                bars[l].style.transform = `translateX(0)`;

                bars[r].style.height = arr[r] * 10 + "px";
                bars[r].style.transform = `translateX(0)`;

                await sleep(ANIMATION_LENGTH);

                l++;
                r--;
            }
            
        }
        await sleep(1);
        for (let i = 0; i < bars.length; i++){
            bars[i].style.backgroundColor = "white";
        }
        return l;
    }

    async function sort(arr, l, r){
        let index;
        if (arr.length > 1){
            index = await partition(arr, l, r);
            
            if (l < index - 1){
               await sort(arr, l, index - 1);
            }
            if (r > index){
               await sort(arr, index, r);
            }
        }
    }

    await sort(arr, 0, arr.length - 1);
    
    await sleep(1);
    for (let i = 0; i < bars.length; i++){
        bars[i].style.backgroundColor = "lightgreen";
    }
    return arr;
}