# WORKERS

Basic implementation of a Node Js and Express back-end made with a choice of standalone file system database or MongoDB. 
You can find the front-end in [this repository](https://github.com/alvarotor/workers-frontend).

This is a basic implementation of a multilanguage system that allows people join and provide with tags what kinda works and what are the skills that they can provide to possible other users that are willing to pay for them.

The users that are willing to pay and need people performing those tasks can find them by geolocation of where they are and their skills. They can see their profiles and contact them by messages that are also being sent by email with sendgrid, and also keep a conversation with them. Later on they can rate the worker by their performance quality.
The workers can add a profile and skills by tags that users can use to search for them. Also a minimal credit system added in case the website is used with a payment first system way of accessing.

You can use it as standalone for testing or for a minimal setup and testing, or also with MongoDB. But the system is programmed to be used with the json file system database so, the mongo is a minimal implementation to be able to use that setup into MongoDB. Just set it on the setting config file what database you want to use.

Feel free to test it, use it and provide changes, improvements and pull requests.

## TO MAKE IT WORK

Install Node in your system.

Run first 'npm install' to download all dependencies within the terminal in the folder of the proyect.

Open it with Visual Studio Code and press play. If dont have vscode or not wanna use it, within the root project folder execute on the terminal 'npm start'. 
Open after, the system that needs to be fed by this backend.
Its needed to add a sendgrid api code on the settings file to make the messages module work.
