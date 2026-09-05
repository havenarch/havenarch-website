(function () {
	var bar = document.querySelector("[data-filter-bar]");
	if (!bar) {
		return;
	}

	var tiles = document.querySelectorAll(".project-grid [data-category]");

	bar.addEventListener("click", function (event) {
		var button = event.target.closest("[data-filter]");
		if (!button) {
			return;
		}

		var filter = button.getAttribute("data-filter");

		bar.querySelectorAll("[data-filter]").forEach(function (item) {
			item.classList.toggle("primary", item === button);
		});

		tiles.forEach(function (tile) {
			var match = filter === "all" || tile.getAttribute("data-category") === filter;
			tile.style.display = match ? "" : "none";
		});
	});
})();
