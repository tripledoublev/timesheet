# CONSECUTIVE DAYS AT THE STUDIO

## A Python experiment to create a timecard for logging my time spent at the studio

I created a simple Python script that allows me to timestamp my presence in the workspace.
The data is stored in t.txt and will be used as basic material for generative art.

I added the possibility to log thoughts as strings in m.txt by using **--text**.
As you might want to share some of those thoughts, I added the option to **--tweet** in order to send these text logs directly to Twitter. 

I will fill this github repo with additional content as the project evolves.

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

        python3 app.py -text "Your text comes here"

- Add --tweet to send text log entry from command line interface to twitter

        python3 app.py -text "Your tweet comes here" --tweet
    
    The code used to tweet is located locally in the subfolder 'twitter' and saved as 'post_tweet.py'. In the file 'app.py', the tweeting component is imported on line 12 and the main() function is called on line 47. The 'post_tweet.py' file contains the following code which can be modified after setting up your own twitter credentials:   

        import tweepy

        ### Authorization protocol
        auth = tweepy.OAuthHandler("API KEY", "API SECRET KEY")
        auth.set_access_token("ACCESS TOKEN", "ACCESS TOKEN SECRET")

        ### Providing access to API 
        API = tweepy.API(auth)

        ### Tweeting to the linked twitter account
        API.update_status(status = (tweet))


- Enjoy timekeeping



VINCENT CHARLEBOIS, 2022
