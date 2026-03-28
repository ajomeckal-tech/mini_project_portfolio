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
    let resData;

    // ✅ Handle empty or invalid JSON safely
    try {
      resData = await response.json();
    } catch (e) {
      throw new Error("Server returned invalid response");
    }

    if (!response.ok) {
      throw new Error(resData.error || "Something went wrong");
    }

    return resData;
  })
  .then(function (data) {
    console.log("✅ Success:", data);
    alert("Message sent successfully!");
    form.reset();
  })
  .catch(function (err) {
    console.error("❌ Error:", err.message);
    alert(err.message); // shows real error
  });
});