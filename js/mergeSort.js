var mergeSort = async function mergeFunction(uArr){
    let bars = document.getElementsByClassName("bar");
    let translate = direction === "vertical" ? "X" : "Y";

    async function merge(arr, start, mid, end){
        for (let i = 0; i < bars.length; i++){
            bars[i].style.backgroundColor = "white";
        }
        await sleep(1);
        for (let i = start; i < end; i++){
            bars[i].style.backgroundColor = "cyan";
        }
        await sleep(1);
        let start2 = mid + 1;
    
        // If the direct merge is already sorted
        if (arr[mid] <= arr[start2]) return;
        // Two pointers to maintain start
        // of both arrays to merge
        while (start <= mid && start2 <= end){    
            // If element 1 is in right place
            if (arr[start] <= arr[start2]){
                start++;
            }
            else {
                let value = arr[start2];
                let index = start2;
                // Shift all the elements between element 1
                // element 2, right by 1.
                let count = 0;
                while (index != start) {      
                    arr[index] = arr[index - 1];

                    bars[index].style.transform = `translate${translate + "(" + (thickness + 0.3)}vw)`;
                    if (direction === "vertical"){
                        bars[index].style.height = arr[index] + "vw";
                    } else {
                        bars[index].style.width = arr[index] * 2 + "vw";
                    }

                    index--;
                    count++;
                }

                arr[start] = value;         
                if (direction === "vertical"){
                    bars[start].style.height = arr[start] + "vw";
                } else {
                    bars[start].style.width = arr[start] * 2 + "vw";
                }
                await sleep(ANIMATION_LENGTH/4);

                for (let i = 0; i < bars.length; i++){
                    bars[i].style.transform = `translate${translate}(0)`;
                }

                await sleep(ANIMATION_LENGTH/2);
                // Update all the pointers
                start++;
                mid++;
                start2++;
            }
        }
    }
  
    /* l is for left index and r is right index 
    of the sub-array of arr to be sorted */
    async function mergeSort(arr, left, right){
        if (left < right) {
            // Same as (l + r) / 2, but avoids overflow
            // for large l and r
            let mid = left + Math.floor((right - left) / 2);

            let randRGB = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
            for(let i = left; i <= mid; i++){
                bars[i].style.backgroundColor = randRGB;
            }
            await sleep(ANIMATION_LENGTH/2);
            randRGB = `rgb(${randomNum(0, 255)}, ${randomNum(0, 255)}, ${randomNum(0, 255)})`;
            for(let i = mid + 1; i <= right; i++){
                bars[i].style.backgroundColor = randRGB;
            }
            await sleep(ANIMATION_LENGTH/2);
            // Sort first and second halves
            await mergeSort(arr, left, mid);
            await mergeSort(arr, mid + 1, right);
            await merge(arr, left, mid, right);
        }
    }

    await mergeSort(uArr, 0, uArr.length - 1);
    await sleep(1);
    for (let i = 0; i < bars.length; i++){
        bars[i].style.backgroundColor = "lightgreen";
    }
    return uArr;
}