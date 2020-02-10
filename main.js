const scriptURL = 'https://script.google.com/macros/s/AKfycbwIy9oCO2eOYWz5iDYvNjp95yenvgTzHzfM59j_xQsX9dXlSqQV/exec'
const form = document.forms['submit-to-sheets']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => alert('Success!', response))
    .catch(error => console.error('Error!', error.message))
})

function init() {
  Tabletop.init( { 
    key: 'https://docs.google.com/spreadsheets/d/1nov8X6QtzfL_Z-8fs1Z7VX4VRmJb_AOXpUrakutYfWo/pubhtml',
    callback: function(data) {
      data.forEach(function (item) {
        document.querySelector(".grid-wrapper").innerHTML += `<article><h3>${item.title}</h3><div>Author: ${item.author}</div><div>Type of book: ${item.type}</div><div>Did I like it: ${item.rate}</div></article>`;
      });
      document.getElementById('count').innerHTML += ' <span>' + data.length + '</span> books read';
    },
    simpleSheet: true 
  })
 }
window.addEventListener('DOMContentLoaded', init)