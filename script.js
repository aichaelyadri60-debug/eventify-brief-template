
function switchScreen(screenId) {
    // TODO:
    const Bouttons =document.querySelectorAll(".sidebar__btn");
    const Sections =document.querySelectorAll(".screen");
    const headerTitle =document.querySelector(".page-title");
    const suTitle =document.querySelector(".page-subtitle");
    // console.log(headerTitle.textContent)
    // console.log(suTitle)
    const headerTitles = {
        stats : {
            title: "Statistics",
            subTitle: "Overview of your events"
        },
        add : {
            title :  "Add Event",
            subTitle : "Create and schedule a new event"
        },
        list : {
            title : "Events",
            subTitle: "Manage your upcoming and active events"
        },
        archive : {
            title : "Archive",
            subTitle: "View your past and completed events"
        }
    }
    // console.log(headerTitles)
    for(b of Bouttons){
        b.classList.remove('is-active');
        if(b.getAttribute("data-screen") === screenId.getAttribute("data-screen")){
            b.classList.add('is-active');
        }
    }
    for(s of Sections){
        s.classList.remove('is-visible');
        if(s.getAttribute("data-screen") === screenId.getAttribute("data-screen")){
            s.classList.add('is-visible');
            headerTitle.textContent =  headerTitles[s.getAttribute("data-screen")].title;
            suTitle.textContent = headerTitles[s.getAttribute("data-screen")].subTitle;
            
        }
         if (s.getAttribute("data-screen") === "list") {
          afficherevenements(); 
        }
        if (s.getAttribute("data-screen") === "archive") {
          afficherarchive(); 
        }
      }
    }


function addvariant(){
  const parent =document.getElementById("variants-list");
  const enfant =document.createElement('div');
  enfant.classList.add("variant-row");
  enfant.innerHTML =`<input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
  <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
  <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
  <select class="select variant-row__type">
  <option value="fixed">Fixed Price</option>
  <option value="percentage">Percentage Off</option>
  </select>
  <button type="button" class="btn btn--danger btn--small variant-row__remove" onclick="RemoveVariant(this)">Remove</button>
  `

    parent.appendChild(enfant);


}

function RemoveVariant(element){
  const parent =element.closest(".variant-row");
  parent.remove();
}

