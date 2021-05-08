import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './home.css';
gsap.registerPlugin(ScrollTrigger);

const Homecomponents = () => {

    let firts_text = useRef(null);
    let second_text = useRef(null);
    let button_anm = useRef(null);
    let last_text = useRef(null);


    useEffect(() => {
        gsap.to(
            firts_text.current,
            {
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                y: 0
            }
        )

        gsap.to(
            second_text.current,

            {
                opacity: 1,
                duration: 1.9,
                ease: "power4.out",
                y: 0
            }

        )

        gsap.to(
            button_anm.current,
            {
                opacity: 1,
                duration: 1,
                ease: "power4.out",
                y: 0

            }
        )

        gsap.to(
            last_text.current,
            {
                duration: 1,
                scrub: 1,
                snap: {
                    snapTo: "labels", // snap to the closest label in the timeline
                    duration: { min: 0.2, max: 3 }, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
                    delay: 0.2, // wait 0.2 seconds from the last scroll event before doing the snapping
                    ease: "power4.inOut" // the ease of the snap animation ("power3" by default)
                },
                y: 0,
                opacity: 1
                
            }

        )

    });



    return (
        <div className="container">

            <div className="row welcome-texts">
                {/* Left side */}
                <div className="col col-md-5">
                    <div className="row">
                        <h1 className="display-4 first-text" ref={firts_text}>Let's make easy to fly drone !</h1>
                    </div>
                    <br></br>
                    <div className="row second-text" ref={second_text}>
                        <p>This project offers solution fly drone and monitoring it's status informations. </p>
                    </div>
                    <Link to="/connection" >
                        <button className="drive-button " ref={button_anm}>Let's Fly !</button>
                    </Link>
                </div>
                {/* Right side */}
                <div className="col right-col" >

                </div>
            </div>

            <div className="row lastText" ref={last_text}>
                <h1>
                    Summary
                </h1>
                <p>
                    Drone technology is used in a wide variety of diameters day by day. With this development, the data about the environment of the drone and its own status information are also developed thanks to the drones. Viewing this video leaves many drone interface visuals. In order for these drones to be controlled at the same time, different solutions can be produced in their remote controls, both because they are difficult to control and have limited maneuverability.
                    In this project, it is aimed to control these drones, which have entered many facets of our lives and have benefited, and to show us in a regular and aesthetic interface that they provide from their environment, and at the same time, the control of the drones is managed from a platform other than its own remote control to gain different capabilities and ready-made tasks.
                </p>
            </div>
        </div>
    );

};
export default Homecomponents;