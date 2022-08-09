# This should compile the timesheet
# into html for each series of consecutives days
# spent at the studio
# 
# Each rectangular shape appears as the daily
# total of seconds
# 
# This number of seconds is used to define
# its shape, color and its size relative to 
# the other days in the series
# 
# Important Note:
# 
# I noticed there is an issue with the script ordering
# I need to fix this! 
# It still works but I need to run it twice

# In the meantime a bash script will do the trick

import timeMachine
import generate_html
import generate_index
from data import export

timeMachine
print('timeMachine created s.txt')
export
print('from s.txt to consecutive days')
generate_html
print('from txt to html')
generate_index
print('index has been updated')
print('compiled: consecutive days at the studio')
print('update it with commit+push')

