(function () {
	var form = document.getElementById("contact-form");
	var success = document.getElementById("form-success");

	if (!form || !success) {
		return;
	}

	form.addEventListener("submit", function () {
		window.setTimeout(function () {
			success.hidden = false;
			form.reset();
		}, 500);
	});
})();
