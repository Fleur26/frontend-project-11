import * as yup from 'yup';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';

const state = {
  form: {
    state: 'valid',
    data: {
      url: '',
      links: []
    },
    errors: [],
  },
};

function render (state) {
  const input = document.querySelector('#url-input');
  const submit = document.querySelector('.rss-form ');

  submit.disabled = state.form.state === 'valid';
  if (state.form.state === 'valid'){
    input.classList.remove('is-invalid')
    state.form.data.links.push(input.value);
    console.log(state.form.data.links);
  }
  else{
    input.classList.add('is-invalid');
    console.log(state.form.state);
  }
}

function validation (url) {
  let schema = yup.string().url('must be a url').nullable('input cannot be null')
  .validate(url)
  .then((e => {
    state.form.state = 'valid';
}))
  .catch((e => {
    state.form.state = 'invalid'
    state.form.errors = e; 
    console.log(e)
  }));
  console.log(schema);
  return schema;
}


const form = document.querySelector('.rss-form ');
  form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#url-input');
  state.form.data.url = input.value;
  validation(state.form.data.url);
  render(state);
  input.focus();
  input.value = '';
})




i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
      translation: {
        "title":  "rffsdf",
        "readButton": "Read full",
        "close": "Close",
        "mainHeader": "RSS aggregator",
        "leadText": "Keep reading RSS today! It's easy, it's beautiful.",
        "link": "RSS link",
        "add": "Add",
        "example": "Example: https://lorem-rss.hexlet.app/feed"
      }
    }
  }
}).then(function(t) {
  // initialized and ready to go!
  const d = document.getElementById('lol').innerHTML = i18next.t('mainHeader');
  console.log(d.value);
  console.log(d);

  d.innerHTML = i18next.t('mainHeader');
});