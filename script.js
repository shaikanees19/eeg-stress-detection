function loadData() {
  fetch('output.json?t=' + new Date().getTime())
    .then(response => response.json())
    .then(data => {

      document.getElementById("stress").innerText =
        "Stress Level: " + data.stress_label;

      document.getElementById("percentage").innerText =
        "Stress Percentage: " + data.stress_percentage + "%";

      document.getElementById("alpha").innerText =
        "Alpha: " + data.relative_alpha;

      document.getElementById("beta").innerText =
        "Beta: " + data.relative_beta;

      document.getElementById("theta").innerText =
        "Theta: " + data.relative_theta;

      document.getElementById("time").innerText =
        "Last Updated: " + data.timestamp;
    })
    .catch(error => console.error("Error loading data:", error));
}

loadData();
setInterval(loadData, 5000);
