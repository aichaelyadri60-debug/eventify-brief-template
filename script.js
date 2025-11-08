
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
  enfant.innerHTML =`<div class="variant-row">
                                        <input type="text" class="input variant-row__name" placeholder="Variant name (e.g., 'Early Bird')" />
                                        <input type="number" class="input variant-row__qty" placeholder="Qty" min="1" />
                                        <input type="number" class="input variant-row__value" placeholder="Value" step="0.01" />
                                        <select class="select variant-row__type">
                                            <option value="fixed">Fixed Price</option>
                                            <option value="percentage">Percentage Off</option>
                                        </select>
                                        <button type="button" class="btn btn--danger btn--small variant-row__remove">Remove</button>
                                    </div>`

    parent.appendChild(enfant);

}


