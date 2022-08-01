# Take number of seconds per day
# Regroup consecutive days in 1 file
# Name file according to dates
#
import os.path

# open timesheet
fileCount = 0
with open("s.txt", "r") as txt_file:
        # count the number of lines
        linecount = len(txt_file.readlines())
        #print the total number of lines
        print('total lines:' + str(linecount))
        # remove header
        modCount = (linecount - 3)
        # create date and seconds list
        dateRange = []
        secondsRange = []
        # go through each line in s.txt
        for x in range(0, int(modCount)):
            # keep count 
            realCount = x + 3
            # go to beginning of file
            txt_file.seek(0) 
            # record data
            dataLine = txt_file.readlines()[realCount]
            # split data
            dataSplit = dataLine.split(' ')
            # look at seconds
            dailySeconds = dataSplit[0]
            # assemble date
            if dailySeconds.isdigit() == True:
                # add seconds to list
                secondsRange.append(dailySeconds)
                # take month
                month = dataSplit[-2]     
                # take day 
                day = dataSplit[-1]
                # check size 
                size = len(day)
                # to remove line break
                digit = day[:size - 1]
                # assemble month and day
                currentDate = month + digit
                # add date to list
                dateRange.append(currentDate)
            # if data is not digits
            # this means 'unconsecutive'
            # then we save the collected data
            # to a .txt file
            else:
                # if there is more than one date
                if len(dateRange) > 1:
                    # add to file count
                    fileCount += 1
                    # take fileCount, first date and last date as filename
                    tempPath = str(fileCount) + '_' + dateRange[0] + '-' + dateRange[-1] + '.txt'
                # if daterange only contains 1 day
                elif len(dateRange) == 1:
                    # add to file count
                    fileCount += 1
                    # take file count and date as filename
                    tempPath = str(fileCount) + '_' + dateRange[0] + '.txt'
                # reset dateRange
                dateRange = []
                # create filename by joining relative path and tempPath
                with open(os.path.join('..', 'consecutive-days', 'data', tempPath), "w") as new_file:
                    # add every daily total
                    for y in range(0, len(secondsRange)):
                        # on first line
                        if y != 0:
                            # add new line 
                            new_file.write("\n")
                        # then add seconds
                        new_file.write(secondsRange[y])
                    # a file was created
                    print(tempPath + ' file-written')
                # reset consecutive list of daily totals
                secondsRange = []
# this is it. 
print('/// export successful ///')