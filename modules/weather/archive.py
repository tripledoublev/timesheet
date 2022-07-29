# runs when --climate is used
# takes temp, humi and lux + timestamp 
# and appends the data to the archive
import os
def main(temp, humi, lux, press, time, x):
    current = os.path.dirname(__file__)
    parent = os.path.split(current)[0]
    another_parent = os.path.split(parent)[0]
    file_path = os.path.join(another_parent, 'data', 'climate.txt')
    with open("file_path", "a+") as a:
        a.seek(0) 
        a.write("\n")
        a.write(str(x) + "Temp: " + str(temp) + " Humi: " + str(humi) + " Lux: " + str(lux) + " Pressure: " + str(press) + str(time))