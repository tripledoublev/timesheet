# bonjour hi
# my name is vincent
# i am an artist
# i want to visualize my time spent at the studio 
# and use this data to make socialist images
# this will hopefully help me log my time in and out of the studio

#import time and things 
import time
import datetime
import argparse

# parsing arguments
parser = argparse.ArgumentParser()
parser.add_argument('timeout', help='IN or OUT')
args = parser.parse_args()

# in or out and time and time again
status = args.timeout
timeNow = round(time.time()) 
dateNow = datetime.datetime.fromtimestamp(timeNow)

# print message machine 
err = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'
rrr = '░░░     Error in timeline continuum.      ░░░'
ror = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'

hav = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'
som = '░░░   Welcome to the studio. Have fun.    ░░░'
fun = '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'

# open the studio timecard text file
with open("t.txt", "a+") as txt_file:
    # go to beginning of file
    txt_file.seek(0) 
    # look at the last line 
    last_Line = txt_file.readlines()[-1]
    historical = last_Line.split(',')
    past_Status = historical[0]
        # check if the present contradicts history
    if status == past_Status:
        # if so, send error message
        print(err)
        print(rrr)
        print(ror)
    # if present matches history then append '\n'
    else:    
        txt_file.write("\n")
        # and write to file
        txt_file.write(status + ', ' + str(timeNow) + ', ' + str(dateNow))
        # and notify user
        if status == 'IN' :
            print(hav)
            print(som)
            print(fun)
        if status == 'OUT' :
            print('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')
            print('░░░  A studio is only one of many places  ░░░')
            print('░░░  where art gets made. Au revoir       ░░░')
            print('░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░')     
