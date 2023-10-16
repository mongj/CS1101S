// T06M
// 1. Celes Chai Jia Xuan
// 2. Lee Ze Hao
// 3. Sean Foong Jer Tsuen
// 4. Zhang Ming Jun
// 5. Zhang Yifan Jem
// 6. Ng Ze Rui

// init
const SPEED = 100;
const STOP_ACTION = "brake";
const TARGET_LI = 25;

// needs tuning
const KP = 1;
const KI = 1;
const KD = 1;

// list of motors
const LEFT_MOTOR = ev3_motorB();
const RIGHT_MOTOR = ev3_motorC();
const MOTORS = list(LEFT_MOTOR, RIGHT_MOTOR);

// initialize motor speed and stop action
function init(speed, stopAction) {
    display("initialising robot...");
    display(speed, "Speed:");
    display(stopAction, "Stop Action:");
    display("------------------------");
    ev3_motorSetSpeed(LEFT_MOTOR, speed);
    ev3_motorSetSpeed(RIGHT_MOTOR, speed);
    ev3_motorSetStopAction(LEFT_MOTOR, stopAction);
    ev3_motorSetStopAction(RIGHT_MOTOR, stopAction);
}

// start all motors
function motorsStart() {
    for_each(ev3_motorStart, MOTORS);
}

// stop all motors
function motorsStop() {
    for_each(ev3_motorStop, MOTORS);
}

function adjust_left(control) {
    ev3_motorSetSpeed(LEFT_MOTOR, SPEED);
    ev3_motorSetSpeed(RIGHT_MOTOR, SPEED + TURN_COEFF);
    motorsStart();
}

function adjust_right(control) {
    ev3_motorSetSpeed(LEFT_MOTOR, SPEED + TURN_COEFF);
    ev3_motorSetSpeed(RIGHT_MOTOR, SPEED);
    motorsStart();
}

// measures light intensity using color sensor
function measure_li() {
    return ev3_reflectedLightIntensity(ev3_colorSensor());
}

function main() {
    init(SPEED, STOP_ACTION);
    
    motorsStart();
    
    let last_err = 0;
    let proportional = 0;
    let integral = 0;
    let derivative = 0;

    while (true) {
        const li = measure_li();
        const err = TARGET_LI - li;
        
        proportional = TARGET_LI - li;
        integral = integral + err;
        derivative = err - last_err;
        
        const control = (proportional * KP) + (integral * KI) + (derivative * KD);
        
        // adjust direction to trace the right side of the path
        if (li < TARGET_LI) {
            // too dark
            adjust_right(control);
        } else {
            // too bright
            adjust_left(control);
        }
        
        last_err = err;
        
        if (ev3_touchSensorPressed(ev3_touchSensor3())) {
            display("terminating robot...");
            motorsStop();
            break;
        }
    }
}

main();