const formulaire = document.getElementById("event-form");
formulaire.addEventListener("submit", (e) => {
  e.preventDefault();

  const Title = document.getElementById("event-title");
  const image = document.getElementById("event-image");
  const Description = document.getElementById("event-description");
  const Seats = document.getElementById("event-seats");
  const Price = document.getElementById("event-price");
  const rows = document.querySelectorAll(".variant-row");
  const rgximg =/^https?:\/\/[^?]+\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?(#.*)?$/i;
  let isValid = true;


  
  const variant =[];
  const erreur = document.getElementById("form-errors");
    erreur.innerHTML = "";

  if(Title.value.trim() === ""){
    erreur.innerHTML += `<span>the title is empty</br> </span>`;
    isValid = false;
  }

  if(!rgximg.test(image.value.trim())){
     erreur.innerHTML += `<span>the url is invalid</br> </span>`;
      isValid = false;
  }
    if(Description.value.trim() === ""){
    erreur.innerHTML += `<span>the description  is empty</br> </span>`;
    isValid = false;
  }
  rows.forEach((row, index) => {
  const row_name = row.querySelector(".variant-row__name");
  const row_qty = row.querySelector(".variant-row__qty");
  const row_value = row.querySelector(".variant-row__value");
  const row_type = row.querySelector(".variant-row__type");

  if (row_name.value.trim() === "") {
    erreur.innerHTML += `<span>Variant #${index + 1}: Name is required.</span><br>`;
    isValid = false;
  }

  if (Number(row_qty.value) <= 0 || row_qty.value.trim() === "") {
    erreur.innerHTML += `<div>Variant #${index + 1}: Quantity must be positive.</div>`;
    isValid = false;
  }

  if (Number(row_value.value) < 0 || row_value.value.trim() === "") {
    erreur.innerHTML += `<div>Variant #${index + 1}: Value must be valid.</div>`;
    isValid = false;
  }

  variant.push({
    id: index + 1,
    row_name: row_name.value,
    row_qty: row_qty.value,
    row_value: row_value.value,
    row_type: row_type.value,
  });
});



   if (!isValid) {
   erreur.classList.remove("is-hidden");
  erreur.classList.remove("alert--success");
    erreur.classList.add("alert--error");

   setTimeout(() => {
            erreur.innerHTML = "";
            erreur.classList.add("is-hidden");
        }, 4000);
    return; 
  }


  const evenement ={
    titre :Title.value ,
    img :image.value ,
    dsce :Description.value ,
    place :Seats.value ,
    prix :Price.value ,
    variant

  }


    erreur.innerHTML = "";
    erreur.innerHTML += "Form submitted successfully!";
    erreur.classList.remove("is-hidden");
    erreur.classList.add("alert--success");
    erreur.classList.remove("alert--error");
    setTimeout(() => {
         erreur.classList.add("is-hidden");
         erreur.innerHTML = "";
    }, 3000);


  let allevent = JSON.parse(localStorage.getItem("Evenements"))||[];
  allevent.push(evenement);

  localStorage.setItem("Evenements", JSON.stringify(allevent));
  formulaire.reset(); 
  document.getElementById("variants-list").innerHTML = ""; 
  afficherevenements();
  Statistics();

})



function afficherevenements() {
  const body = document.querySelectorAll(".table__body")[0];
  const data = JSON.parse(localStorage.getItem("Evenements")) || [];

  body.innerHTML = ""; 

  data.forEach((e, index) => {
    body.innerHTML += `
      <tr class="table__row" data-event-id="${index}">
        <td>${index+1}</td>
        <td>${e.titre}</td>
        <td>${e.place}</td>
        <td>${e.prix}  $</td>
        <td><span class="badge">${e.variant ? e.variant.length : 0}</span></td>
        <td>
          <button class="btn btn--small" data-action="details" data-event-id="${index}" onclick="detailsevent(this)">Details</button>
          <button class="btn btn--small" data-action="edit" data-event-id="${index}" onclick="modifierevent(this)">Edit</button>
          <button class="btn btn--danger btn--small" data-action="archive" data-event-id="${index}" onclick="supprimerevent(this)">Delete</button>
        </td>
      </tr>
    `;
  });
}


function supprimerevent(element) {

  let events = JSON.parse(localStorage.getItem("Evenements")) || [];
  let archives = JSON.parse(localStorage.getItem("archives")) || [];
  

  let parent = element.closest(".table__row");

  let titre = parent.querySelector("td:nth-child(2)").textContent.trim();
  let array = [];
  for (i = 0; i < events.length; i++) {
    if (events[i].titre === titre) {
      archives[archives.length] = events[i];
    } else {
      array[array.length] = events[i];
    }
  }

  localStorage.setItem("Evenements", JSON.stringify(array));
  localStorage.setItem("archives", JSON.stringify(archives));

  alert("Événement supprimé !");
  afficherevenements();
  afficherarchive();
  Statistics();
}

function detailsevent(elm) {
  const events = JSON.parse(localStorage.getItem("Evenements")) || [];
  const parent = elm.closest(".table__row");
  const titre = parent.querySelector("td:nth-child(2)").textContent.trim();
  const modal = document.querySelector(".modal");
  const modalbody = document.getElementById("modal-body");
events.forEach((e) => {
    if ( e.titre === titre) {
      modal.classList.remove("is-hidden");
      modalbody.innerHTML = `<h3>${e.titre}</h3>
        <p><strong>Places :</strong> ${e.place}</p>
        <p><strong>Variant :</strong> ${e.variant ? e.variant.length : 0}</p>
        <p><strong>Prix :</strong> ${e.prix} $</p>
        <p><strong>Description :</strong> ${e.dsce}</p>
      `;
    }
  }
)
}


function closemodel(){
  const modal = document.querySelector(".modal");
  modal.classList.add("is-hidden");
}



function modifierevent(elm){
  const events = JSON.parse(localStorage.getItem("Evenements")) || [];
  const parent = elm.closest(".table__row");
  const titre = parent.querySelector("td:nth-child(2)").textContent.trim();
  const modal = document.querySelector(".modal");
  const modalbody = document.getElementById("modal-body");
events.forEach((e,index) => {
    if ( e.titre === titre) {
      modal.classList.remove("is-hidden");
modalbody.innerHTML = `
  <h3>Modifier l'événement</h3>
  <div class="form-group">
    <label>Titre :</label>
    <input type="text" id="edit-titre" class="input" value="${e.titre}" />
  </div>

  <div class="form-group">
    <label>Nombre de places :</label>
    <input type="number" id="edit-place" class="input" value="${e.place}" />
  </div>

  <div class="form-group">
    <label>Prix :</label>
    <input type="number" id="edit-prix" class="input" value="${e.prix}" step="0.01" />
  </div>

  <div class="form-group">
    <label>Description :</label>
    <textarea id="edit-dsce" class="input">${e.dsce}</textarea>
  </div>

  <div class="form-group">
    <label>Image (URL) :</label>
    <input type="text" id="edit-img" class="input" value="${e.img}" />
  </div></br></br>

  <button class="btn btn--primary" onclick="saveModification(${index})">Sauvegarder</button>
`;

    }
  })



}

function saveModification(index) {
  const events = JSON.parse(localStorage.getItem("Evenements")) || [];

  const titre = document.getElementById("edit-titre").value.trim();
  const place = document.getElementById("edit-place").value.trim();
  const prix = document.getElementById("edit-prix").value.trim();
  const dsce = document.getElementById("edit-dsce").value.trim();
  const img = document.getElementById("edit-img").value.trim();

  events[index].titre = titre;
  events[index].place = place;
  events[index].prix = prix;
  events[index].dsce = dsce;
  events[index].img = img;

  localStorage.setItem("Evenements", JSON.stringify(events));

  document.querySelector(".modal").classList.add("is-hidden");
  afficherevenements();
}


document.getElementById("sort-events").addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "title-asc") Sortasc();
  if (value === "title-desc") Sortdesc();
  if (value === "price-asc") Sortascprice();
  if (value === "price-desc") Sortdescprice();
  if (value === "seats-asc") Sortascseats();

});
function affichage(){
   const events =JSON.parse(localStorage.getItem("Evenements"))||[];
    const body = document.querySelectorAll(".table__body")[0];
  body.innerHTML = "";
  events.forEach((e, index) => {
    body.innerHTML += `
      <tr class="table__row" data-event-id="${index}">
        <td>${index + 1}</td>
        <td>${e.titre}</td>
        <td>${e.place}</td>
        <td>${e.prix}  $</td>
        <td><span class="badge">${e.variant ? e.variant.length : 0}</span></td>
        <td>
          <button class="btn btn--small" data-action="details" onclick="detailsevent(this)">Details</button>
          <button class="btn btn--small" data-action="edit" >Edit</button>
          <button class="btn btn--danger btn--small" onclick="supprimerevent(this)">Delete</button>
        </td>
      </tr>
    `;
  }); 
}



