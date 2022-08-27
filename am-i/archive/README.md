# Online presence
## Using my timesheet experiment to broadcast my presence/absence at the studio
### https://vincent.charlebois.info/am-i/

As part of *Consecutive days at the studio* - an experimental python application, I keep track of time spent at the studio.
I was interested in ways to broadcast this information online and used github actions to deploy to FTP.

I modified the app.py file in order to update am-i/present.txt to reflect if I am in or out of the studio. The content of this txt file is then fetched and displayed on my website.
