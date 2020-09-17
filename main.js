
const scriptURL = 'https://script.google.com/macros/s/AKfycbwIy9oCO2eOYWz5iDYvNjp95yenvgTzHzfM59j_xQsX9dXlSqQV/exec'
const form = document.forms['submit-to-sheets']

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form)
      })
      .then(response => alert('Success!', response))
      .catch(error => console.error('Error!', error.message))
  });
};

function init() {
  Tabletop.init( { 
    key: 'https://docs.google.com/spreadsheets/d/1nov8X6QtzfL_Z-8fs1Z7VX4VRmJb_AOXpUrakutYfWo/pubhtml',
    callback: function(data) {
      data.forEach(function (item) {
        document.querySelector(".grid-wrapper").innerHTML += `<article><h3>${item.title}</h3><div>Author: ${item.author}</div><div>Type of book: <span class="type">${item.type}</span></div><div>Genre: ${item.genre}</div><div>Did I like it: <span class="rate">${item.rate}</span></div></article>`;
      });
      document.getElementById('count').innerHTML += ' <span>' + data.length + '</span> books read';

      let genderArray = [];
      for (item of data) {
        const genderName = item.sex;
        genderArray.push(genderName);
      };
      
      const authorSex = document.querySelector('.author-sex');
      const countF = genderArray.filter(sex => sex === 'female').length;
      const countM = genderArray.filter(sex => sex === 'male').length;

      function sexFemale() {
        const el = document.createElement('div');
        el.setAttribute('class', 'female');
        el.textContent = `Female: ${countF}`;
        authorSex.appendChild(el);
      }
      sexFemale();

      function sexMale() {
        const el = document.createElement('div');
        el.setAttribute('class', 'male');
        el.textContent = `Male: ${countM}`;
        authorSex.appendChild(el);
      }
      sexMale();





      const rates = document.querySelectorAll('.rate');

      rates.forEach(function(rate, i) {
        if (rate.innerText === 'yes') {
          rate.closest('article').classList.add('thumbup');
        } else if (rate.innerText === 'no') {
          rate.closest('article').classList.add('thumbdown');
        } else if (rate.innerText === 'meh') {
          rate.closest('article').classList.add('meh');
        }
      });

      const types = document.querySelectorAll('.type');
      
      types.forEach(function(type, i) {
        if (type.innerText === 'fiction') {
          type.closest('article').classList.add('type-fiction');
        } else if (type.innerText === 'non-fiction') {
          type.closest('article').classList.add('type-non-fiction');
        } else if(type.innerText === 'essays') {
          type.closest('article').classList.add('type-essay');
        }
      });

      const bookType = document.querySelector('.book-type');

      function typeFiction() {
        const fiction = document.querySelectorAll('.type-fiction');    
        const el = document.createElement('div');
        el.setAttribute('class', 'fiction');
        el.textContent = `Fiction: ${fiction.length}`;
        bookType.appendChild(el);
      }
      typeFiction();

      function typeNonFiction() {
        const nonFiction = document.querySelectorAll('.type-non-fiction');    
        const el = document.createElement('div');
        el.setAttribute('class', 'non-fiction');
        el.textContent = `Non-Fiction: ${nonFiction.length}`;
        bookType.appendChild(el);
      }
      typeNonFiction();

      function typeEssay() {
        const essay = document.querySelectorAll('.type-essay');    
        const el = document.createElement('div');
        el.setAttribute('class', 'essay');
        el.textContent = `Essay: ${essay.length}`;
        bookType.appendChild(el);
      }
      typeEssay();

      const bookRating = document.querySelector('.book-rating');

      function likedBook() {
        const thumbUp = document.querySelectorAll('.thumbup');    
        const el = document.createElement('div');
        el.setAttribute('class', 'like');
        el.textContent = `Like: ${thumbUp.length}`;
        bookRating.appendChild(el);
      }
      likedBook();

      function dislikedBook() {
        const thumbDown = document.querySelectorAll('.thumbdown');   
        const el = document.createElement('div');
        el.setAttribute('class', 'dislike');
        el.textContent = `Dislike: ${thumbDown.length}`;
        bookRating.appendChild(el);
      }
      dislikedBook()
    },
    simpleSheet: true 
  })
 }

window.addEventListener('DOMContentLoaded', init);