function Sortasc(){
  let events = JSON.parse(localStorage.getItem("Evenements"))||[];

  for(i =0 ;i<events.length -1 ;i++){
    for(j=0;j<events.length-i-1 ;j++){
      if(events[j].titre.toLowerCase() > events[j+1].titre.toLowerCase()){
        let temp =events[j];
        events[j]=events[j+1];
        events[j+1] =temp;
      }
    }
  }
  localStorage.setItem("Evenements", JSON.stringify(events));
  affichage();
}


function Sortdesc(){
  const events =JSON.parse(localStorage.getItem("Evenements"))||[];
  // console.log(events);
  for(i=0;i<events.length-1;i++){
    for(j=0;j<events.length-i-1;j++){
      if(events[j].titre.toLowerCase() < events[j+1].titre.toLowerCase()){
        let temp =events[j];
        events[j]=events[j+1];
        events[j+1]=temp;
      }
    }
  }
  localStorage.setItem("Evenements", JSON.stringify(events));
  affichage();
}


  function Sortascprice(){
    const events =JSON.parse(localStorage.getItem("Evenements"))||[];
     for(i=0;i<events.length-1;i++){
    for(j=0;j<events.length-i-1;j++){
      if(Number(events[j].prix) > Number(events[j+1].prix)){
        let temp =events[j];
        events[j]=events[j+1];
        events[j+1]=temp;
      }
    }
  }
  localStorage.setItem("Evenements", JSON.stringify(events));
  affichage();
  }


    function Sortdescprice(){
    const events =JSON.parse(localStorage.getItem("Evenements"))||[];
     for(i=0;i<events.length-1;i++){
    for(j=0;j<events.length-i-1;j++){
      if(Number(events[j].prix) < Number(events[j+1].prix)){
        let temp =events[j];
        events[j]=events[j+1];
        events[j+1]=temp;
      }
    }
  }
  localStorage.setItem("Evenements", JSON.stringify(events));
  affichage();
  }

  function Sortascseats(){
    const events =JSON.parse(localStorage.getItem("Evenements"))||[];
    for(i=0;i<events.length-1;i++){
      for(j=0;j<events.length-i-1;j++){
        if(Number(events[j].place) > Number(events[j+1].place)){
          let temp =events[j];
          events[j]=events[j+1];
          events[j+1]=temp;
      }
      }
    }
    localStorage.setItem("Evenements",JSON.stringify(events));
    affichage();
  }


