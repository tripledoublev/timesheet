# CONSECUTIVE DAYS AT THE STUDIO

## A Python experiment to create a timecard for logging my time spent at the studio

### A creative exercise exploring the potential financialization of the quantification of location-based artistic labour

It began when I created a simple Python script (**app.py**) that allows me to timestamp my presence in the studio by logging *--time IN* or *--time OUT*.
The data is stored in data/t.txt and became the basic material to generate a multitude of visualizations.

## [Am I at the studio?](https://vincent.charlebois.info/am-i/)

### Presence log

As an expanded exercise, I created a website that gets updated whenever I arrive or leave the studio. I also added a climate component to this app by using a Raspberry Pi Zero and the enviro board by Pimonori. By adding the **--climate** argument when logging in and out of the studio, I can fetch the temperature sensor's data and make it available online. 

### On-chain activity

On Aug-17-2022 03:24:05 PM +UTC, I deployed [a smart contract](https://optimistic.etherscan.io/address/0xaf6c153972fbc7d67feaa9f9d1d08f3c13f79773) on Optimism, an Ethereum L2 blockchain. Whenever I leave or arrive at the studio, I call the togglePresence() function to align the on-chain boolean called presence and the string named statement to my physical presence at the studio. Additionnal functions include a withdrawing option if this address was ever sent funds (by mistake or as donation) and setOwner if I ever needed to transfer the ownership to another address than the current one (for security reasons or after selling it). Eth donations can be sent directly to the contract address 0xAf6C153972fBC7d67feaA9f9d1d08F3c13f79773 as a way to fund and support further creative blockchain explorations.

## Series of [consecutive days at the studio](https://vincent.charlebois.info/consecutive-days/)

### compiler.sh takes the timesheet data and creates series of consecutive days as html-based visualization.

I wrote scripts that take the timesheet data and computes daily totals and regroups days when consecutive.
 - timeMachine.py
From these daily totals, series of consecutive days' totals are compiled as separate txt files (consecutive-days/data/...)
 - data/export.py
These text files are used to generate corresponding HTML
 - generate/html.py
In the end, the html files are used to populate the index.html
 - generate/index.py

## EXTRAS

### Text log, tweeting for the command line terminal and integrated enviromental conditions

As I've been working with environmental sensors, I added the **--climate** argument to access the enviro board on my raspberry pi at the studio in order to include weather information on my timesheet.

I also added the possibility to log thoughts as strings in another file in the same folder (data/m.txt) by using **--text**.

As we live in a connected world, I thought I might want to share some of those thoughts.
I added the option **--tweet** in order to send these text logs directly to Twitter from my Command Line Interface. 

This is a work and progress. I will fill this github repository with additional content as the project evolves.


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

7. You can now uncomment line 16 and 60 in 'app.py' (remove '#' at the beginning of the line).

- You can now add --tweet to send your text log entry from the command line interface to twitter

        python3 app.py --text "Your tweet comes here" --tweet



- Enjoy timekeeping



[VINCENT CHARLEBOIS](https://vincentcharlebois.com), 2022
