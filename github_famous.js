let boton=document.getElementById('search-user');

let avatar;//= document.querySelector(".user-img")
let userLogin;//=document.querySelector(".username-title")
let createdAt;//=document.querySelector(".created-at")
let htmlURL;//=document.querySelector(".html-url")
let followers;//=document.querySelector(".followers")

let card=document.createElement('div');
card.classList.add("card", "text-white", "bg-dark", "mb-3", "p-5");
card.style.maxWidth='18rem';

let header=document.createElement('div');
header.classList.add("card-header");

let img=document.createElement('img'); 
img.classList.add("card-img-top", "user-img");

let cardBody=document.createElement('div'); 
cardBody.classList.add("card-body");

let cardHeaderTitle=document.createElement('h4'); 
cardHeaderTitle.classList.add("card");

let cardTitle=document.createElement('h5'); 
cardTitle.classList.add("card-title", "username-title");

let fameTitle=document.createElement('h5'); 
fameTitle.classList.add("card-title", "username-title");

let list=document.createElement('ul'); 
list.classList.add("list-group", "list-group-flush", "text-center");

let createdAtLi=document.createElement('li');
createdAtLi.classList.add("list-group-item", "text-white", "bg-dark");

let publicReposLi=document.createElement('li');
publicReposLi.classList.add("list-group-item", "text-white", "bg-dark", "public-repos");

let followersLi=document.createElement('li')
followersLi.classList.add("list-group-item", "text-white", "bg-dark", "followers");

list.appendChild(createdAtLi);
list.appendChild(publicReposLi);
list.appendChild(followersLi);

let linkWrapper=document.createElement('div');
linkWrapper.classList.add("text-center");

let link=document.createElement('a');
link.classList.add("btn", "btn-secondary", "btn-lg", "active", "html-url");
link.setAttribute('role', 'button');
link.setAttribute('aria-pressed', 'true');
link.textContent="Visitar su GIthub!"

linkWrapper.appendChild(link);

cardBody.appendChild(cardTitle);
cardBody.appendChild(fameTitle);
cardBody.appendChild(list);
cardBody.appendChild(linkWrapper);

card.appendChild(header);
card.appendChild(img);
card.appendChild(cardBody);

let resultsDiv=document.querySelector(".results-div");

cardHeaderTitle.innerHTML="RESULTADOS <br/> TU FAMA DEL 1 AL 10"

function fetchGit(userName) {
  fetch(`https://api.github.com/users/`+userName)
  .then(response => {
    console.log(response);

    if(response.status==403)
    throw new Error("Github te pateó porque hiciste demasiadas búsquedas");
    else if(response.status!=200)
      throw new Error("Usuario no encontrado");
    else
      return response.json();
  })
  .then(data => {
    console.log(data);
    console.log(data.followers);
    userData=data;

    cardTitle.textContent=data.login;
    createdAtLi.textContent=`Usuario creado el ${(new Date (data.created_at)).toLocaleString()}`;
    followersLi.textContent=`${data.login} tiene ${data.followers} seguidores.`;
    publicReposLi.textContent=`Cuenta con ${data.public_repos} repositorios públicos!`;
    fameTitle.textContent="Popularidad nivel: " + Math.floor(Math.log(data.followers, 121312));

    let scaleBroke=null;

    if (Math.floor(Math.log(data.followers, 121312))>10)
    {
      scaleBroke=document.createElement('h5');
      scaleBroke.classList.add("card-title", "username-title", "bg-light");
      scaleBroke.textContent=("ME ROMPISTE LA ESCALA DE TANTA POPULARIDAD!!!!");
    }

    img.setAttribute('src', data.avatar_url);
    link.setAttribute('href', data.html_url);

    resultsDiv.appendChild(cardHeaderTitle);
    if(scaleBroke!=null)
    resultsDiv.appendChild(scaleBroke);

    resultsDiv.appendChild(card);

    document.querySelector(".results-div").classList.remove("d-none");

  })
  .catch(err => {
    console.log(err);
    cardHeaderTitle.textContent=err;
    resultsDiv.appendChild(cardHeaderTitle);
    document.querySelector(".results-div").classList.remove("d-none");
  })
}

boton.addEventListener('click', function(e) {
  e.preventDefault();
  let userSearch=document.querySelector('.username').value;
  fetchGit(userSearch);
});











/* Escala logaritmica que me hizo mi papa */

// 491000	-	5.69	-	13.10
// 117000	-	5.07	-	11.67
// 81000	-	4.91	-	11.30
// 72000	-	4.86	-	11.18
// 50000	-	4.70	-	10.82
// 36000	-	4.56	-	10.49
// 29000	-	4.46	-	10.28
// 22000	-	4.34	-	10.00
// 16000	-	4.20	-	9.68
// 12000	-	4.08	-	9.39
// 9500	-	3.98	-	9.16
// 7000	-	3.85	-	8.85
// 6400	-	3.81	-	8.76
// 2000	-	3.30	-	7.60
// 1000	-	3.00	-	6.91
// 500	-	2.70	-	6.21
// 200	-	2.30	-	5.30
// 100	-	2.00	-	4.61
// 50	-	1.70	-	3.91
// 20	-	1.30	-	3.00
// 10	-	1.00	-	2.30
// 5	-	0.70	-	1.61
// 2	-	0.30	-	0.69
// 1	-	0.00	-	0.00