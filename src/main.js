"use strict";
// HTML Element
const auth_section = document.getElementById("authSection")

// APP

// Functions
function display_create_account() {
  history.replaceState({}, document.title, "createAccount");
  auth_section.innerHTML = `
  <form id="form-create-account" class="w-full space-y-5 scale-90">
<div class="space-y-3 mt-10">
  <input type="text" autocomplete="off" placeholder="Name" name="Name:" id="nameField" class="input-control"/> 
  <input type="password" placeholder="Password" name="Password:" id="passwordField" class="input-control"/> 
</div>
  <button type="submit" class="btn bg-tertiary text-highlight -tracking-tight">Create Account</button>   
  </form>
          
          
          
          `
  const nameField = document.getElementById("nameField")
  const passwordField = document.getElementById("passwordField")
  const formCreateAccount = document.getElementById("form-create-account")

  formCreateAccount.addEventListener("submit", function (e) {
    const date = new Date()
    e.preventDefault()
    const accountData = {
      Name: nameField.value,
      id: Date.now(),
      Password: passwordField.value,
      game: {
        totalScore: 0,
        gamePlayed: 0,
      },
      createdAt: date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear(),


    }
    createAccount(accountData)
    formCreateAccount.reset()
  })
}
function display_login_account() {
  history.replaceState({}, document.title, "login");
  auth_section.innerHTML = `
  <form id="form-create-account" class="w-full space-y-5 scale-90">
 <div class="space-y-3 mt-10">
 <input type="text" autocomplete="off" placeholder="Name" name="Name:" id="nameField" class="input-control"/> 
 <input type="password" placeholder="Password" name="Password:" id="passwordField" class="input-control"/> 
 </div>
 
 
          <button class="btn bg-tertiary text-highlight tracking-widest">Login</button>
          
          </form>
          
          
          
          `
  const nameField = document.getElementById("nameField")
  const passwordField = document.getElementById("passwordField")
  const formCreateAccount = document.getElementById("form-create-account")
  formCreateAccount.addEventListener("submit", function (e) {
    e.preventDefault()
    login({
      Name: nameField.value,
      Password: passwordField.value
    })
  })
}
function display_main() {
  history.replaceState({}, document.title, "");
  auth_section.innerHTML = `
  <button id="createAccount-btn" class="btn bg-tertiary text-highlight -tracking-tight">Create Account</button>
  <butoon id="loginAccountBtn-btn" class="btn text-black no-stroke tracking-widest">Login</butoon>
        
  `
  const createAccountBtn = document.getElementById("createAccount-btn")
  const loginAccountBtn = document.getElementById("loginAccountBtn-btn")

  createAccountBtn.addEventListener("click", function () {
    display_create_account()
  })
  loginAccountBtn.addEventListener("click", function () {
    display_login_account()
  })
}
(function () {
  const currentRoute = location.pathname.replace("/", "")
  switch (currentRoute) {
    case "login":
      display_login_account()
      break;
    case "createAccount":
      display_create_account()
      break;
    default:
      display_main()
      break;
  }

})()

function createAccount(newAccount) {
  const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
  const isExist = accounts.filter((account) => account.Name === newAccount.Name).length > 0 ? true : false

  if (isExist) {
    return "Account is exist"
  } else {
    localStorage.setItem("accounts", JSON.stringify(accounts.concat(newAccount)))
    display_login_account()
  }

}
function login(values) {
  const data = JSON.parse(localStorage.getItem("accounts"))
  const isVaild = data.filter(account => account.Name === values.Name && account.Password === values.Password) ? true : false
  
  if (isVaild) {
    const myAccount = data.filter(account => account.Name === values.Name && account.Password === values.Password)[0]
    localStorage.setItem("session", true)
    localStorage.setItem("myAccount",JSON.stringify(myAccount))
    location.href = "/game.html"
  } else {
    console.warn("wrong password or name is not define.")
  }
}
