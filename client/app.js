$(document).ready(function () {
  const container = document.getElementById("chirpContainer");
  //handles get method
  const Render = () => {
    $.ajax({
      url: "/api/chirps",
      type: "GET",
      dataType: "json",
      success: function (res) {
        if (res !== undefined) {
          CreateCard(res);
        }
      },
    });
  };

  //handles delete method
  const Remove = (hidden) => {
    $.ajax({
      url: `/api/chirps/${hidden}`,
      type: "DELETE",
      success: function () {
        Render();
        $("#chirpContainer").html("");
        alert("chirp has been deleted from timeline");
        $("#editModal").modal("hide");
        $("#deleteChirp").modal("hide");
      },
    });
  };
  //handles post method
  $("#createChirp").submit((e) => {
    e.preventDefault();

    let form = $("#createChirp").serializeArray();
    let form_data = {};
    form_data.header = form[0].value;
    form_data.message = form[1].value;
    $.ajax({
      url: "/api/chirps",
      type: "POST",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(form_data),
      success: function () {
        Render();
        $("#chirpContainer").html("");
        alert("a new chrip has been added to your timeline");
      },
    });
  });

  //handles put method after update editing chirp
  $("#editModal #update").click((e) => {
    e.preventDefault();
    e.stopPropagation();

    let form = $("#changes").serializeArray();
    let form_data = {};
    form_data.header = form[0].value;
    form_data.message = form[1].value;
    let hidden = form[2].value;
    $.ajax({
      url: `/api/chirps/${hidden}`,
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(form_data),
      success: function () {
        Render();
        $("#chirpContainer").html("");
        alert("changes have been updated");
        $("#editModal").modal("hide");
      },
    });
  });

  //Each card will be created here
  const CreateCard = (chirps) => {
    for (const chirp in chirps) {
      //executes for each object that does NOT have a defined 'nextid' value
      if (chirps[chirp].header && chirps[chirp].message) {
        //card element
        let card = document.createElement("div");
        card.setAttribute("id", chirp);
        card.classList.add(
          "card",
          "text-center",
          "col-12",
          "col-md-5",
          "col-lg-3",
          "my-md-3",
          "my-5",
          "mx-lg-1",
          "shadow-lg",
          "rounded",
          "p-0"
        );

        //card header, nested within card element
        const cardHeader = document.createElement("div");
        cardHeader.classList.add(
          "card-header",
          "h5",
          "w-100",
          "px-2",
          "d-flex",
          "justify-content-center"
        );

        //header text
        let header = document.createTextNode(chirps[chirp].header);
        //nested in card header and displays header text node
        let span1 = document.createElement("span");
        span1.append(header);
        span1.classList.add("ml-auto");
        //nested in card header is a 'close' button ('x'), when you click the button a modal will launch with confiriming that you want to delete the chirp
        let close = document.createElement("button");
        close.setAttribute("aria-label", "Close");
        close.setAttribute("type", "button");
        close.setAttribute("data-target", "#deleteChirp");
        close.setAttribute("data-toggle", "modal");
        close.classList.add("close", "ml-auto");
        close.setAttribute(
          "onclick",
          `$("#deleteChirp #hidden").val('${chirp}');`
        );
        let span2 = document.createElement("span");
        let x = document.createTextNode("\u00d7");
        span2.setAttribute("aria-hidden", "true");

        span2.appendChild(x);
        close.appendChild(span2);

        //span elements are appended to the card header and the card header is appended to the card
        cardHeader.appendChild(span1);
        cardHeader.appendChild(close);
        card.appendChild(cardHeader);

        //card body, nested within card element
        let cardBody = document.createElement("div");
        cardBody.classList.add(
          "card-body",
          "font-italic",
          "text-center",
          "p-3",
          "d-flex",
          "align-items-center",
          "justify-content-center"
        );
        let span3 = document.createElement("span");
        let bodyText = document.createTextNode(chirps[chirp].message);
        span3.appendChild(bodyText);
        cardBody.appendChild(span3);
        card.appendChild(cardBody);

        //card footer, nested within card element. card footer has a button elemnt nested within it and when clicked a modal will launch
        let cardFooter = document.createElement("div");
        cardFooter.classList.add("card-footer");
        let btn = document.createElement("button");
        btn.setAttribute("data-target", "#editModal");
        btn.setAttribute("data-toggle", "modal");
        btn.setAttribute(
          "onclick",
          `$("#editModal #hidden").val('${chirp}'); $("#editModal #message").val('${chirps[chirp].message}'); $("#editModal #header").val('${chirps[chirp].header}');`
        );
        btn.classList.add("btn", "btn-primary", "w-100");
        let btnText = document.createTextNode("Edit Chirp");

        btn.appendChild(btnText);
        cardFooter.appendChild(btn);

        card.appendChild(cardFooter);

        //card element is now complete and ready to rendered to the card container and displayed on screen
        container.appendChild(card);
      }
    }
  };

  //display cards from get method when body is loaded
  $("body").ready(() => {
    Render();
  });

  //delete chirp using 'delete' button in modal
  $("#editModal #delete").click((e) => {
    e.preventDefault();
    e.stopPropagation();

    let form = $("#changes").serializeArray();
    Remove(form[2].value);
  });

  //delete chirp using 'x' button
  $("#deleteChirp #yesDel").click((e) => {
    e.preventDefault();
    e.stopPropagation();

    let form = $("#remove").serializeArray();
    Remove(form[0].value);
  });
});
