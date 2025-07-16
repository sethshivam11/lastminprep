"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { AlarmClock } from "lucide-react";
import { Button } from "./ui/button";

function TimerDialog() {
  const [timer, setTimer] = useState(0);
  const [stopped, setStopped] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return hrs > 0
      ? `${hrs.toString().padStart(2, "0")}:${mins
          .toString()
          .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : `${mins.toString().padStart(2, "0")}:${secs
          .toString()
          .padStart(2, "0")}`;
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
  };

  const toggleTimer = () => {
    if (stopped) {
      startTimer();
      setStopped(false);
    } else {
      clearInterval(timerRef.current);
      setStopped(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimer(0);
  };

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {timer ? formatTime(timer) : <AlarmClock />}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-center text-2xl">Timer</DialogTitle>
        <DialogDescription>
          Set a time limit for your attempt to enhance focus and improve time
          management. ⏳
        </DialogDescription>
        <h3 className="text-7xl text-center font-bold tracking-tight mb-4">
          {formatTime(timer)}
        </h3>
        <DialogFooter className="grid grid-cols-1 gap-2 sm:space-x-0">
          {timer ? (
            <DialogClose asChild>
              <Button onClick={toggleTimer}>
                {stopped ? "Resume" : "Stop"}
              </Button>
            </DialogClose>
          ) : (
            <DialogClose asChild>
              <Button onClick={startTimer}>Start</Button>
            </DialogClose>
          )}
          {timer ? (
            <Button onClick={resetTimer} variant="outline">
              Reset
            </Button>
          ) : (
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default TimerDialog;
