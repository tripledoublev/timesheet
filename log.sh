#!/bin/bash

# LOG IN AND OUT OF THE STUDIO

# by using IN or OUT as argument
# ie. >>> sh compiler.sh IN

# if no arguments are given it will compiled latest data
# and generate html based on data
# then, updated html get deployed to the server

# OUT arguments also compiles latest data


# for each series of consecutives days
# spent at the studio,
# 
# each rectangular shape appears as the daily
# total of seconds
# 
# This daily total of seconds spent at the studio is used to define
# its shape, color and size relative to 
# the other days in the series

# the longest days spent at the studio appear as the biggest rectangles

# 1. Fetches latest changes and pulls from GIT
#   If IN or OUT:
#       * Logs IN or OUT in timesheet (data/t.txt) with app.py
#       * Fetches climate data and logs environmental conditions on IN & OUT (--climate)
#       * toggle Presence on the blockchain with Web3.py (w3py/toggle.pt)

#   If OUT or {none}
#       * Compiles timesheet (data/t.txt) into daily seconds (data/s.txt) with timeMachine.py
#       * From these daily totals, series of consecutive days' totals
#         are compiled as separate txt files (consecutive-days/data/...) with data/export.py
#       * These text files are used as data for their HTML equivalent with generate_html.py
#       * In the end, the html files are used to populate the index.html with generate_index.py

# Concludes with by Committing (and pushing) changes with named based on operation (in, out, compiled + timestamp)

now=$(date "+%c")
if [ $1 = 'IN' ]
then 
    git fetch && git pull && python3 app.py --time IN --climate && cd w3py && python3 toggle.py main && cd .. && git commit -am "IN: ${now}" && git push
elif [ $1 = 'OUT' ]
then
    git fetch && git pull && python3 app.py --time OUT --climate && cd w3py && python3 toggle.py main && cd .. && python3 timeMachine.py && sudo rm consecutive-days/* || true && sudo rm consecutive-days/data/* || true && python3 data/export.py && python3 data/total.py && python3 generate_html.py && python3 generate_index.py && git add consecutive-days/* && git commit -am "OUT: ${now}" && git push
else
    git fetch && git pull && python3 timeMachine.py && sudo rm consecutive-days/* || true && sudo rm consecutive-days/data/* || true && python3 data/export.py && python3 data/total.py && python3 generate_html.py && python3 generate_index.py && git add consecutive-days/* && git commit -am "COMPILED: ${now}" && git push
fi
