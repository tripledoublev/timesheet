#!/bin/bash

# Compiles timesheet (data/t.txt) into daily seconds (data/s.txt)

# From these daily totals, series of consecutive days' totals
# are compiled as separate txt files (consecutive-days/data/...)
#
# These text files are used as data for their HTML equivalent

# In the end, the html files are used to populate the index.html

python3 timeMachine.py && python3 data/export.py && python3 generate_html.py && python3 generate_index.py