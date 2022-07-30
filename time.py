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

# open timesheet
with open("data/t.txt", "r") as txt_file:
        # count the number of lines
        linecount = len(txt_file.readlines())
        #print the total number of lines
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
            # print timespent per entry
            print(timespent)
            # write timespent in separate file
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
            # For unconsecutive entries
            elif dayOf - previousDay > 1:
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
                        s_txt.write(str(timespent) + ' seconds today, ' + str(countingDays) + ' consecutives day, ' + str(monthOf) + ' ' + str(dayOf))
                    # else plural
                    else: 
                        s_txt.write(str(timespent) + ' seconds today, ' + str(countingDays) + ' consecutives days, ' + str(monthOf) + ' ' + str(dayOf))
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