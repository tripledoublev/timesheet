#!/bin/bash

# final performance

# update environmental data every 2 minutes and tweet it all
# end the year long performance with increased data flow

now=$(date "+%c")
for I in 1 2 3 4 5 6 7 8 9 10
do
    tmp=$(python3 app.py --time IN --climate 2>&1) &&
    echo '\t░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'
    echo '\t░░░            Data collected             ░░░'
    echo '\t░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░' && cd w3py && dataout=$(python3 update.py ${tmp} 2>&1) &&
    echo '\t░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░'
    echo '\t░░░     Transacted with the blockchain    ░░░'
    echo '\t░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░' && cd .. && python3 app.py --text "${dataout}" --tweet && sleep 2m
done