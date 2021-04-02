import { html } from 'https://unpkg.com/lit-html?module';
import {register as apiRegister} from "./data.js";

function registerTemplate(onSubmit){
    return html`
    <section @submit=${onSubmit} id="form-sign-up">
    <form class="text-center border border-light p-5" action="#" method="post">
        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" placeholder="Email" name="email" value="">
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" placeholder="Password" name="password" value="">
        </div>

        <div class="form-group">
            <label for="repeatPassword">Repeat Password</label>
            <input type="password" class="form-control" placeholder="Repeat-Password" name="repeatPassword" value="">
        </div>

        <button type="submit" class="btn btn-primary">Register</button>
    </form>
    </section>`
}

export async function register(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let form = e.target;
        let formData= new FormData(form);
        let email=formData.get("email");
        let password=formData.get("password");
        let repass=formData.get("repeatPassword");
        if (password!==repass){
            return alert("Passwords do not match!")
        }
        await apiRegister(email, password);
        console.log("userLogged");
        ctx.setUserNav();
        ctx.page.redirect("/")
        
    }
}