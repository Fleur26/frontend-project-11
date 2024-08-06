import * as yup from 'yup';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18next from 'i18next';
import en from '../locales/en.json'
import ru from '../locales/ru.json'

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

const promise = i18next.init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en,
    ru
  }
})
.then(function(t) {
  // initialized and ready to go!
  document.getElementsByTagName('title')[0].innerHTML = i18next.t('title');
  document.getElementById('hAgregattor').innerHTML = i18next.t('mainHeader');
  document.getElementsByClassName('lead')[0].innerHTML = i18next.t('leadText');
  document.getElementById('btnSub').innerHTML = i18next.t('add');
  document.getElementById('holdInput').innerHTML = i18next.t('link');
  document.getElementById('holdInput').innerHTML = i18next.t('link');
  document.getElementById('exmpl').innerHTML = i18next.t('example');

})
.catch(e => {
console.log(e);
})

function render (state) {
  const input = document.querySelector('#url-input');
  const submit = document.querySelector('.rss-form ');

  submit.disabled = state.form.state === 'valid';
  if (state.form.state === 'valid'){
    input.classList.remove('is-invalid')
  }
  else{
    input.classList.add('is-invalid');
    console.log(state.form.state);
  }
}

function validation (url) {
  let schema = yup.string('string').url('url').nullable('null')
  .validate(url)
  .then((e => {
    state.form.data.links.push(url); 
    console.log(state.form.data.links);
    state.form.state = 'valid';
}))
  .catch((e => {
    state.form.state = 'invalid'
    state.form.errors = e; 
    console.log(e);
    console.log("ERRROR: " + i18next.t(e));
  }));
  console.log(schema);
  return schema;
}

const container= document.querySelector('#sm');

const form = document.querySelector('.rss-form ');
  form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.querySelector('#url-input');
  state.form.data.url = input.value;
  validation(state.form.data.url);
  render(state);
  input.focus();
  input.value = '';
  parsing(state.form.data.url)
})

function parsing (url){
const parser = new DOMParser();
fetch(`https://allorigins.hexlet.app/get?url=${encodeURIComponent(url)}`)
  .then(response => {
    if (response.ok) return response.json()
    throw new Error('Network response was not ok.')
  })
  .then(data => {
    const doc = parser.parseFromString(data.contents, "text/xml");
    
    const items = doc.getElementsByTagName('title');
    const desc = doc.getElementsByTagName('description');
    const link = doc.getElementsByTagName('link');
    const parent = document.querySelector('.posts');
    let arr = Array.from(items);
    let descript = Array.from(desc);
    let l = Array.from(link);

    const feed = document.querySelector('.feeds');
    const feeds = document.createElement('div');
    feeds.innerHTML = arr[0].innerHTML;
    const h3 = document.createElement('h3');
    h3.innerHTML = 'Feeds';
    feed.appendChild(h3);
    feed.appendChild(feeds);
    const elementt = document.createElement('ul');
    parent.appendChild(elementt);

    for (let i = 1; i < items.length; i++) {
      console.log(descript[i].innerHTML);
      const p = document.createElement('li');
      const element = document.createElement('a');
      element.setAttribute('href', l[i].innerHTML);
      element.innerHTML = arr[i].innerHTML;
      parent.appendChild(p).appendChild(element);
    }
  });
}
