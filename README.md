# Tessellated Security

For the DYI security afficionado, all inclusive code to run a server (Node/Express) with database (MongoDB/Mongoose), webclient, and a [tessel](https://tessel.io/) hooked up to [magnetic door switch](https://www.sparkfun.com/products/13247). With everything set up, the service allows a user to receive an email anytime a door opens. A detailed spec sheet of all of the parts used along with detailed instructions on how to put what where are in the Github repo link below.  The project's server is hosted on Heroku while the database hosted is on mLab. 

Go to [this repo on GitHub](https://github.com/EnshaednHiker/tessellated-security) to see how all of the parts work together, instructions on how to set everything up, and a demo of the service in action. Below is an explanation about setting up the code on the tessel. These instructions are aimed at people with maybe minimal coding experience. Let me know if things are unclear, and I'll endeavor to clarify them.

## tessellated-security-command-line-package
an npm package to install software onto a tessel 2 for the Tessellated Security service

1. Make sure you are using the LTS version of Node/npm package manager. That can be found [here](https://nodejs.org/en/).

2. Go to the command line utility on your computer. I am a fan of [cmder](http://cmder.net/) if you're on a Windows computer but the Command Prompt program will work fine too. If you're on Mac or Linux machine, you are on your own.

3. Go into your command line program of choice and type `npm install -g tessellated-security` and hit enter. This installs the package globally, meaning you don't have to know where package files are in your system in order to access them.

4. Before installing the files on your tessel, you will need to set it up. Read all through steps 0, 1, and 2 [here](https://tessel.github.io/t2-start/), and do steps 1 and 2.  This package depends on you already having installed tessel CLI via `npm install -g t2-cli`.  This system requires that your tessel have access to the internet, so make sure you follow the instructions in step 2 on how to set up wifi on your tessel. NOTE: I had a weird wifi setup with a poorly set up DSL modem and router, and did a ton of reading up on stack overflow and tessel developer communities only to realize that the problem was not the tessel and was in fact my weird internet setup. Simply by upgrading to the [NETGEAR Nighthawk AC1900 Wi-Fi VDSL/ADSL Modem Router](https://www.amazon.com/gp/product/B0111MRL4S/ref=oh_aui_search_detailpage?ie=UTF8&psc=1) for Centurylink DSL internet, I totally fixed my problem. FYI in case someone else has a problem with setting up their wifi on their tessel. 

5. Go to the [Tessellated Security website](https://enshaednhiker.github.io/tessellated-security-webclient/) and create an account. In your account page, enter the name of your device, most likely you will want to name it something that connotes which door it is guarding i.e. backdoor, garage door, front door, etc. When you receive alerts from the tessel whenever the door opens, whatever you named your tessel clues you in as to which door opened. On your account page with tessel device added to your account, copy the entire token.

6. With your tessel plugged in via usb to your computer, type `tessellated-security` in your command line program and hit enter. You will then be prompted to enter a token. Paste in your token you copied from your account page on the Tessellated Security website.  Hit enter.  Your tessel will then take about 2 to 3 minutes to get set up on and push over the files to make the system work. Once the process is over, you can unplug your tessel from your computer and install it on your door of choice. Now, whenever that tessel is connected to power and wifi, your security system will run, and you will receive emails noting each time that door opens. 

7. Go to [this repo on GitHub](https://github.com/EnshaednHiker/tessellated-security) to see a video of setting up the system and a demo showing it in action.



