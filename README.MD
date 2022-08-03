# [CONSECUTIVE DAYS AT THE STUDIO](https://vincent.charlebois.info/consecutive-days/)

## A Python experiment to create a timecard for logging my time spent at the studio

### A exercise exploring the creative potential of the quantification of labour

I created a simple Python script that allows me to timestamp my presence in the workspace by using *--time IN* or *--time OUT*.
The data is stored in t.txt and will be used as basic material to generate alternate visualizations.

I added the possibility to log thoughts as strings in another file named m.txt by using **--text**.
As we live in a connected world, I thought I might want to share some of those thoughts.
 I added the option **--tweet** in order to send these text logs directly to Twitter. 

I will fill this github repo with additional content as the project evolves.

## [Am I at the studio?](https://vincent.charlebois.info/am-i/)

As an expanded exercise, I created a website that gets updated whenever I arrive or leave the studio. I also added a climate component to this app by using a Raspberry Pi Zero and the enviro board by Pimonori. By adding the **--climate** argument when logging in and out of the studio, I can fetch the temperature sensor's data and make it available online. 

### Instructions

- Clone this repository

        git clone https://github.com/tripledoublev/timesheet.git

- Move into the proper directory 

        cd timesheet

- Log in or out with --time

        python3 app.py --time IN
    or

        python3 app.py --time OUT

- Log your thoughts with --text

        python3 app.py --text "Your text comes here"

- The tweeting component is located in a subfolder 'twitter' and saved as 'post_tweet.py'. 
In the file 'app.py', the file is imported on line 12 and the main() function is called on line 53. To avoid errors when this component isn't installed, these have been commented out. To be able to tweet, you will need to do the following steps.

1. Sign up as a [Twitter developer](https://developer.twitter.com/) to use its API 

2. Create a folder name twitter

        mkdir twitter

3. Change directory into that new folder 

        cd twitter

4. Create a new file named post_tweet.py and insert the following code

        import tweepy

        ### Authorization protocol
        auth = tweepy.OAuthHandler("API KEY", "API SECRET KEY")
        auth.set_access_token("ACCESS TOKEN", "ACCESS TOKEN SECRET")

        ### Providing access to API 
        API = tweepy.API(auth)

        ### Tweeting to the linked twitter account
        API.update_status(status = (tweet))

5. Insert your access credentials where it says API KEY, SECRET, ACCESS TOKEN and ACCESS TOKEN SECRET

6. Install tweepy

        pip install tweepy

7. You can now uncomment line 12 and 53 in 'app.py' (remove '#' at the beginning of the line).

- You can now add --tweet to send your text log entry from the command line interface to twitter

        python3 app.py --text "Your tweet comes here" --tweet



- Enjoy timekeeping



[VINCENT CHARLEBOIS](https://vincentcharlebois.com), 2022
