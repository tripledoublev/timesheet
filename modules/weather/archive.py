# runs when --climate is used
# takes temp, humi and lux + timestamp 
# and appends the data to the archive
def main(temp, humi, lux, press, time, x):
    with open("climate.txt", "a+") as a:
        a.seek(0) 
        a.write("\n")
        a.write(str(x) + "Temp: " + str(temp) + " Humi: " + str(humi) + " Lux: " + str(lux) + " Pressure: " + str(press) + str(time))