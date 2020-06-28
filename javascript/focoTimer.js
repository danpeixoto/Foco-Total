
// TODO: trocar som de inicio do timer a partir do primeiro descanso. Não da para ouvir

let currentTimer;
let active = false; // true quando o cronometro estiver ativo
let interval = false; // true quando for intervalo
let pomodoroCounter = 0;
let horaDeMessage = ["É hora de descansar!", "É hora de focar!", "Acabou!"];

function timerStop(stop = false) {

	if (stop) {
		clearInterval(currentTimer);
		active = false;
	}

}

function calculateResteTime() {
	return pomodoroCounter === 4 ? 1800 : 300;
}



function timer(duration, display, title, status) {
	let minutes;
	let seconds;
	currentTimer = setInterval(function () {
		duration--;

		minutes = parseInt(duration / 60, 10);
		seconds = parseInt(duration % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		let currentTime = `${minutes}:${seconds}`;
		display.textContent = currentTime;
		title.textContent = currentTime;

		if (duration === 0 && !interval) {

			document.querySelector("#end").play();
			timerStop(true);
			interval = true;
			active = true;
			pomodoroCounter ++;
			status.textContent = horaDeMessage[0];
			timer(calculateResteTime(), display, title, status);

		} else if (duration === 0 && interval) {


			timerStop(true);
			interval = false;
			pomodoroCounter = pomodoroCounter % 4 === 0 ? 0 : pomodoroCounter;

			if (pomodoroCounter > 0) {
				document.querySelector("#start").play();
				let originalTime = document.querySelector(".options > select").value * 60;
				status.textContent = horaDeMessage[1];
				timer(originalTime, display, title, status);
			} else {
				status.textContent = horaDeMessage[2];
			}
		}
	}, 1000);
}

function timerStart(start = false) {

	let display = document.querySelector(".timer > p");
	let title = document.querySelector("title");
	let duration = document.querySelector(".options > select").value * 60;
	let horaDe = document.querySelector(".horaDe");



	if (start && !active) {
		horaDe.textContent = horaDeMessage[1];
		document.querySelector("#start").play();
		timer(duration, display, title, horaDe);
		active = true;

	} else if (start && active) {
		document.querySelector("#start").play();
		clearInterval(currentTimer);
		horaDe.textContent = horaDeMessage[1];
		timer(duration, display, title, horaDe);
		active = true;

	}


}
