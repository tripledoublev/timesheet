# creates html from 
# txt files in the data folder
import os
from os import listdir
from os.path import isfile, join
onlyfiles = [f for f in listdir(join('consecutive-days', 'data')) if isfile(join('consecutive-days', 'data', f))]
for file in onlyfiles:
    fileless = file.split('.')
    digitless = fileless[0].split('_')
    title = digitless[1]
    filePath = join('consecutive-days', fileless[0] + '.html')
    with open(filePath,'w') as f:
        f.write('<!DOCTYPE html>')
        f.write("\n")
        f.write('<html>')
        f.write('<head>')
        f.write("\n")
        f.write('<title>')
        f.write("\n")
        f.write(title)
        f.write("\n")
        f.write('</title>')
        f.write("\n")
        f.write('<link rel="stylesheet" href="css/style.css"></head>')
        f.write("\n")
        f.write('<body id="dcontain">')
        f.write("\n")
        f.write('<div class="flexbox" id="fbox">')
        f.write("\n")
        f.write(' <script type="text/javascript" src="js/script.js"></script>')
        f.write("\n")
        f.write('<script>')
        f.write("\n")
        f.write("document.addEventListener('DOMContentLoaded', syncReadFile('data/")
        f.write(fileless[0])
        f.write("'));")
        f.write("\n")
        f.write("</script>")
        f.write("\n")
        f.write("</div>")
        f.write("\n")
        f.write("</body>")
        f.write("\n")
        f.write("</html>")
        print('created ' + fileless[0])