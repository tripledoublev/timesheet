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
    f.write('<h1 id="page-title" class="textColor">')
    f.write("\n")
    f.write('<a href="https://github.com/tripledoublev/timesheet/">')
    f.write("\n")
    f.write('Consecutive days at the studio')
    f.write("\n")
    f.write('</a></h1><div class="flexbox" id="fbox">')
    f.write("\n")
    for file in onlyfiles:
        if file != 'index.html':
            # add new line
            f.write("\n")
            fileless = file.split('.')
            f.write('<div class="textColor">')
            f.write("\n")
            f.write('<a href="' + file + '">')
            f.write("\n")
            f.write(fileless[0])
            f.write("\n")
            f.write('</a>')
            f.write("\n")
            f.write('</div>')
            f.write("\n")
    f.write('<script type="text/javascript" src="js/index.js"></script>')
    f.write("\n")
    f.write('</body>')
    f.write("\n")
    f.write('</html>')
    f.write("\n")