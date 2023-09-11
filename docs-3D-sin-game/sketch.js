
// In this code, when the mouse is pressed and moved horizontally, the camera will rotate around the scene accordingly.
// When the mouse is not pressed, the camera will continue its automatic rotation. 
// You can adjust the rotation speed and behavior according to your preferences.  //

// The color of each confetti plane is determined by its y-coordinate, creating a gradient from top to bottom. 
// The hue varies from red to blue as the confetti falls. 
// You can adjust the color mapping and gradients according to your artistic preferences.//

// When the mouse is pressed and moved horizontally, the camera will rotate around the scene accordingly.
// When the mouse is not pressed, the camera will continue its automatic rotation. 
// You can adjust the rotation speed and behavior according to your preferences.  //

let camRadius = 1000;
let camTheta = 0;
let camTimer = 0;
let camX = 800;
let camY = -600;
let camZ = 800;

let confLocs = [];
let confTheta = [];

function setup() {
    createCanvas(900, 800, WEBGL);

    for (let i = 0; i < 200; i++) {
        confLocs.push(createVector(random(-500, 500), random(-800, 0), random(-500, 500)));
        confTheta.push(random(360));
    }
}

function draw() {
    background(125);
    angleMode(DEGREES);

    if (mouseIsPressed) {
        camTheta += (pmouseX - mouseX) * 0.2;
    } else {
        camTheta += 1;
    }

    if (millis() - camTimer > 10000) {
        camTimer = millis();
        camTheta = 0;
    }

    camX = cos(camTheta) * camRadius;
    camZ = sin(camTheta) * camRadius;

    camera(camX, camY, camZ, 0, 0, 0, 0, 1, 0);

    for (let x = -400; x <= 400; x += 50) {
        for (let z = -400; z <= 400; z += 50) {
            let distance = dist(0, 0, x, z);
            let length = map(sin(distance + frameCount), -1, 1, 100, 300);

            push();
            translate(x, 0, z);
            noStroke();
            normalMaterial();
            stroke(0);
            strokeWeight(2);
            box(50, length, 50);
            pop();
        }
    }

    confetti();
}

function confetti() {
    for (let i = 0; i < confLocs.length; i++) {
        let loc = confLocs[i];
        let thetaX = confTheta[i];
        let thetaY = confTheta[i] * 1.5;
        let thetaZ = confTheta[i] * 2;

        loc.y += 3;
        thetaX += 10;

        if (loc.y > 0) {
            loc.y = -800;
        }

        push();
        translate(loc.x, loc.y, loc.z);
        rotateX(thetaX);
        rotateY(thetaY);
        rotateZ(thetaZ);

        let gradientColor = color(map(loc.y, -800, 0, 255, 0), map(loc.y, -800, 0, 0, 255), map(loc.y, -800, 0, 255, 0));
        fill(gradientColor);
        plane(15);
        pop();

        confTheta[i] = thetaX;
    }
}


