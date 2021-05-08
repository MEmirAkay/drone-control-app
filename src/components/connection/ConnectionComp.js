import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const Connection = () => {

    let firts_text = useRef(null);
    let second_text = useRef(null);
    let third_text = useRef(null);
    

    useEffect(() => {
        gsap.to(
            firts_text.current,
            {
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                marginLeft: 0
            }
        )
        gsap.to(
            second_text.current,
            {
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                marginLeft: 0
            }
        )
        gsap.to(
            third_text.current,
            {
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                marginLeft: 0
            }
        )

    });

    return (
        <div className="container justify-content-center pb-5">
            <h1 className="display-4">Connection</h1>
            <p>This guide prepared for local server setup.</p>
            <div className="col-md-10 pb-5" id="press_button" ref={firts_text}>
                <div id="drone_pressbutton"></div>
                <p className="pt-3 pl-5">Press the start button where side of drone.</p>
            </div>
            <div className="col-md-10 pb-5" id="connection_pc" ref={second_text}>
                <div id="connectiontoPC"></div>
                <p className="pt-3 pl-5">As you can see from the picture drone's wifi will be available on your device's wifi connection panel. You need connect that.</p>
            </div>
            <div className="col-md-10 pb-5" id="server_up" ref={third_text}>
                <div id="start_server"></div>
                <p className="pt-3 pl-5">If you can see this page at the moment you have
                already installed and started fontend side of project.
                Now you need to start server site script to fly drone.
          Start <a href="https://www.google.com/search?client=firefox-b-d&q=command+prompt"><code>Command Prompt</code></a> as a Administrator in project file main direction and type these in order:</p>
                <p className="pl-5"><code>cd .\src\backend\</code></p>
                <p className="pl-5"><code>node fly.js</code></p>
                <p className="pt-3 pl-5">If you can see the messages from <b>socket.io server</b> and <b> ok message from drone</b> you compleate all connection to fly drone.</p>
                <h1 className="pl-5 text-center">SETUP COMPLEATE</h1>
                <div className="letsgo_btn">
                    <Link to="/control">
                        <button id="drive-button">Let's Fly !</button>
                    </Link>
                </div>
            </div>
        </div>
    );

};
export default Connection;