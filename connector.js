import page from "//unpkg.com/page/page.mjs";
import { html, render } from 'https://unpkg.com/lit-html?module';

import {login} from "./login.js";
import {register} from "./register.js";
import {logout as apiLogout} from "./data.js"
import {catalog} from "./catalog.js";
import {details} from "./details.js";
import {edit} from "./edit.js";
import {create} from "./create.js";


let main=document.querySelector("main");
document.getElementById("logoutBtn").addEventListener("click", logout)
setUserNav();

page("/", loadData, catalog);
page("/login", loadData, login);
page("/register", loadData, register)
page ("/details/:id", loadData, details);
page ("/edit/:id", loadData, edit);
page ("/create", loadData, create)
page.start();

function setUserNav(){
    let userFields=Array.from(document.getElementsByClassName("user"));
    let guestFields=Array.from(document.getElementsByClassName("guest"));
    let greeting=document.getElementById("welcomeLink");
    let loggedUser=sessionStorage.getItem("userId");

    if (loggedUser!=null){
        userFields.forEach(f => {
            f.style.display="block"
        });
      
        greeting.textContent=`Welcome, ${sessionStorage.getItem("email")}`;
        guestFields.forEach(f => {
            f.style.display="none"
        });
    } else {
        userFields.forEach(f => {
            f.style.display="none"
        });
        guestFields.forEach(f => {
            f.style.display="block"
        });
    }
}

function loadData(ctx, next){
    ctx.render=function(content){
        render(content, main);
    }
    ctx.setUserNav=setUserNav;
    next();
}
function logout(){
    console.log(sessionStorage.getItem("authToken"))
    apiLogout();
    setUserNav();
    page.redirect("/")
}