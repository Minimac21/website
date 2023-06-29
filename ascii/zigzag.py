import os
import time
#num chars per line:          15
L = 15
C = 3
#num chars of non-whitespace: 3

#prints a line with x spaces before, 3 chars, and 10-(3+x) spaces and \n after
def prntline(x):
    for i in range(0,x):
        print(" ", end = "")
    for i in range(0,C):
        print("=", end = "")
    for i in range(0,L-(C+x)):
        print(" ", end= "")
    print("")

#same as prntline, but accounts for x > 7 "zagging" 
def prntzigline(x):
    if x % (L-C) == 0:
        prntline(x)
        prntline(x)
    elif x < L-C+1:
        prntline(x)
    else:
        prntline( (-x) % (L-C) )

#20 frames
for i in range(0,150):
    os.system('clear')
    #with open("frames.txt",'w', encoding  = 'utf-8') as f:
    for x in range(0,50):
        prntzigline( (x+i) % (2*(L-C)))
    time.sleep(.05)
    os.system('clear')



