var shellSort = async function shellSort(uArr){

    let bars = document.getElementsByClassName("bar");
    let translate = direction === "vertical" ? "X" : "Y";

    async function sort(arr){
        let len = arr.length;

        for(let gap = Math.floor(len/2); gap > 0; gap = Math.floor(gap/2)){

            let randRGB = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;

            for(let i = gap; i < len; i++){
                let temp = arr[i];
                
                let j;
                for(j = i; j >= gap && arr[j - gap] > temp; j -= gap){
                    
                    arr[j] = arr[j - gap];

                    bars[j].style.transform = `translate${translate + "(" + (thickness + 0.3)/2 * -(gap)}vw)`;
                    bars[j].style.backgroundColor = randRGB;

                    bars[j - gap].style.transform = `translate${translate + "(" + (thickness + 0.3)/2 * (gap)}vw)`;
                    bars[j - gap].style.backgroundColor = randRGB;
                    
                    await sleep(ANIMATION_LENGTH/16);
                    await sleep(ANIMATION_LENGTH/4);

                    if (direction === "vertical"){
                        bars[j].style.height = arr[j] + "vw";
                    } else {
                        bars[j].style.width = arr[j] * 2 + "vw";
                    }
                    if (direction === "vertical"){
                        bars[j - gap].style.height = temp + "vw";
                    } else {
                        bars[j - gap].style.width = temp * 2 + "vw";
                    }

                    await sleep(ANIMATION_LENGTH/16);
                    await sleep(ANIMATION_LENGTH/8);

                    bars[j].style.transform = `translate${translate}(0)`;
                    bars[j - gap].style.transform = `translate${translate}(0)`;

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
