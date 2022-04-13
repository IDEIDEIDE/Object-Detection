img = ""
status = ""
object = []

function preload(){
    img = loadImage("dog_cat.jpg")
    sound = loadSound("alarm_beep_3.mp3")
}

function setup(){
    canvas = createCanvas(380, 380)
    canvas.center()
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded)

}

function modelLoaded(){
    status = true
    document.getElementById("status").innerHTML = "Status - Detecting"
}
function gotResults(error, results){
    if (error){
        console.log(error)
    }
    else{
        console.log(results)
        object = results    
    }
}

function draw(){
    image(img, 0, 0, 380, 380)
    
    if(status != ""){

        ObjectDetector.detect(image, gotResults)
        r = random(255)
        g = random(255)
        b = random(255)
        for(i = 0; i < object.length; i++){
            
            document.getElementById("status").innerHTML = "Status - Object Detected"
            document.getElementById("number_of_objects").innerHTML = "Dog: Found" 
            fill(r,g,b)
            percent = floor(object[i].confidence * 100)
            text(object[i].label + " " + percent + "%", object[i].x, object[i].y)
            noFill()
            stroke(r,g,b)
            rect(object[i].x, object[i].y, object[i].width, object[i].height)
        }

    }

}

