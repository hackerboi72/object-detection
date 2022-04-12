var status1 = ""
objects = []; 

function setup() {
    canvas = createCanvas(380,380)
    canvas.center() 
    video = createCapture(VIDEO)
    video.hide()
    objectdetector = ml5.objectDetector('cocossd',modelloaded)
    document.getElementById("status").innerHTML = "status is detecting objects"
}
function draw() {
    image(video, 0,0,380,380)
    if (status1 != "") {
        r = random(255)
        g = random(255)
        b = random(255)
        objectdetector.detect(video, gotResults) 
        for(i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: object detected" 
            document.getElementById("object_number").innerHTML = "number of objects detected are" + objects.length
            fill(r,g,b)
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " " + percent + "%", objects[i].x + 15 ,objects[i].y + 15) 
            noFill()
            stroke(r,g,b)
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)          
        }
    }
}
function preload() {
    img = loadImage("dog_cat.jpg") 
}
function modelloaded() {
    console.log("modelloaded")
    status1 = true
}
function gotResults(error, results) {
     if(error) {
         console.log(error)
     }
     console.log(results)
     objects = results 
}