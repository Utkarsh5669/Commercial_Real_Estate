const API_BASE_URL = "http://localhost:5000/api"; // Ensure this matches your backend URL

// Handle Login
document.getElementById("login-form")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${API_BASE_URL}/auth/login`, { // Ensure the endpoint matches your backend
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json(); // Retrieve the token or user info if needed
    localStorage.setItem("token", data.token); // Store the token for future requests
    window.location.href = "properties.html";
  } else {
    document.getElementById("error-msg").textContent = "Invalid login credentials!";
  }
});

// Fetch Properties
if (window.location.pathname.includes("properties.html")) {
  async function fetchProperties() {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include the token in the request
      },
    });
    if (response.ok) {
      const properties = await response.json();
      const propertyList = document.getElementById("property-list");
      propertyList.innerHTML = properties
        .map(
          (p) => `
          <div>
            <h3>${p.title}</h3>
            <p>${p.location} - $${p.price}</p>
            <p>${p.description}</p>
          </div>
        `
        )
        .join("");
    } else {
      document.getElementById("property-list").innerHTML = "";
    }
  }
  fetchProperties();
}

// Fetch Recommendations
if (window.location.pathname.includes("recommendations.html")) {
  async function fetchRecommendations() {
    const response = await fetch(`${API_BASE_URL}/recommendations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include the token for auth
      },
      body: JSON.stringify({ property_id: 101 }), // Dummy property ID
    });

    if (response.ok) {
      const recommendations = await response.json();
      const recommendationList = document.getElementById("recommendation-list");
      recommendationList.innerHTML = recommendations
        .map((rec) => `<div>Property ID: ${rec.id}</div>`) // Adjust to match your recommendation structure
        .join("");
    } else {
      document.getElementById("recommendation-list").innerHTML = "";
    }
  }
  fetchRecommendations();
}

function goToRecommendations() {
  window.location.href = "recommendations.html";
}

function goToProperties() {
  window.location.href = "properties.html";
}
