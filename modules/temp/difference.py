# takes last temp, 
# compares with new temp, 
# writes new temp and temp difference
import os

def main(temp):
    current = os.path.dirname(__file__)
    parent = os.path.split(current)[0]
    another_parent = os.path.split(parent)[0]
    file_path = os.path.join(another_parent, 'am-i', 'HOT.txt')
    with open(file_path, "a+") as txt_file:
        # go to beginning of file
        txt_file.seek(0) 
        # look at the last line 
        last_Line = txt_file.readlines()[-1]
        # split with space ' '
        historical = last_Line.split(' ')
        # record past temp
        past_temp = historical[0]
        # substract temp from past temp
        temp_diff = float(past_temp) - float(temp) 
        temps = [temp]
        temps.append(temp_diff)
        return temps
    # reopens file to rewrite
    # with open(file_path,'w') as f:
    #    temp_diff = float(past_temp) - float(temp)
    #    f.write(str(temp) + ' ' + str(round(temp_diff,2)))
