# Take number of seconds per day
# Join all daily totals in one file
#
import os.path

# open timesheet
with open("data/s.txt", "r") as txt_file:
        # count the number of lines
        linecount = len(txt_file.readlines())
        #print the total number of lines
        print('total lines:' + str(linecount))
        # remove header
        modCount = (linecount - 3)
        # seconds list
        secondsRange = []
        # go through each line in data/s.txt
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
        # file name for all daily totals
        txtFile = "00_All_Days.txt"
        with open(os.path.join('consecutive-days', 'data', txtFile), "w") as new_file:
            # add every daily total
            for y in range(0, len(secondsRange)):
                # on first line
                if y != 0:
                    # add new line 
                    new_file.write("\n")
                # then add seconds
                new_file.write(secondsRange[y])
            # a file was created
            print(txtFile + ' file-written')
                
# this is it. 
print('/// all days txt export successful ///')