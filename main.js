const textValue = document.getElementById("text");
const submitButton = document.getElementById("submit");
const bubbleImage = document.getElementById("bubble");
const bubbleText = document.getElementById("bubbletext");

const wordSlice = 18;

function updateBubble() {
    let text = textValue.value;
    let words = text.split(" ");

    function splitString(array,index,split) {
        let string = array[index];
        let slicedWord = `${string.slice(0, split)}-`;
        let slicedLeftover = string.slice(split);
        let newValues = [slicedWord, slicedLeftover]

        if (slicedLeftover.length > split) {
            newValues = splitString(newValues,newValues.indexOf(slicedLeftover),split)
        }
        
        array = array.toSpliced(index,1,newValues.join(" "));
        return array;
    }
    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        if (word.length > wordSlice) {
            words = splitString(words,i,wordSlice);
        }
    }

    text = words.join(" ");

    if (text.length >= 200) {
        text = `${text.slice(0,200)}...`;
    }
    
    let dabaesaba = new Audio("dabaesaba.mp3");
    dabaesaba.play();
    bubbleText.innerText = text;
    
}

textValue.addEventListener("change",updateBubble);

submitButton.addEventListener("click", async () => {
    const canvas = await html2canvas(bubbleImage, {
        backgroundColor: null,
        scale: 2
    });

    const link = document.createElement("a");
    link.download = `${bubbleText.innerText.split(" ")[0]}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
});