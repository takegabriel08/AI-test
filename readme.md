# Welcome to ThisGitRepo!

This is a demo project that works with **Google aistudio**. If you want to learn about google aistudio, you can go to https://aistudio.google.com/. 

## How to get started?

First you need to clone the repo by running git clone **https://github.com/takegabriel08/AI-test.git**.
open the folder in terminal or drag the folder on to VS Code.
Then do npm install.
Make sure to create a .env file where you set your own google aistudio api key from [Over here](https://aistudio.google.com/app/apikey)

## What is going on in this project?
There are 2 entry files:
**index.js**
**fineTuned.js**
To run them you can do node **name_of_the_file**.js.

## **index.js** 
Is using some premade prompts inside the **./Prompts** folder and the bits of text from **./Boiler** folder to write a complete Software offer using the Nodejs fs module, by creating a new document: **offer.txt**
## **fineTuned.js** 
Is using a pretrained ai model to attempt to generate a similar offer. The model has been pretrained with 15 of the offer files provided in the project input. 
It takes as an input **Solicitarea client:** text from the beginning of the Test offer **.docx** files and should return the complete offer. Since I didn't have a very large set of data to train the ai model it will sometimes fail.

The project is using node 20.13.1, in case this maters.
