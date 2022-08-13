class FPSCounter {
    stop = false
    frameCount = 0
    fpsLimit = 60
    fpsInterval = 0
    startTime = 0
    then = 0
    elapsed = 0
    now = 0

    logFps = true

    init(fpsLimit: number) {
        this.fpsLimit = fpsLimit;
        this.fpsInterval = 1000 / this.fpsLimit;
        this.then = performance.now();
        this.startTime = this.then;
    }

    /** Update every animation frame to evaluate */
    update(time: number) {
        this.now = time;
        this.elapsed = this.now - this.then;
    }

    /** Step through next FPS step */
    step() {
        this.then = this.now - (this.elapsed % this.fpsInterval);
    }

    ready() {
        return this.elapsed > this.fpsInterval;
    }

    log() {
        if (this.logFps) {
            const sinceStart = this.now - this.startTime;
            const currentFps = Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
            console.log((currentFps | 0) + ' fps');
        }
    }
}

export default FPSCounter;