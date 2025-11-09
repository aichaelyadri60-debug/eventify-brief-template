function afficherarchive(){
  const archives =JSON.parse(localStorage.getItem("archives"))||[];
  const body =document.querySelector(".table__body__archives");
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

