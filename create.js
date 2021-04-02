import { html } from 'https://unpkg.com/lit-html?module';
import {createMovie} from "./data.js";

function createTemplate(onSubmit){
    return html`
    <section @submit=${onSubmit} id="add-movie">
        <form class="text-center border border-light p-5" action="#" method="">
            <h1>Add Movie</h1>
            <div class="form-group">
                <label for="title">Movie Title</label>
                <input type="text" class="form-control" placeholder="Title" name="title" value="">
            </div>
            <div class="form-group">
                <label for="description">Movie Description</label>
                <textarea class="form-control" placeholder="Description" name="description"></textarea>
            </div>
            <div class="form-group">
                <label for="imageUrl">Image url</label>
                <input type="text" class="form-control" placeholder="Image Url" name="imageUrl" value="">
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>

    `
}

export async function create(ctx){
    ctx.render(createTemplate(onSubmit));
    
    async function onSubmit(e){
        e.preventDefault();
        let form =e.target;
        let formData= new FormData(form);
        let title=formData.get("title");
        let description=formData.get("description");
        let img=formData.get("imageUrl");

        if (!title || !description || !img){
            return alert("All fields are mandatory!");
         }

         await createMovie({title,description,img});
         ctx.page.redirect("/");
    }
}