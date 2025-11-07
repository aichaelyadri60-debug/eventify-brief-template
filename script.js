
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








