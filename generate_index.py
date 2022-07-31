# creates index.html from 
# files in the folder
import os
from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir('consecutive-days/') if isfile(join('consecutive-days', f))]
with open('consecutive-days/index.html','w') as f:
    f.write('<!DOCTYPE html><html><head><title>Consecutive days at the studio</title>')
    f.write('<link rel="stylesheet" href="css/style.css"></head>')
    f.write('<body id="dcontain">')
    f.write('<h1 id="page-title" class="textColor">')
    f.write('<a href="https://github.com/tripledoublev/timesheet/">')
    f.write('Consecutive days at the studio')
    f.write('</a></h1><div class="flexbox" id="fbox">')
    for file in onlyfiles:
        # add new line except for first line
        f.write("\n")
        if file != 'index.html':
            fileless = file.split('.')
            f.write('<div class="textColor">')
            f.write('<a href="' + file + '">')
            f.write(fileless[0])
            f.write('</a>')
            f.write('</div>')
    f.write('<script type="text/javascript" src="js/index.js"></script>')
    f.write('</body>')
    f.write('</html>')