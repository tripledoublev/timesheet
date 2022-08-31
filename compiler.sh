#!/bin/bash

# for each series of consecutives days
# spent at the studio
# 
# Each rectangular shape appears as the daily
# total of seconds
# 
# This daily total of seconds spent at the studio is used to define
# its shape, color and its size relative to 
# the other days in the series

# Compiles timesheet (data/t.txt) into daily seconds (data/s.txt)

# From these daily totals, series of consecutive days' totals
# are compiled as separate txt files (consecutive-days/data/...)
#
# These text files are used as data for their HTML equivalent

# In the end, the html files are used to populate the index.html

if [ $1 == 'IN' ]
then 
    python3 app.py --time IN --climate && cd w3py && python3 toggle.py main
if [ $1 == 'OUT' ]
then
    python3 app.py --time OUT --climate && cd w3py && python3 toggle.py main && python3 timeMachine.py && sudo rm consecutives-days/* && python3 data/export.py && python3 generate_html.py && python3 generate_index.py
fi