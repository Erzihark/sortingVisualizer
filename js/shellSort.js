var shellSort = async function shellSort(uArr){

    let bars = document.getElementsByClassName("bar");
    console.log("Initial arr ", uArr);

    async function sort(arr){
        let len = arr.length;

        for(let gap = Math.floor(len/2); gap > 0; gap = Math.floor(gap/2)){

            let randRGB = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;

            for(let i = gap; i < len; i++){
                let temp = arr[i];
                
                let j;
                for(j = i; j >= gap && arr[j - gap] > temp; j -= gap){
                    
                    arr[j] = arr[j - gap];

                    bars[j].style.transform = `translateX(${17 * -(gap)}px)`;
                    bars[j].style.backgroundColor = randRGB;

                    bars[j - gap].style.transform = `translateX(${17 * (gap)}px)`;
                    bars[j - gap].style.backgroundColor = randRGB;
                    
                    await sleep(ANIMATION_LENGTH/2);

                    bars[j].style.height = arr[j] * 10 + "px";
                    bars[j - gap].style.height = temp * 10 + "px";

                    await sleep(ANIMATION_LENGTH/16);
                    await sleep(ANIMATION_LENGTH/8);

                    bars[j].style.transform = `translateX(0)`;
                    bars[j - gap].style.transform = `translateX(0)`;

                    await sleep(ANIMATION_LENGTH);
                }
                arr[j] = temp;
            }
            await sleep(1);
            for (let i = 0; i < bars.length; i++){
                bars[i].style.backgroundColor = "white";
            }
        }
        await sleep(1);
            for (let i = 0; i < bars.length; i++){
                bars[i].style.backgroundColor = "lightgreen";
            }
        return arr;
    }
    return await sort(uArr);
}
