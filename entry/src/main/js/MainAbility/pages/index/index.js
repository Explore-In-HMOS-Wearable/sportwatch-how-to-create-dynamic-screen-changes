import app from '@system.app';
import vibrator from '@system.vibrator';
export default {
    data: {
        currentScreen: 'incoming',
        callTimer: '00:00',
        timerInterval: null,
        seconds: 0,
        vibrationInterval: null
    },

    onInit() {
        this.currentScreen = 'incoming';
        this.startVibration();
    },

    acceptClick() {
        this.stopVibration();
        this.currentScreen = 'accept';
        this.startTimer();
    },

    declineClick() {
        this.stopVibration();
        this.currentScreen = 'decline';
        setTimeout(() => {
            app.terminate();
        }, 3000);
    },

    endClick() {
        this.stopVibration();
        this.currentScreen = 'end';
        this.stopTimer();
        setTimeout(() => {
            app.terminate();
        }, 3000);
    },

    startTimer() {
        this.seconds = 0;
        this.callTimer = '00:00';
        this.timerInterval = setInterval(() => {
            this.seconds++;
            this.formatTimer();
        }, 1000);
    },

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    },

    formatTimer() {
        const minutes = Math.floor(this.seconds / 60);
        const secs = this.seconds % 60;
        this.callTimer =
            (minutes < 10 ? '0' + minutes : minutes) + ':' +
                (secs < 10 ? '0' + secs : secs);
    },

    startVibration() {
        this.stopVibration()
        vibrator.vibrate({
            mode: 'short',
            success() {
                console.log('success to vibrate');
            },
            fail(data, code) {
                console.log(`handle fail, data = ${data}, code = ${code}`);
            },
        });

        this.vibrationInterval = setInterval(() => {
            vibrator.vibrate({
                mode: 'short',
                success() {
                    console.log('success to vibrate');
                },
                fail(data, code) {
                    console.log(`handle fail, data = ${data}, code = ${code}`);
                },
            });
        }, 2000);
    },

    stopVibration() {
        if (this.vibrationInterval !== undefined) {
            clearInterval(this.vibrationInterval);
            this.vibrationInterval = null;
            vibrator.vibrate({
                mode: "none",
                success: function() {
                    console.log('Vibration stopped');
                },
                fail: function(err) {
                    console.log('Vibration stop error: ' + err);
                }
            });
        }
    }
}