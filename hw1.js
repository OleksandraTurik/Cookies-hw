class BaseError extends Error {
  constructor(message) {
    super(message);
  }
}

//BadInputError
class BadInputError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "BadInputError";
    this.badInput = true;
  }
}

//WrongCredentialsError
class WrongCredentialsError extends BaseError {
  constructor(message) {
    super(message);
    this.name = "WrongCredentialsError";
    this.wrongCredentials = true;
  }
}

const usersDB = [
  { username: "test", password: "admin" },
  { username: "kingOfBurgers", password: "iLoveMacDonald" },
];

const form = document.getElementById("login");

//wrong credentials
function getCred(username, password) {
  const currentUser = usersDB.find((user) => user.username === username);
  if (currentUser) {
    if (currentUser.password === password) {
      return currentUser;
    } else {
      throw new WrongCredentialsError("Password is wrong");
    }
  } else {
    throw new WrongCredentialsError("Username is wrong");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const password = e.target.password.value;
  if (!username.trim() || !password.trim()) {
    throw new BadInputError("Please fill in the form");
  }
  const user = getCred(username, password);
  console.log("Hello " + user.username);
});
