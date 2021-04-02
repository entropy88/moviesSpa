import { html } from 'https://unpkg.com/lit-html?module';
import {login as apiLogin} from "./data.js"

function loginTemplate(onSubmit){
    return html`
    <section @submit=${onSubmit} id="form-login">
    <form class="text-center border border-light p-5" action="" method="">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
    </section>
    `
}

export async function login(ctx){
    console.log("hello")
    ctx.render(loginTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let form = e.target;
        let formData= new FormData(form);
        let email=formData.get("email");
        let password=formData.get("password");
        await apiLogin(email, password);
        console.log("userLogged");
        ctx.setUserNav();
        ctx.page.redirect("/")
        
    }
}