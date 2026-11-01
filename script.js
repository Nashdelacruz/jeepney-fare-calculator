let routeOrigin = document.querySelector("#routeOrigin");
let routeDestination = document.querySelector("#routeDestination");
let routeSubmit = document.querySelector(`#routeSubmit`);
let routeError = document.querySelector(`#routeError`);
let routeResult = document.querySelector("#routeResult");
let routeLines = document.querySelector(`#routeLines`);

// Route Lines list
const routeOne = [
  {
    route: "Town Proper",
    distance: 0,
  },
  {
    route: "Remerata Street",
    distance: 1,
  },
  {
    route: "Plastic Bottle Center",
    distance: 2,
  },
  {
    route: "Villa Olympia",
    distance: 3,
  },
  {
    route: "Villa Consolacion Subd.",
    distance: 4,
  },
  {
    route: "Magsaysay/Riverside",
    distance: 5,
  },
  {
    route: "Narra",
    distance: 6,
  },
  {
    route: "Langgam/Filinvest",
    distance: 7,
  },
];

const routeTwo = [
  {
    route: "Pacita",
    distance: 0,
  },
  {
    route: "Tunasan",
    distance: 5,
  },
  {
    route: "Alabang",
    distance: 10,
  },
];

// Destination Variables
let origin = 0;
let destination = 0;
let totalDistance = 0;
let succeeddingdistance = 0;
let totalfare = 0;

// Base Fare
const baseFareRegular = 17;
const baseDistanceFareRegular = 2.4;

routeOrigin.addEventListener("change", () => {
  origin = Number(routeOrigin.value);
});
routeDestination.addEventListener("change", () => {
  destination = Number(routeDestination.value);
});

// Check for the duplicate destination
routeSubmit.onclick = function () {
  RouteLineCheck();
};

function DuplicateCheck() {
  if (origin === destination) {
    routeError.classList.add("route__dashboard__error");
    routeError.textContent =
      "Duplicate Destination! Please check your option and try again.";
  } else {
    routeError.classList.remove("route__dashboard__error");
    routeError.textContent = null;
    CalculateDistance();
  }
}

// Check if the Route Line is set
function RouteLineCheck() {
  if (routeLines.value == 0) {
    routeError.classList.add("route__dashboard__error");
    routeError.textContent =
      "No route line set! Please select your line first.";
  } else {
    routeError.classList.remove("route__dashboard__error");
    routeError.textContent = null;
    DuplicateCheck();
  }
}

function CalculateDistance() {
  totalDistance = destination - origin;
  if (totalDistance < 0) {
    totalDistance *= -1;
  }

  // Calculate Succeeding Distances
  if (totalDistance >= 5) {
    succeeddingDistance = totalDistance - 4;
    totalFare = baseFareRegular + succeeddingDistance * baseDistanceFareRegular;
    totalFare = totalFare.toFixed(0);
    fareText.textContent = `${totalFare}`;
  } else {
    totalFare = baseFareRegular;
    totalFare = totalFare.toFixed(0);
    fareText.textContent = `${baseFareRegular}`;
  }
  ShowFare();
}

function ShowFare() {
  routeResult.classList.remove("hidden");
}

// Route Selector
routeLines.addEventListener("change", () => {
  RemoveOldOption();
  ToggleRouteOption();
  switch (routeLines.value) {
    case "1":
      ChangeLineToOne();
      break;

    case "2":
      ChangeLineToTwo();
      break;

    default:
      break;
  }
});

function RemoveOldOption() {
  document
    .querySelectorAll("#routeOption")
    .forEach((option) => option.remove());
}

// Toggle Route Option Visibility
function ToggleRouteOption() {
  if (routeLines.value == 0) {
    routeOrigin.setAttribute("disabled", true);
    routeDestination.setAttribute("disabled", true);
  } else {
    routeOrigin.removeAttribute("disabled");
    routeDestination.removeAttribute("disabled");
  }
}

// Change Route Option

function ChangeLineToOne() {
  for (let a of routeOne) {
    const c = document.createElement("option");
    c.textContent = `${a.route}`;
    c.id = "routeOption";
    c.value = a.distance;
    routeOrigin.append(c);
  }

  for (let b of routeOne) {
    const d = document.createElement("option");
    d.textContent = `${b.route}`;
    d.value = b.distance;
    d.id = "routeOption";
    routeDestination.append(d);
  }
}

function ChangeLineToTwo() {
  for (let a of routeTwo) {
    const c = document.createElement("option");
    c.textContent = `${a.route}`;
    c.id = "routeOption";
    c.value = a.distance;
    routeOrigin.append(c);
  }

  for (let b of routeTwo) {
    const d = document.createElement("option");
    d.textContent = `${b.route}`;
    d.value = b.distance;
    d.id = "routeOption";
    routeDestination.append(d);
  }
}
