# This code is for moving the robot forward

from BrickPi import *   #import BrickPi.py file to use BrickPi operations

BrickPiSetup()  # setup the serial port for communication

#Large Motor for back and forth movement
if BrickPi.MotorEnable[PORT_A] == 0:
    BrickPi.MotorEnable[PORT_A] = 1 #Enable the Motor A  

#Medium Motor for rattle movement
if BrickPi.MotorEnable[PORT_B] == 0:
    BrickPi.MotorEnable[PORT_B] = 1 #Enable the Motor B 

BrickPiSetupSensors()   #Send the properties of sensors to BrickPi

while True:
    print "Running Forward"
    BrickPi.MotorSpeed[PORT_A] = 100  #Set the speed of MotorA (-255 to 255)
    ontime1 = time.time()
    while(time.time() - ontime1 < 0.5):
        BrickPi.MotorSpeed[PORT_B] = 75
        BrickPiUpdateValues()
        time.sleep(0.1)

    ontime2 = time.time()
    while(time.time() - ontime2 < 0.5):
        BrickPi.MotorSpeed[PORT_B] = -75
        BrickPiUpdateValues()