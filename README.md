# Control Panel Solution For DJI Tello

This project offers new control solution and graphical differences than other control panels.
<img src="src/components/img/control.png" >

## Important Informations Before Fly
1- Make sure that Tello's firmware is updated. 
([You can update from mobile app](https://play.google.com/store/apps/details?id=com.ryzerobotics.tello&hl=en&gl=US) by using [this](https://youtu.be/zHYj1hzlH20?t=18) tutorial.)

2- The drone flight speed was set optimal speed for indoor or outdoor flights.

3- If you don't send any command in 15 second drone will automatically land where it be.

**I'm not responsible for any damage from drone**

# Setup
In the project directory run:
### `npm start`
When opeations done, open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Stream

You need to install [Agent DVR](https://www.home-assistant.io/integrations/agent_dvr/) to see stream from drone.
Agent DVR runs at [http://localhost:8090](http://localhost:8090).

### If any issue about stream
If you already installed but you still can't see any stream. You need to open these ports security access from windows firewall settings:
*11111
*8090
*8889
*8890

#### How to open firewall ports 
1- Navigate to Control Panel, System and Security and Windows Firewall.
2- Select Advanced settings and highlight Inbound Rules in the left pane.
3- Right click Inbound Rules and select New Rule.
4- Add the port you need to open and click Next.
5- Add the protocol (TCP or UDP) and the port number into the next window and click Next.
6- Select Allow the connection in the next window and hit Next.
7- Select the network type as you see fit and click Next.
8- Name the rule something meaningful and click Finish.


# How to start fly 

1- I already [told](http://localhost:3000/connection) into project this topic but I will tell you again :)

2- Push start button on drone

3- Connect drone with Wi-Fi

4- Go in this directory in project `\Tello-Drone\drone-control-app\src\backend\` and run this:

### `node ./fly.js`

Drone will return you 'ok' message. At from this response you can use drone from control panel

Enjoy !