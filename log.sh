#!/bin/bash

# LOG IN AND OUT OF THE STUDIO

# by using IN or OUT as argument
# ie. sh compiler.sh IN

# if no arguments are given it will compiled latest data
# and generate html

# OUT arguments also compiles latest data


# for each series of consecutives days
# spent at the studio,
# 
# each rectangular shape appears as the daily
# total of seconds
# 
# This daily total of seconds spent at the studio is used to define
# its shape, color and its size relative to 
# the other days in the series

# 1. Compiles timesheet (data/t.txt) into daily seconds (data/s.txt)

# 2. From these daily totals, series of consecutive days' totals
#    are compiled as separate txt files (consecutive-days/data/...)
#
# 3. These text files are used as data for their HTML equivalent

# 4. In the end, the html files are used to populate the index.html
now=$(date + '%m-%d-%Y_%r')
if [ $1 = 'IN' ]
then 
    python3 app.py --time IN --climate && cd w3py && python3 toggle.py main && cd .. && git commit -am 'A_${now}_VC' && git push
elif [ $1 = 'OUT' ]
then
    python3 app.py --time OUT --climate && cd w3py && python3 toggle.py main && cd .. && python3 timeMachine.py && sudo rm consecutive-days/* || true && sudo rm consecutive-days/data/* || true && python3 data/export.py && python3 generate_html.py && python3 generate_index.py && git add consecutive-days/* && git commit -am 'A_${now}_VC' && git push
else
    python3 timeMachine.py && sudo rm consecutive-days/* || true && sudo rm consecutive-days/data/* || true && python3 data/export.py && python3 generate_html.py && python3 generate_index.py && git add consecutive-days/* && git commit -am 'A_${now}_VC' && git push
fi
