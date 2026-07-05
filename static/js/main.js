// main.js -- small UX helpers shared across pages.

// Auto-dismiss flashed alerts after a few seconds.
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.app-alert').forEach(function (alertEl) {
    setTimeout(function () {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
      bsAlert.close();
    }, 6000);
  });
});
