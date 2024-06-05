import React, {useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AuthContext from "../../context/AuthProvider";
import {setDurationFormatted, setExamMeta, setTimeFinished} from "../../store/slices/examSlice";

const Timer = ({stop,timeFinished}) => {
    const examSummary = useSelector((state) => state.exam.meta);
    const { user } = useContext(AuthContext);
    const dispatch = useDispatch();
    const [countdown, setCountdown] = useState(() => {
        const bk = JSON.parse(localStorage.getItem("meta"));
        if(bk){
            if (bk?.userId === user.id) {
                dispatch(setExamMeta(bk));
            }
        }
        return examSummary?.duration_start;
    });
    const tick = useRef(); // <-- React ref
    useEffect(() => {
        if (!stop) {
            tick.current = setInterval(() => { // <-- set tick ref current value
                setCountdown((timer) => {
                    if(0 === timer) {
                        stopTime(true);
                        return timer;
                    }
                    return timer - 1;
                });
            }, 1000);
        } else {
           // <-- access tick ref current value
            stopTime();
            // console.log("I am clearing out",stop);
        }

        return () => {
            clearInterval(tick.current)
            // console.log("Timer getting destroyed: ",tick.current);
        }; // <-- clear on unmount!
    }, [stop]);
    const stopTime = (flag) => {
        clearInterval(tick.current);
        if(!flag) {
            sendTimerCount(formatTimeToSend());
        }
        else{
            timeFinished(formatTimeToSend());
        }
    }
    const sendTimerCount = (formatted) => {
        dispatch(setDurationFormatted(formatted));
    }
    const formatTimeToSend = () => {
        const hours = Math.floor(countdown / 3600);
        const minutes = Math.floor((countdown % 3600) / 60);
        const seconds = countdown % 60;
        return {
            hours,
            minutes,
            seconds
        }
    }
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="timer offset-md-4 mt4">
            <button disabled={countdown > 0}> {formatTime(countdown)}</button>{" "}
        </div>
    )
}

export default Timer
