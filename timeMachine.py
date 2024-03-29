# Note: Possibility for new text file generated each time
# VS
# Removing previous second count and overwriting the same file
#
# Counting consecutive days at the studio
# and the seconds spent per day
#
# this python script takes the timesheet's 
# timestamps (t.txt) and transforms that
# data as 'seconds per day' to another
# file (s.txt)
#
# Seconds at the studio are obtained
# from IN & OUT timestamps. 
# 
# If there is more than one entry per
# day, both entries are added to a single
# line in the 'seconds per day' file (s.txt)
#
# The 'unconsecutive' mention is added 
# between entries when the seconds at the studio
# were not logged on consecutive days.
#
import datetime
import calendar
import os

# remove old seconds data set
os.remove("data/s.txt")
# create new file and insert header
with open("data/s.txt", "w") as new_file:
    new_file.write("seconds per day,consecutive days at the studio, date")
    new_file.write("\n")
    new_file.write("\n")
    new_file.close()
# open timesheet
with open("data/t.txt", "r") as txt_file:
        # count the number of lines
        linecount = len(txt_file.readlines())
        # print the total number of lines
        print('total lines:' + str(linecount))
        # remove header and reduce in half
        # this is because a session at the studio 
        # consists of IN & OUT and so we divide the total by 2
        modCount = (linecount - 3) * 0.5
        # initialize the variables for double shifts
        # the day of the timestamp
        dayOf = 0
        # another day for comparison
        previousDay = 0
        # another month for comparison
        previousMonth = 0
        # previous timespent if > 1 per day
        doubleshift = 0
        # counting consecutive days
        countingDays = 0
        # go through each IN in timesheet
        for x in range(0, int(modCount)):
            # keep count 
            incount = (x * 2) + 3
            # add 1 for OUT
            outCount = incount + 1
            # go to beginning of file
            txt_file.seek(0) 
            # record line IN
            dataIN = txt_file.readlines()[incount]
            # go to beginning of file
            txt_file.seek(0) 
            # record line OUT
            dataOUT = txt_file.readlines()[outCount]
            # split line IN
            INlist = dataIN.split(',')
            # look at IN timestamp
            INstamp = INlist[1]
            # check for double shift
            archive = INlist[2]
            # filter date / time format
            filtered = archive.split('-')
            # look at month
            month = int(filtered[1])
            # look at year
            year = int(filtered[0])
            prevYear = year
            if (month == 1):
                prevMonth = 12
                prevYear -= 1
            else:
                prevMonth = month - 1
            # Get the number of days in prev month
            daysInPrevMonth= calendar.monthrange(prevYear, prevMonth)[1]
            # from [1-12] to [Jan-Dec]
            monthOf = calendar.month_abbr[month] 
            # look at day & time
            dayTime = filtered[2]
            # only keep day
            day = dayTime.split(' ')
            # This is the day of
            dayOf = int(day[0])
            # split line OUT
            OUTlist = dataOUT.split(',')
            # look at OUT timestamp
            OUTstamp = OUTlist[1]
            # substract seconds to get timespent at studio
            timespent = int(OUTstamp) - int(INstamp)
            # this used to print timespent per entry
            # print(str(timespent) + ' on ' + str(monthOf) + str(dayOf))
            # write timespent in separate var
            # if it's a doubleshift
            if dayOf == previousDay : 
                with open("data/s.txt", "r+") as s_txt:
                    # add new timespent with previous entry
                    total = int(doubleshift) + int(timespent)
                    # read lines
                    lines = s_txt.readlines()
                    # move file pointer to the beginning of file
                    s_txt.seek(0)
                    # truncate the file
                    s_txt.truncate()
                    # start writing lines except the last line
                    s_txt.writelines(lines[:-1])
                    # add new line
                    # s_txt.write("\n")
                    # add total timespent for the day
                    # if day singular
                    if countingDays == 1:
                        s_txt.write(str(total) + ' seconds today, ' + str(countingDays) + ' consecutive day, ' + str(monthOf) + ' ' + str(dayOf))
                    # else plural
                    else:
                        s_txt.write(str(total) + ' seconds today, ' + str(countingDays) + ' consecutive days, ' + str(monthOf) + ' ' + str(dayOf))    
                    # write this total as the new doubleshift timespent
                    doubleshift = total
                    # This used to print the detectino of doubleshift and the total for the day
                    # print('doubleshift detected')
                    # print('total for the day: ' + str(total) + '  on ' + str(monthOf) + ' ' + str(dayOf))
            # For unconsecutive entries
            elif (monthOf == previousMonth and dayOf - previousDay >= 2) or (monthOf != previousMonth and dayOf + daysInPrevMonth - previousDay >= 2) :
                with open("data/s.txt", "a+") as s_txt:
                    # reset consecutive days
                    countingDays = 0
                    # add 1 to consecutive days
                    countingDays += 1
                    # go to beginning of file
                    s_txt.seek(0)
                    # add new line
                    s_txt.write("\n")
                    # write 'unconsecutive'
                    s_txt.write(str("unconsecutive"))
                    # add new line
                    s_txt.write("\n")
                    # write timespent
                    # if day singular
                    if countingDays == 1:
                        s_txt.write(str(timespent) + ' seconds today, ' + str(countingDays) + ' consecutive day, ' + str(monthOf) + ' ' + str(dayOf))
                    # else plural
                    else: 
                        s_txt.write(str(timespent) + ' seconds today, ' + str(countingDays) + ' consecutive days, ' + str(monthOf) + ' ' + str(dayOf))
            # just another day at the studio
            else:
                # open file
                with open("data/s.txt", "a+") as s_txt:
                    # add 1 to consecutive days
                    countingDays += 1
                    # go to beginning of file
                    s_txt.seek(0) 
                    # add new line
                    s_txt.write("\n")
                    # write timespent
                    # if day singular
                    if countingDays == 1:
                        s_txt.write(str(timespent) + ' seconds today, ' + str(countingDays) + ' consecutives day, ' + str(monthOf) + ' ' + str(dayOf))
                    # else plural
                    else:
                        s_txt.write(str(timespent) + ' seconds today, ' + str(countingDays) + ' consecutives days, ' + str(monthOf) + ' ' + str(dayOf))
                    # timespent to calculate the day's total in the case of a doubleshift
                    doubleshift = timespent
            # in the end the day Of becomes the previous day        
            previousDay = int(dayOf)
            previousMonth = monthOf
# this last section contains formatting
# such as adding 'unconsecutive' at the bottom
# so the export.py can build the .txt file
# that will be used to generate the .html
with open("data/s.txt", "a+") as old_file:
    # go to beginning of file
    old_file.seek(0) 
    # add new line
    old_file.write("\n")
    old_file.write(str("unconsecutive"))
    old_file.close()
# this removes an unnecessary line at the top of the file 
# list that stores all the file lines
lines = []
# read file
with open("data/s.txt", 'r') as fp:
    # read an store all lines into list
    lines = fp.readlines()

# Write file
with open("data/s.txt", 'w') as fp:
    # iterate each line
    for number, line in enumerate(lines):
        # remove initial 'unconsecutive' on line 4
        if number not in [3]:
            fp.write(line)
print('!!!!!!!!!!!!!!!!!!!!!!')
print('data/s.txt was updated')
print('!!!!!!!!!!!!!!!!!!!!!!')