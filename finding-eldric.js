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
const TARGET_LI = 15;
const LI_LOWER_BOUND = 8;
const LI_UPPER_BOUND = 34;

// needs tuning
const KP = 1.1;
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

// stop and turn left on the spot
function adjust_left() {
    ev3_motorSetSpeed(LEFT_MOTOR, -200);
    ev3_motorSetSpeed(RIGHT_MOTOR, 0);
    motorsStart();
}

// stop and turn right on the spot
function adjust_right() {
    ev3_motorSetSpeed(LEFT_MOTOR, 0);
    ev3_motorSetSpeed(RIGHT_MOTOR, -200);
    motorsStart();
}

// continue moving and adjust accordingly
function adjust(control) {
    ev3_motorSetSpeed(LEFT_MOTOR, SPEED + control);
    ev3_motorSetSpeed(RIGHT_MOTOR, SPEED - control);
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
        
        proportional = err;
        integral = integral + err;
        derivative = err - last_err;
        
        const control = (proportional * KP) + (integral * KI) + (derivative * KD);
        display(li, "li:");
        display(control, "PID:");
        // display(ev3_motorGetSpeed(LEFT_MOTOR),"Left:");
        // display(ev3_motorGetSpeed(RIGHT_MOTOR),"Right:");
        // display("-------------");
        display("---------");
        
        // adjust direction to trace the right side of the path
        if (li < TARGET_LI && li < LI_LOWER_BOUND) {
            integral = 0;
            adjust_right();
        } else if (li >= TARGET_LI && li >= LI_UPPER_BOUND) {
            integral = 0;
            adjust_left();
        } else {
            adjust(control);
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
