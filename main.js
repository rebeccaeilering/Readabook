
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
        const genderName = item.sex.toLowerCase();
        genderArray.push(genderName);
      };
      
      const authorSex = document.querySelector('.author-sex');
      const countF = genderArray.filter(sex => sex === 'female').length;
      const countM = genderArray.filter(sex => sex === 'male').length;

      function sexFemale() {
        const percentLike = Math.round(100 / data.length * countF);
        const el = document.createElement('div');
        el.setAttribute('class', 'female');
        el.innerHTML = `<span class="bar"></span><span>Female: ${countF} (${percentLike}%)</span>`;
        authorSex.appendChild(el);
        document.querySelector('.female .bar').style.width = `${percentLike}%`;

      }
      sexFemale();

      function sexMale() {
        const percentLike = Math.round(100 / data.length * countM);
        const el = document.createElement('div');
        el.setAttribute('class', 'male');
        el.innerHTML = `<span class="bar"></span><span>Male: ${countM} (${percentLike}%)</span>`;
        authorSex.appendChild(el);
        document.querySelector('.male .bar').style.width = `${percentLike}%`;

      }
      sexMale();


      let bookTypeArray = [];
      for (item of data) {
        const typeName = item.type.toLowerCase();
        bookTypeArray.push(typeName);
        console.lgo
      };

      const bookType = document.querySelector('.book-type');
      const countFiction = bookTypeArray.filter(type => type === 'fiction').length;
      const countNonFiction = bookTypeArray.filter(type => type === 'non-fiction').length;
      const countEssay = bookTypeArray.filter(type => type === 'essays').length;
   
      function typeFiction() {
        const percentFiction = Math.round(100 / data.length * countFiction);
        const el = document.createElement('div');
        el.setAttribute('class', 'fiction');
        el.innerHTML = `<span class="bar"></span><span>Fiction: ${countFiction} (${percentFiction}%)</span>`;
        bookType.appendChild(el);
        document.querySelector('.fiction .bar').style.width = `${percentFiction}%`;

      }
      typeFiction();

      function typeNonFiction() {
        const percentNonFiction = Math.round(100 / data.length * countNonFiction);
        const el = document.createElement('div');
        el.setAttribute('class', 'non-fiction');
        el.innerHTML = `<span class="bar"></span><span>Non-Fiction: ${countNonFiction} (${percentNonFiction}%)</span>`;
        bookType.appendChild(el);
        document.querySelector('.non-fiction .bar').style.width = `${percentNonFiction}%`;

      }
      typeNonFiction();

      function typeEssay() {
        const percentEssay = Math.round(100 / data.length * countEssay);
        const el = document.createElement('div');
        el.setAttribute('class', 'essay');
        el.innerHTML = `<span class="bar"></span><span>Essays: ${countEssay} (${percentEssay}%)</span>`;
        bookType.appendChild(el);
        document.querySelector('.essay .bar').style.width = `${percentEssay}%`;

      }
      typeEssay();

      const rates = document.querySelectorAll('.rate');

      rates.forEach(function(rate, i) {
        if (rate.innerText === 'yes') {
          rate.closest('article').classList.add('thumbup');
        } else if (rate.innerText === 'no') {
          rate.closest('article').classList.add('thumbdown');
        } 
      });

      let ratingArray = [];
      for (item of data) {
        const rateName = item.rate;
        ratingArray.push(rateName);
      };

      const bookRating = document.querySelector('.book-rating');
      const countLike = ratingArray.filter(rate => rate === 'yes').length;
      const countDislike = ratingArray.filter(rate => rate === 'no').length;

      function likedBook() {
        const percentLike = Math.round(100 / data.length * countLike);
        const el = document.createElement('div');
        el.setAttribute('class', 'like');
        el.innerHTML = `<span class="bar"></span><span>Like: ${countLike} (${percentLike}%)</span>`;
        bookRating.appendChild(el);
        document.querySelector('.like .bar').style.width = `${percentLike}%`;
      }
      likedBook();

      function dislikedBook() {
        const percentDisLike = Math.round(100 / data.length * countDislike);
        const el = document.createElement('div');
        el.setAttribute('class', 'dislike');
        el.innerHTML = `<span class="bar"></span><span>Dislike: ${countDislike} (${percentDisLike}%)</span>`;
        bookRating.appendChild(el);
        document.querySelector('.dislike .bar').style.width = `${percentDisLike}%`;
      }
      dislikedBook()

    




    },
    simpleSheet: true 
  })
 }

window.addEventListener('DOMContentLoaded', init);

// Get the modal
const modal = document.getElementById("statsModal");

// Get the button that opens the modal
const btn = document.getElementById("openStats");

// Get the <span> element that closes the modal
const close = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}