(async () => {
  try {
    await import("./routes/solarCalculator.js");
    console.log("solarCalculator OK");
  } catch (e) {
    console.error("solarCalculator ERROR:", e);
  }
  try {
    await import("./routes/consultationForm.js");
    console.log("consultationForm OK");
  } catch (e) {
    console.error("consultationForm ERROR:", e);
  }
})();
