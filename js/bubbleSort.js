var bubbleSort = async function bubbleSort(arr) {

    let bars = document.getElementsByClassName("bar");
    let translate = direction === "vertical" ? "X" : "Y";


    for (let i = 0; i < arr.length; i++) {

        for (let j = 0; j < arr.length - i - 1; j++) {

            if (arr[j] > arr[j + 1]) {

                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "white";
                    }
                }
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                let variable = `translate${translate + "(" + (thickness + 0.3)}vw)`
                console.log(variable)
                bars[j].style.transform = `translate${translate + "(" + (thickness + 0.3)}vw)`;
                if (direction === "vertical") {
                    bars[j].style.height = arr[j] + "vw";
                } else {
                    bars[j].style.width = arr[j] * 2 + "vw";
                }
                bars[j].style.backgroundColor = "red";
                bars[j + 1].style.transform = `translate${translate + "(" + -(thickness + 0.3)}vw)`;
                if (direction === "vertical") {
                    bars[j + 1].style.height = arr[j + 1] + "vw";
                } else {
                    bars[j + 1].style.width = arr[j + 1] * 2 + "vw";
                }
                bars[j + 1].style.backgroundColor = "red";

                await sleep(ANIMATION_LENGTH/4);

                bars[j].style.transform = `translate${translate}(0)`;
                bars[j + 1].style.transform = `translate${translate}(0)`;

                await sleep(ANIMATION_LENGTH);

            } else {
                if (direction === "vertical") {
                    bars[j].style.height = arr[j] + "vw";
                } else {
                    bars[j].style.width = arr[j] * 2 + "vw";
                }
                bars[j].style.backgroundColor = "lightgreen";
                if (direction === "vertical") {
                    bars[j + 1].style.height = arr[j + 1] + "vw";
                } else {
                    bars[j + 1].style.width = arr[j + 1] * 2 + "vw";
                }
                bars[j + 1].style.backgroundColor = "lightgreen";

                await sleep(ANIMATION_LENGTH / 2)
            }

        }
        await sleep(ANIMATION_LENGTH);
    }
    await sleep(1);
    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "lightgreen";
    }
    return arr
}