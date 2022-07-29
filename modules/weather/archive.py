# runs when --climate is used
# takes temp, humi and lux + timestamp 
# and appends the data to the archive
def main(temp, humi, lux, press, time, x):
    with open("../../data/climate.txt", "a") as a:
        a.write(x + "Temp: " + temp + " Humi: " + humi + " Lux: " + lux + " Pressure: " + press + time)