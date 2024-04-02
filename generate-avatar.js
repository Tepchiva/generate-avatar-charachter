import {createCanvas, registerFont} from "canvas";
import fs from "fs";

registerFont("fonts/Euclid Circular B SemiBold.ttf", {family: "Euclid SemiBold"})

// dimensions for the image
const width = 144;
const height = 144;

// font style
const fontStyle = '45px "Euclid SemiBold"'
const fontColor = "#FFFFFF";
// const bgColors = ['#6D5176','#8794BF','#E3A193','#D8BF86','#6ECCAF','#737B63','#334945','#375F48','#557153','#009EFF','#CB8F91','#7D5AA4','#4B79F3','#F8AB8E','#B7B4AA','#D5A956','#A5A582','#C6B870','#F88020','#E79B67','#F7931E','#FFA45C','#ECB65F','#D6D6D6','#454EAB','#B27FA0','#674EB4','#6809EA','#2146C7','#DB528A','#38145E']
const bgColors = ['#6D5176','#8794BF','#E3A193','#D8BF86','#6ECCAF','#737B63','#334945','#375F48','#557153','#009EFF','#CB8F91','#7D5AA4','#4B79F3','#F8AB8E','#9EC391','#D5A956','#A5A582','#C6B870','#F88020','#E79B67','#F7931E','#FFA45C','#ECB65F','#454EAB','#B27FA0','#674EB4','#6809EA','#2146C7','#DB528A','#38145E']

console.log("Generating...");

const avatarNameList = [...Array(26)].flatMap((_, i) =>
    [...Array(26)].map((_, j) => `${String.fromCharCode(65 + i)}${String.fromCharCode(65 + j)}`)
);

fs.mkdir('avatars', { recursive: true }, (err) => {
    if (err) {
        console.log('Failed to create folder.');
        throw err;
    }
});


avatarNameList.forEach(avatarName => {
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");
    // instantiate the canvas object    
    context.fillStyle = bgColors[Math.floor(Math.random() * bgColors.length)];
    context.fillRect(0, 0, canvas.width, canvas.height); // draw a background color

    context.font = fontStyle;
    context.textAlign = 'center'; // set the text to be centered horizontally
    context.textBaseline = 'middle'; // set the text to be centered vertically
    context.fillStyle = fontColor;
    context.fillText(avatarName, canvas.width / 2, canvas.height / 2); // draw the text
    
    // Write the image to file
    const buffer = canvas.toBuffer("image/png");

    const fileName = `avatars/${avatarName}.png`;
    fs.writeFile(fileName, buffer, (err) => {
        if(err) 
            console.log(`${fileName} was failed.`)
    })
});

console.log(`Generating avatar profile have been end with '${avatarNameList.length}' avatars`);