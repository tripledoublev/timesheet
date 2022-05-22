import os
from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir('consecutive-days/') if isfile(join('consecutive-days', f))]
with open('consecutive-days/index.html','w') as f:
    f.write('<!DOCTYPE html><html><head><title>Consecutive days at the studio</title><link rel="stylesheet" href="css/style.css"></head><body id="dcontain"><h1>consecutive days at the studio</h1><div class="flexbox" id="fbox">')
    for file in onlyfiles:
        f.write('<div class="textColor page-link"><a href="' + file + '">' + file + '</a></div>')
    f.write('<script type="text/javascript" src="js/script.js"></script></body></html>')