function filtrerEvenements() {
  const input = document.getElementById("search-events").value.toLowerCase();
  const events = JSON.parse(localStorage.getItem("Evenements")) || [];
  const body = document.querySelectorAll(".table__body")[0];
  body.innerHTML = "";

  events.forEach((e, index) => {
    if (e.titre.toLowerCase().includes(input)) {
      body.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${e.titre}</td>
          <td>${e.place}</td>
          <td>${e.prix}   $</td>
          <td><span class="badge">${e.variant ? e.variant.length : 0}</span></td>
          <td>
            <button class="btn btn--small" onclick="detailsevent(this)">Details</button>
            <button class="btn btn--small">Edit</button>
            <button class="btn btn--danger btn--small" onclick="supprimerevent(this)">Delete</button>
          </td>
        </tr>
      `;
    }
  });
      afficherevenements(); 
    }

    



function addvariant(){
  const parent =document.getElementById("variants-list");
  const enfant =document.createElement('div');
  enfant.classList.add("variant-row");
  enfant.innerHTML =`<input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
  <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
  <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
  <select class="select variant-row__type">
  <option value="fixed">Fixed Price</option>
  <option value="percentage">Percentage Off</option>
  </select>
  <button type="button" class="btn btn--danger btn--small variant-row__remove" onclick="RemoveVariant(this)">Remove</button>
  `

    parent.appendChild(enfant);


}

function RemoveVariant(element){
  const parent =element.closest(".variant-row");
  parent.remove();
}







function afficherarchive(){
  const archives =JSON.parse(localStorage.getItem("archives"))||[];
  const body =document.querySelectorAll(".table__body")[1];
  // console.log(body)
   body.innerHTML = "";
  archives.forEach((a,index) => {
    body.innerHTML +=`<tr class="table__row" data-event-id="${index}">
                                    <td>${index+1}</td>
                                    <td>${a.titre}</td>
                                    <td>${a.place}</td>
                                    <td>${a.prix}  $</td>
                                    <td>
                                        <button class="btn btn--small" data-action="restore" data-event-id="${index}" onclick="restaurerArchive(this)">Restore</button>

                                    </td>
                          </tr>`
  });

}



function restaurerArchive(element){
  const archives =JSON.parse(localStorage.getItem("archives"))||[];
  const events =JSON.parse(localStorage.getItem("Evenements"))||[];
  const parent =element.closest(".table__row");
  let titre = parent.querySelector("td:nth-child(2)").textContent.trim();
  let array =[];
  for(i=0;i<archives.length;i++){
    if(archives[i].titre === titre){
      events[events.length] = archives[i];
    }else{
      array[array.length] = archives[i];
    }
  }
  // const restore =archives.splice(index,1)[0];
  // events.push(restore);


  localStorage.setItem("archives",JSON.stringify(array));
   localStorage.setItem("Evenements",JSON.stringify(events));
    afficherarchive();
    afficherevenements();
    Statistics();
    alert("Événement restauré avec succès !");

}



function Statistics(){
  const events =JSON.parse(localStorage.getItem("Evenements"))||[];
  const totalevents=events.length;
  const total =document.getElementById("stat-total-events");
  total.textContent =totalevents;

  let places=0;
   events.forEach((e)=>{
    places +=Number(e.place) ;
   })
   let totalplace =document.getElementById("stat-total-seats");
   totalplace.textContent =places ;


   let prixtotal =0;
   events.forEach((e)=>{
    prixtotal +=Number(e.prix) ;
   })
   let totalprix =document.getElementById("stat-total-price");
   totalprix.textContent ="$ " +prixtotal ;

}

Statistics();
