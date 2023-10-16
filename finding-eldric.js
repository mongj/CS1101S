// T06M
// 1. Celes Chai Jia Xuan
// 2. Lee Ze Hao
// 3. Sean Foong Jer Tsuen
// 4. Zhang Ming Jun
// 5. Zhang Yifan Jem
// 6. Ng Ze Rui

// init
const BASE_SPEED = 200;
const STOP_ACTION = "coast";
const TARGET_LI = 30;
const LI_LOWER_BOUND = 15;
const LI_UPPER_BOUND = 70;

const ADJ_L_MOTOR_L_SPEED = -300;
const ADJ_L_MOTOR_R_SPEED = 300;
const ADJ_R_MOTOR_L_SPEED = 200;
const ADJ_R_MOTOR_R_SPEED = -200;

let speed = 200;

// PID scaling factors
const KP = 1;
const KI = 0.1;
const KD = 0.6;

// list of motors
const LEFT_MOTOR = ev3_motorC();
const RIGHT_MOTOR = ev3_motorB();
const MOTORS = list(LEFT_MOTOR, RIGHT_MOTOR);

// initialize motor speed and stop action
function init(speed, stopAction) {
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
function adjust_left(control) {
    display('adjust left');
    ev3_motorSetSpeed(LEFT_MOTOR, ADJ_L_MOTOR_L_SPEED + control);
    ev3_motorSetSpeed(RIGHT_MOTOR, ADJ_L_MOTOR_R_SPEED - control);
    motorsStart();
}

// stop and turn right on the spot
function adjust_right(control) {
    display('adjust right');
    ev3_motorSetSpeed(LEFT_MOTOR, ADJ_R_MOTOR_L_SPEED - control);
    ev3_motorSetSpeed(RIGHT_MOTOR, ADJ_R_MOTOR_R_SPEED + control);
    motorsStart();
}

// continue moving and adjust accordingly
function adjust(control) {
    display('adjust');
    
    // accelerate on straight line
    speed = speed * 1.01;
    
    // adjust directions
    ev3_motorSetSpeed(LEFT_MOTOR, speed + control);
    ev3_motorSetSpeed(RIGHT_MOTOR, speed - control);
    motorsStart();
}

// measures light intensity using color sensor
function measure_li() {
    return ev3_reflectedLightIntensity(ev3_colorSensor());
}

function main() {
    init(BASE_SPEED, STOP_ACTION);
    
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
        
        const control = (proportional * KP) + 
                        (integral * KI) + 
                        (derivative * KD);
        
        display("----------------");
        display(li, "li:");
        display(proportional, "p:");
        display(integral, "i:");
        display(derivative, "d:");
        display(control, "PID:");
        display(ev3_motorGetSpeed(LEFT_MOTOR), "Left:");
        display(ev3_motorGetSpeed(RIGHT_MOTOR), "Right:");
        
        // adjust direction to trace the right side of the path
        if (li < TARGET_LI && li < LI_LOWER_BOUND) {
            speed = SPEED;
            integral = 0;
            adjust_right(control);
        } else if (li >= TARGET_LI && li >= LI_UPPER_BOUND) {
            speed = SPEED;
            integral = 0;
            adjust_left(control);
        } else {
            adjust(control);
        }
        
        last_err = err;
        
        // break loop
        if (ev3_touchSensorPressed(ev3_touchSensor3())) {
            motorsStop();
            break;
        }
    }
}

main();