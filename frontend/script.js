const form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = form.elements[0].value;
  const email = form.elements[1].value;
  const message = form.elements[2].value;

  const data = { name, email, message };

  fetch("/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(async function (response) {
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }
    return response.json();
  })
  .then(function () {
    alert("Message sent successfully");
    form.reset();
  })
  .catch(function (err) {
    console.error(err);
    alert("Error occurred");
  });
});
console.log("CI/CD working test");