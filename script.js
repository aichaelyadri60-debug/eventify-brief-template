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
let id=1;
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

  // if(!rgximg.test(image.value.trim())){
  //    erreur.innerHTML += `<span>the url is invalid</br> </span>`;
  //     isValid = false;
  // }
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
    id: id++ ,
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

})



function afficherevenements() {
  const body = document.querySelectorAll(".table__body")[0];
  const data = JSON.parse(localStorage.getItem("Evenements")) || [];

  body.innerHTML = ""; 

  data.forEach((e, index) => {
    body.innerHTML += `
      <tr class="table__row" data-event-id="${index}">
        <td>${index +1}</td>
        <td>${e.titre}</td>
        <td>${e.place}</td>
        <td>${e.prix}</td>
        <td><span class="badge">${e.variant ? e.variant.length : 0}</span></td>
        <td>
          <button class="btn btn--small" data-action="details" data-event-id="${index}">Details</button>
          <button class="btn btn--small" data-action="edit" data-event-id="${index}">Edit</button>
          <button class="btn btn--danger btn--small" data-action="archive" data-event-id="${index}" onclick="supprimerevent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });
}

function supprimerevent(index){
   let events = JSON.parse(localStorage.getItem("Evenements")) || [];
   let archives = JSON.parse(localStorage.getItem("archives")) || [];
   const parent =document.querySelectorAll(".table__row")[index];
   const suppression =events.splice(index ,1)[0];
   archives.push(suppression);

   localStorage.setItem("Evenements" ,JSON.stringify(events));
   localStorage.setItem("archives",JSON.stringify(archives));


  
  alert("Événement supprimé !");
   afficherevenements();
   afficherarchive();
   


}
document.getElementById("sort-events").addEventListener("change", (e) => {
  const value = e.target.value;
  if (value === "title-asc") Sortasc();
  if (value === "title-desc") Sortdesc();

});
function Sortasc(){
  let events = JSON.parse(localStorage.getItem("Evenements"))||[];
  const body = document.querySelectorAll(".table__body")[0];


  for(i =0 ;i<events.length -1 ;i++){
    for(j=0;j<events.length-i-1 ;j++){
      if(events[j].titre.toLowerCase() > events[j+1].titre.toLowerCase()){
        let temp =events[j];
        events[j]=events[j+1];
        events[j+1] =temp;
      }
    }
  }


  body.innerHTML = "";
  events.forEach((e, index) => {
    body.innerHTML += `
      <tr class="table__row" data-event-id="${index}">
        <td>${index + 1}</td>
        <td>${e.titre}</td>
        <td>${e.place}</td>
        <td>${e.prix}</td>
        <td><span class="badge">${e.variant ? e.variant.length : 0}</span></td>
        <td>
          <button class="btn btn--small" data-action="details">Details</button>
          <button class="btn btn--small" data-action="edit">Edit</button>
          <button class="btn btn--danger btn--small" onclick="supprimerevent(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  
}










function afficherarchive(){
  const archives =JSON.parse(localStorage.getItem("archives"))||[];
  const body =document.querySelectorAll(".table__body")[1];
  console.log(body)
   body.innerHTML = "";
  archives.forEach((a,index) => {
    body.innerHTML +=`<tr class="table__row" data-event-id="${index}">
                                    <td>${index+1}</td>
                                    <td>${a.titre}</td>
                                    <td>${a.place}</td>
                                    <td>${a.prix}</td>
                                    <td>
                                        <button class="btn btn--small" data-action="restore" data-event-id="${index}" onclick="restaurerArchive(${index})">Restore</button>
                                    </td>
                          </tr>`
  });

}



function restaurerArchive(index){
  const archives =JSON.parse(localStorage.getItem("archives"))||[];
  const events =JSON.parse(localStorage.getItem("Evenements"))||[];
  const restore =archives.splice(index,1)[0];
  events.push(restore);


  localStorage.setItem("archives",JSON.stringify(archives));
   localStorage.setItem("Evenements",JSON.stringify(events));
    afficherarchive();
  afficherevenements();
  alert("Événement restauré avec succès !");

}

