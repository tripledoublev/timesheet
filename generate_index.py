# creates index.html from 
# files in the folder
import os
from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir('consecutive-days/') if isfile(join('consecutive-days', f))]
with open('consecutive-days/index.html','w') as f:
    f.write('<!DOCTYPE html><html><head><title>Consecutive days at the studio</title>')
    f.write("\n")
    f.write('<link rel="stylesheet" href="css/style.css"></head>')
    f.write("\n")
    f.write('<body id="dcontain">')
    f.write("\n")
    f.write('   <div id="bgwrap1">')
    f.write("\n")
    f.write('       <div id="bgwrap2">')
    f.write("\n")
    f.write('           <h1 id="page-title" class="textColor">')
    f.write("\n")
    f.write('               <a href="https://github.com/tripledoublev/timesheet/#readme">')
    f.write("\n")
    f.write('                   Consecutive days at the studio')
    f.write("\n")
    f.write('               </a>')
    f.write("\n")
    f.write('           </h1>')
    f.write("\n")
    f.write('           <div class="flexbox justify-left indexbox" id="fbox">')
    f.write("\n")
    
    # sort files in ascending order
    onlyfiles.sort()
    for file in onlyfiles:
        print(file)
        if file == '00_All_Days.html':
            # add new line
            f.write("\n")
            f.write('               <div class="textColor">')
            f.write("\n")
            f.write('                   <a href="' + file + '">')
            f.write("\n")
            # remove extension
            fileless = file.split('.')
            # remove prefix
            removePrefix = fileless[0].split('_')
            f.write('                       ' + removePrefix[1])
            f.write("\n")
            f.write('                   </a>')
            f.write("\n")
            f.write('               </div>')
            f.write("\n")
        elif file != 'index.html':
            # add new line
            f.write("\n")
            f.write('               <div class="textColor">')
            f.write("\n")
            f.write('                   <a href="' + file + '">')
            f.write("\n")
            # remove extension
            fileless = file.split('.')
            # remove prefix
            removePrefix = fileless[0].split('_')
            # split dates
            datesOnly = removePrefix[1].split('-')
            # set first date
            firstDate = datesOnly[0]
            # split month and day
            splitDate1 = [firstDate[index : index + 3] for index in range(0, len(firstDate), 3)]
            # record second date only if present
            if len(datesOnly) > 1:
                # set second data
                secondDate = datesOnly[1]
                # split month and day
                splitDate2 = [secondDate[index : index + 3] for index in range(0, len(secondDate), 3)]
                # add text for link element
                f.write('                       ' + splitDate1[0] + ' ' + splitDate1[1] + ' - ' + splitDate2[0] + ' ' + splitDate2[1])
            else:
                f.write('                       ' + splitDate1[0] + ' ' + splitDate1[1])
            f.write("\n")
            f.write('                   </a>')
            f.write("\n")
            f.write('               </div>')
            f.write("\n")
    f.write('           </div>')
    f.write("\n")
    f.write('       </div>')
    f.write("\n")
    f.write('       <script type="text/javascript" src="js/index.js"></script>')
    f.write("\n")
    f.write('   </body>')
    f.write("\n")
    f.write('</html>')
    f.write("\n")

print('index.html updated')