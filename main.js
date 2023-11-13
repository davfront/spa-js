import Router from "./utils/router/Router.js";

// Set the initial content of the app
document.getElementById("app").innerHTML = `
<nav>
  <a href="#" onclick="router.push('/'); return false;">Home</a>
  <a href="#" onclick="router.push('/about'); return false;">About</a>
  <a href="#" onclick="router.push('/contact'); return false;">Contact</a>
  <a href="#" onclick="router.push('/users'); return false;">Users</a>
</nav>
<br />
<div id="router-view"></div>
`;

new Router({
routes: [
    {
    name: "home",
    path: "/",
    template: `<h1>Home Page</h1>`,
    },
    {
    name: "about",
    path: "/about",
    template: `<h1>About Page</h1>`,
    },
    {
    name: "contact",
    path: "/contact",
    template: `<h1>Contact Page</h1>`,
    },
    {
    name: "user-list",
    path: "/users",
    template: `
      <h1>Users</h1>
      <p><a href="#" onclick="router.push('/users/1'); return false;">User 1</a></p>
      <p><a href="#" onclick="router.push('/users/2'); return false;">User 2</a></p>
    `,
    },
    {
    name: "user",
    path: "/users/:id",
    template: (params) => `<h1>User ${params.id}</h1>`,
    },
],
fallbackTemplate: `<h1>Oops! Page not found.</h1>`,
renderTarget: "#router-view",
}).init();
