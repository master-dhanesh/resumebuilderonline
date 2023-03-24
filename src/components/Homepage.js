import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";

const Homepage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);
    const [show, setShow] = useState(true);
    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, []);
    const { scrollYProgress } = useScroll();
    const style = {
        width: "5vmax",
        height: "5vmax",
        backgroundColor: "red",
    };
    return (
        <div
            // style={{ height: "150vh", scaleX: scrollYProgress }}
            style={{ height: "150vh" }}
            className="bg-light container mt-5 p-5"
        >
            <h1 className="fs-1 fw-light ">Framer Motion</h1>
            <hr className="w-50" />
            <motion.button
                whileHover={{
                    scale: 1.2,
                    transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShow(!show)}
                className="mb-3 btn btn-primary"
            >
                {show ? "Hide" : "Show"}
            </motion.button>
            <AnimatePresence>
                {show && (
                    <motion.div
                        drag
                        whileDrag={{ scale: 1.2 }}
                        // dragMomentum={false}
                        // animate={{ y: 600 }}
                        // initial={{ opacity: 0 }}
                        // whileInView={{
                        //     rotate: 90,
                        //     opacity: 1,
                        //     transition: { delay: 5, duration: 5 },
                        // }}
                        // transition={{ ease: "easeOut", duration: 2 }}
                        // initial={{ opacity: 0 }}
                        // animate={{ opacity: 1, transition: { duration: 2 } }}
                        // exit={{ opacity: 0, transition: { duration: 5 } }}
                        style={style}
                    ></motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Homepage;
