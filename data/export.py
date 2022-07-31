# Take number of seconds per day
# Regroup in 1 file
# Name file according to dates
#
import os.path

# open timesheet
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
            print('sec:' + dailySeconds)
            
            
            # assemble date
            if dailySeconds != 'unconsecutive\n':
                # add seconds to list
                secondsRange.append(dailySeconds)
                print(dataSplit)
                month = dataSplit[-2]      
                print(month)
                
                day = dataSplit[-1]
                print(day)
                size = len(day)
                print(size)
                digit = day[:size - 1]
                print(digit)
                currentDate = month + digit
                print(currentDate)
                # add date to list
                dateRange.append(currentDate)
                print(dateRange)
            elif dailySeconds == 'unconsecutive\n':
                if len(dateRange) > 1:
                    tempPath = dateRange[0] + '-' + dateRange[-1] + '.txt'
                    print('equal1')
                elif len(dateRange) == 1:
                    tempPath = dateRange[0]
                    print('equal0')
                
                print('unconsecutive')
                dateRange = []
                with open(os.path.join('..', 'consecutive-days', 'data', tempPath), "w") as new_file:
                    for y in range(0, len(secondsRange)):
                        if y != 0:
                            # add new line except for first line
                            new_file.write("\n")
                        # add seconds
                        new_file.write(secondsRange[y])
                    print('file-written')
                secondsRange = []
                print('reset')