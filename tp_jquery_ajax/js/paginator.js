$("document").ready(() => getUsers());

const getUsers = (page = 1) => {
  $.ajax({
    url: `https://reqres.in/api/users?page=${page}`,
    type: "GET",
    dataType: "json",
    async: false,
    success: (data) => tableSuccess(data),
    error: (e) => tableError(e),
  });
};

const tableSuccess = (res) => {
  let tableBody = document.querySelector(".table-body");
  tableBody.innerHTML = "";
  let html = "";
  let data = res.data;

  data.forEach((item) => {
    if (item.id > 10) return;

    html += `<tr class="tr">
      <td class="td" value=${item.id} id="first-table-element">${item.id}</td>
      <td class="td" value="${item.first_name}">${item.first_name}</td>
      <td class="td">${item.last_name}</td>
      <td class="td">${item.email}</td>
      <td class="td">
        <img src="../img/avatar.png" alt="user avatar" class="avatar" />
        <img src=${item.avatar} class="hover-img" />
      </td>
      <td class="td"><button class="btn-post" value="posts">posts</button></td>
    </tr>`;
  });

  html += `<tr class="tr">
    <td class="td paginator-td" colspan="6">
      <div aria-label="Page navigation example" class="paginator-container">
        <ul class="pagination">
          <li class="page-item"><a class="page-link page-previous" href="#">&lt;&lt;</a></li>
          <li class="page-item"><a class="page-link page-number" href="#" value="1">1</a></li>
          <li class="page-item"><a class="page-link page-number" href="#" value="2">2</a></li>
          <li class="page-item"><a class="page-link page-next" href="#">&gt;&gt;</a></li>
        </ul>
      </div>
    </td>
  </tr>`;
  tableBody.innerHTML += html;
  initializePaginator();
  $(".avatar").mouseenter((e) => avatarHover(e));
  $(".avatar").mouseleave((e) => avatarHoverOut(e));

  const btns = document.querySelectorAll(".btn-post");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      getPosts(
        e.target.parentElement.parentElement.firstElementChild.getAttribute(
          "value"
        ),
        e.target.parentElement.parentElement.firstElementChild.nextElementSibling.getAttribute(
          "value"
        )
      );
    });
  });
};

const tableError = (e) => {
  console.error(e);
};

const initializePaginator = () => {
  const pageNumbers = document.querySelectorAll(".page-number");
  const pagePrevious = document.querySelector(".page-previous");
  const pageNext = document.querySelector(".page-next");

  pagePrevious.addEventListener("click", () => {
    const first = document.getElementById("first-table-element");
    if (first.getAttribute("value") === 1) return;

    getUsers(1);
  });

  pageNext.addEventListener("click", () => {
    const first = document.getElementById("first-table-element");
    if (first.getAttribute("value") === 7) return;

    getUsers(2);
  });

  pageNumbers.forEach((page) => {
    page.addEventListener("click", () => {
      const numberOfPage = page.getAttribute("value");
      getUsers(numberOfPage);
    });
  });
};

/* AVATAR IMAGE EFFECT */

const avatarHover = (e) => {
  const img = e.target.nextElementSibling;
  img.style.display = "block";
};

const avatarHoverOut = (e) => {
  const img = e.target.nextElementSibling;
  img.style.display = "none";
};

/* POSTS */

const getPosts = (id = 1, name) => {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/users/${id}/posts `,
    type: "GET",
    dataType: "json",
    async: false,
    success: (data) => postsSuccess(data, name),
    error: (e) => postsError(e),
  });
};

const postsSuccess = (data, name) => {
  const title = document.querySelector(".user-post-title-name");
  title.textContent = ` ${name}`;

  const tableContainer = document.querySelector(".user-post-items-container");
  tableContainer.innerHTML = "";

  let html_body = "";
  data.forEach((item) => {
    html_body += `
    <tr class="tr">
      <td class="td" value=${item.id} id="first-table-element">${item.id}</td>
      <td class="td">${item.title}</td>
      <td class="td"></td>
      <td class="td">${item.body}</td>
      <td class="td"></td>
      <td class="td"><button class="btn-comment" value="Comentarios">Comentarios</button></td>
    </tr>
    <tr class="comment-row"></tr>`;
  });

  let html = "";
  html += `
      <table class="table">
        <thead class="table-head">
          <tr class="tr">
            <th class="th">ID</th>
            <th class="th">T&iacute;tulo</th>
            <th class="th"></th>
            <th class="th">Cuerpo del Post</th>
            <th class="th"></th>
            <th class="th">Acciones</th>
          </tr>
        </thead>
        <tbody class="table-body">
          ${html_body}
        </tbody>
      </table>`;

  tableContainer.innerHTML += html;

  const btns = document.querySelectorAll(".btn-comment");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      getComments(
        e.target.parentElement.parentElement.firstElementChild.getAttribute(
          "value"
        ),
        btn
      );
    });
  });
};

const postsError = (e) => {
  console.error(e);
};

/* COMMENTS */

const getComments = (id = 1, btn) => {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
    type: "GET",
    async: false,
    dataType: "json",
    success: (data) => commentsSuccess(data, btn),
    error: (e) => commentsError(e),
  });
};

const commentsSuccess = (data, btn) => {
  const row = btn.parentElement.parentElement.nextElementSibling;
  if (row.innerHTML !== "") return (row.innerHTML = "");

  let html_body = "";
  data.forEach((item) => {
    html_body += `
    <tr class="tr">
      <td class="td" colspan="2">${item.name}</td>
      <td class="td" colspan="2">${item.email}</td>
      <td class="td" colspan="2">${item.body}</td>
    </tr>
      `;
  });

  let html = "";
  html += `
      <td colspan="6">
        <table class="table-table">
          <thead class="table-head">
            <tr class="tr">
              <th class="th" colspan="2">Nombre</th>
              <th class="th" colspan="2">Email</th>
              <th class="th" colspan="2">Comentario</th>
            </tr>
          </thead>
          <tbody class="table-body">
            ${html_body}
          </tbody>
        </table>
      </td>`;

  row.innerHTML += html;
};

const commentsError = (e) => {
  console.error(e);
};

/* INITIAL IMAGES */

const images = document.querySelectorAll(".expand-img");
images.forEach((img) => {
  img.addEventListener("click", () => {
    let overlayContainer = document.querySelector(".overlay-container");
    overlayContainer.style.display = "flex";

    overlayContainer.firstElementChild.setAttribute(
      "src",
      img.getAttribute("src")
    );
  });
});

const overlayIcon = document.querySelector(".overlay-icon");
overlayIcon.addEventListener("click", () => {
  let overlayContainer = document.querySelector(".overlay-container");
  overlayContainer.style.display = "none";
});

/* ASIDE RESPONSIVE */

const headerIcon = (e) => {
  let aside = document.querySelector(".aside");

  if (aside.classList.contains("col-xs")) {
    aside.style.transform = "translateX(-50vw)";
    aside.classList.replace("col-xs", "col-xs-3");
  } else {
    aside.style.transform = "none";
    aside.classList.replace("col-xs-3", "col-xs");
  }
};

$(".header-nav-icon").click((e) => headerIcon(e));
