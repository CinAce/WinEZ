export function registerUser(username, password, inviteCode = "") {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  const COACH_INVITE_CODE = "MAKECOACH2025";

  const normalizedCode = (inviteCode || "").trim();


  if (normalizedCode !== "" && normalizedCode !== COACH_INVITE_CODE) {
    return { success: false, message: "Invalid invite code" };
  }

  if (users[username]) {
    return { success: false, message: "User already exists" };
  }

  const role = normalizedCode === COACH_INVITE_CODE ? "coach" : "user";

  users[username] = {
    password,
    role
  };

  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Account created successfully", role };
}

export function loginUser(username, password) {
  const users = JSON.parse(localStorage.getItem("users")) || {};

  if (!users[username]) {
    return { success: false, message: "User not found" };
  }

  if (users[username].password !== password) {
    return { success: false, message: "Invalid password" };
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      username,
      role: users[username].role
    })
  );

  return { success: true, message: "Login successful" };
}

export function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function logoutUser() {
  localStorage.removeItem("currentUser");
}


export function promoteUser(username, newRole = "coach") {
  const users = JSON.parse(localStorage.getItem("users")) || {};
  if (!users[username]) {
    return { success: false, message: "User not found" };
  }
  users[username].role = newRole;
  localStorage.setItem("users", JSON.stringify(users));


  const current = JSON.parse(localStorage.getItem("currentUser") || "null");
  if (current && current.username === username) {
    current.role = newRole;
    localStorage.setItem("currentUser", JSON.stringify(current));
  }

  return { success: true, message: `User ${username} promoted to ${newRole}` };
}