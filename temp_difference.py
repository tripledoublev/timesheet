# takes last temp, 
# compares with new temp, 
# writes new temp and temp difference
def main(temp):
    with open("am-i/HOT.txt", "a+") as txt_file:
        # go to beginning of file
        txt_file.seek(0) 
        # look at the last line 
        last_Line = txt_file.readlines()[-1]
        # split with space ' '
        historical = last_Line.split(' ')
        # record past temp
        past_temp = historical[0]
    # reopens file to rewrite
    with open('am-i/HOT.txt','w') as f:
        temp_diff = float(past_temp) - float(temp)
        f.write(str(temp) + ' ' + str(round(temp_diff,2)))
