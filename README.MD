# [CONSECUTIVE DAYS AT THE STUDIO](https://vincent.charlebois.info/consecutive-days/)

## A timekeeping experiment for the digital manifestation of my physical presence at the studio

### A creative exercise exploring the visualization potential of quantified location-based artistic labour

It began when I created a simple Python script (**app.py**) that allowed me to timestamp my presence at the studio.
I was digitizing my presence by logging *--time IN* or *--time OUT*.

The data is stored in data/t.txt and became the basic material to generate a multitude of visualizations. Experimentation through this project brought me to write my own smart contract in Solidity and log my time at the studio on-chain on Optimism, a layer 2 ethereum scaling solution.

My interest in environmental sensing brought me to integrate [weather visualization](https://vincent.charlebois.info/weather/report.html) into the project.

## [Am I at the studio?](https://vincent.charlebois.info/am-i/)

### Presence log

As an expanded exercise, I created a website that gets updated whenever I arrive or leave the studio. I also added a climate component to this app by using a Raspberry Pi Zero and the enviro board by Pimonori. By adding the **--climate** argument when logging in and out of the studio, I can fetch the temperature sensor's data and make it available online. 

### On-chain activity

#### From the web to the dweb

As a continued experiment, I decided to bring these interactions on the blockchain - a distributed ledger offers storage and composability. The stored information can then be used as basic material for further exploration.

#### Smart Contracts

##### Manifesting geolocation

On Aug-17-2022 03:24:05 PM +UTC, I deployed [a smart contract](https://optimistic.etherscan.io/address/0xaf6c153972fbc7d67feaa9f9d1d08f3c13f79773) on Optimism, an Ethereum L2 blockchain. Whenever I leave or arrive at the studio, I call the togglePresence() function to align the on-chain boolean called presence and the string named statement to my physical presence at the studio. That contract can be found at contracts/AtTheStudio.sol 

##### Storing environmental conditions

On Oct-08-2022 03:31:14 PM +UTC, I deployed the second [smart contract](https://optimistic.etherscan.io/address/0x673acb29765fab093ddd522850f16f0b2e3d3c39) on Optimism. This second contract contains an array of weather data that is updated whenever I arrive or leave the studio. This array contains temperature, humidity, luminosity and barometric pressure data. That contract can be found at contracts/Weatherdata.sol 

##### Contract miscellanea 
Additionnal functions include a withdrawing option if this address was ever sent funds by mistake or as donation. setOwner allows to transfer the ownership of the contract to another address than the current one. Eth donations can be sent directly to the contract address 0xAf6C153972fBC7d67feaA9f9d1d08F3c13f79773 **on optimism** as a way to fund and support further creative blockchain explorations.

## Series of [consecutive days at the studio](https://vincent.charlebois.info/consecutive-days/)

I regrouped days into series of consecutive days. 

### log.sh has become my all-in-one script
#### it takes IN, OUT or no argument
#### OUT and no arguments takes the timesheet data and creates series of consecutive days as html-based visualization.

1. I wrote scripts that take the timesheet data and computes daily totals and regroups days when consecutive.
 - timeMachine.py
2. From these daily totals, series of consecutive days' totals are compiled as separate txt files (consecutive-days/data/...)
 - data/export.py
3. These text files are used to generate corresponding HTML
 - generate/html.py
4. In the end, the html files are used to populate the index.html
 - generate/index.py

## EXTRAS

### Text log, tweeting for the command line terminal and integrated environmental conditions

As I've been working with environmental sensors, I added the **--climate** argument to access the enviro board on my raspberry pi at the studio in order to include weather information on my timesheet. [Follow this link to view the latest weather report](https://vincent.charlebois.info/weather/)

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
