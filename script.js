
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

  const Title = document.getElementById("event-title").value;
  const image = document.getElementById("event-image").value;
  const Description = document.getElementById("event-description").value;
  const Seats = document.getElementById("event-seats").value;
  const Price = document.getElementById("event-price").value;
  const rows = document.querySelectorAll(".variant-row");
  
  const variant =[];
  const erreur = document.getElementById("form-errors");


  rows.forEach(row => {
    const row_name =row.querySelector(".variant-row__name").value;
    const row__qty =row.querySelector(".variant-row__qty").value;
    const row__value =row.querySelector(".variant-row__value").value;
    const row__type=row.querySelector(".variant-row__type").value;
    variant.push({row_name , row__qty , row__value , row__type})
  });


  
  


  const evenement ={
    Title ,
    image ,
    Description ,
    Seats ,
    Price ,
    variant

  }

  let allevent = JSON.parse(localStorage.getItem("Evenements"))||[];
  allevent.push(evenement);

  localStorage.setItem("Evenements", JSON.stringify(allevent));
  alert(" Événement ajouté avec succès !");
  formulaire.reset(); 
  document.getElementById("variants-list").innerHTML = ""; 


})