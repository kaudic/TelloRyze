# Tello Rize Project
I have been looking for a way to:
- get state indicators from the Drone and update the browser in real time
- retrieve and display in the browser the stream from the Drone's video stream
- design some controllers with buttons and arrows to send commands to the Drone to pilot it

If you launch this project you will get the [Tello Dashboard Screen](https://kaweb-freelance.s3.amazonaws.com/Tableau_de_Bord_1658242549308.JPG) on your browser (check the link). The screen is divided in 3 parts:
- real time indicators on the left
- stream of the video in the middle
- controllers on the right with flight logs on the bottom right


# Requirements

This is a nodejs programm so you will need to have it installed.
You also need the software FFmpeg installed.

# Installing the project

You will need to clone this repository and install the necessary modules

```
$ git clone git@github.com:kaudic/TelloRyze.git
$ cd telloRize
$ npm install
```


# Running

Before launching the script, you will need to make sure that the Tello Drone is on. Your computer or server will need to be connected to the WIFI of the Drone.

Then launch `npm run dev` or `node index.js` to get the app running.

Access the web app on your browser on port 3000 on **http://localhost:3000**

Please note that you will need to wait for a few seconds before the video stream starts.

Also note that on Windows I had to shut down Windows Defender as it was blocking the state from the Drone to access the computer.

# Thank you

First of all you will need to study the [Tello Ryze SDK Documentation](https://terra-1-g.djicdn.com/2d4dce68897a46b19fc717f3576b7c6a/Tello%20%E7%BC%96%E7%A8%8B%E7%9B%B8%E5%85%B3/For%20Tello/Tello%20SDK%20Documentation%20EN_1.3_1122.pdf).

To understand better how to connect in UDP to the drone and send commands  I have watched this [video](https://www.youtube.com/watch?v=JzFvGf7Ywkk) from jsolderitsch and also his [repo](https://github.com/jsolderitsch/tello-nodejs).

To understand how to stream the video from the Drone, using ffmpeg and Websocket, I have studied dbaldwin's [repo](https://github.com/dbaldwin/tello-video-nodejs-websockets#readme).

Without them, this project would not exist! Thanks !
