class Timer {
    constructor(durationInput, startButton, pauseButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;

        // Optional Callbacks for Animation
        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', this.start);
        this.pauseButton.addEventListener('click', this.pause);
    }

    start = () => {
        if(this.onStart) {
            this.onStart(this.timeRemaining)
        }
        // Start with a tick
        this.tick();
        // Continue ticking at fixed interval thereafter
        // setInterval returns an interval_id which can be used for clearInterval
        this.interval = setInterval(this.tick, 20);
    };

    pause = () => {
        // Pause using interval_id
        clearInterval(this.interval);
    };

    tick = () => {
        this.timeRemaining = this.timeRemaining || 0;
        if (this.timeRemaining <= 0){
            this.pause();
            if(this.onComplete) this.onComplete();
        }
        else{
            this.timeRemaining = this.timeRemaining - 0.02;
            if(this.onTick) this.onTick(this.timeRemaining);
        }
    };

    /**
     * Using Getter and Setter Methods to hide the complexity of the code.
     * Any coder could only see the timeRemaining as an instance variable and
     * would not know how the time is being extracted
     *  */
    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    }

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    }
}
