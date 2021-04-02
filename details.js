import { html } from 'https://unpkg.com/lit-html?module';
import { getMovieById} from "./data.js";
import {deleteMovie} from "./data.js";
import {likeMovie} from "./data.js"

function movieDetailsTemplate(movie, userIsOwner,delMov, like){
    return html`
     <section id="movie-example">
    <div class="container">
        <div class="row bg-light text-dark">
            <h1>Movie title: ${movie.title}</h1>

            <div class="col-md-8">
                <img class="img-thumbnail" src="${movie.img}"
                     alt="Movie">
            </div>
            <div class="col-md-4 text-center">
                <h3 class="my-3 ">Movie Description</h3>
                <p>${movie.description}</p>
                ${userIsOwner?html`<a @click=${delMov} class="btn btn-danger" href="javascript:void(0)">Delete</a>
                <a class="btn btn-warning" href="/edit/${movie._id}">Edit</a>`:
                html` <a class="btn btn-primary" @click=${like} href="javascript:void(0)">Like</a>`}
           
                 <span id="likes"class="enrolled-span">Liked 1</span>
            </div>
        </div>
    </div>
    </section>
    `
}

export async function details(ctx){
    let movieId=ctx.params.id;
    let movie= await getMovieById(movieId);
    let userIsOwner=sessionStorage.getItem("userId")==movie._ownerId;
    
    ctx.render(movieDetailsTemplate(movie, userIsOwner, delMov,like));
    async function delMov(){
        let confirmed=confirm("are You sure?");
        if (confirmed){
            await deleteMovie(movieId);
            ctx.page.redirect("/")
        }
    }

    async function like(){
        let likes= await likeMovie(movieId);
        console.log(likes)
    }

}