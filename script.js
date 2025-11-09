function afficherarchive(){
  const archives =JSON.parse(localStorage.getItem("archives"))||[];
  const body =document.querySelector(".table__body")[1];
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

