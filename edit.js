import { html } from 'https://unpkg.com/lit-html?module';
import {updateMovie} from "./data.js";
import { getMovieById} from "./data.js";

function editTemplate(movie,onSubmit){
    return html`       

   <section @submit=${onSubmit} id="edit-movie">
    <form class="text-center border border-light p-5" action="#" method="">
        <h1>Edit Movie</h1>
        <div class="form-group">
            <label for="title">Movie Title</label>
            <input type="text" class="form-control" placeholder="Movie Title" .value=${movie.title} name="title">
        </div>
        <div class="form-group">
            <label for="description">Movie Description</label>
            <textarea class="form-control" placeholder="Movie Description..." name="description" .value=${movie.description}></textarea>
        </div>
        <div class="form-group">
            <label for="imageUrl">Image url</label>
            <input type="text" class="form-control" placeholder="Image Url" .value=${movie.img} name="imageUrl">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    </section>
    `
}

export async function edit(ctx){
    let movieId=ctx.params.id;
    let movie=await getMovieById(movieId);
    ctx.render(editTemplate(movie,onSubmit));


    async function onSubmit(e){
        e.preventDefault();
        let form= e.target;
      let formData= new FormData(form);
      let title=formData.get("title");
      let description=formData.get("description");
      let img=formData.get("imageUrl");

      if (!title || !description || !img){
          return alert("All fields are mandatory!");
       }

  let movie={title,description,img}
  await updateMovie(movieId, movie);
  ctx.page.redirect("/details/"+movieId)
    }

}