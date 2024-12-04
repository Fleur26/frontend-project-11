import './styles.scss';
import 'bootstrap';
import { setLocale, string } from 'yup';
import { uniqueId } from 'lodash';
import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';

import ru from './locales/ru.js';
import render from './view.js';
import parse from './rssparser.js';

const timeout = 5000;

const validate = (url, links) => {
  const schema = string()
    .trim()
    .required()
    .url()
    .notOneOf(links);
  return schema.validate(url);
};

const getAxiosResponse = (url) => {
  const allOriginsLink = 'https://allorigins.hexlet.app/get';
  const preparedURL = new URL(allOriginsLink);
  preparedURL.searchParams.set('disableCache', 'true');
  preparedURL.searchParams.set('url', url);
  return axios.get(preparedURL);
};

const renderFeeds = (state, element) => {
  const listGroup = document.createElement('ul');
  listGroup.classList.add('list-group', 'border-0', 'rounded-0');

  state.content.feeds.forEach((feed) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.classList.add('list-group-item', 'border-0', 'border-end-0');

    const h3 = document.createElement('h3');
    h3.classList.add('h6', 'm-0');
    h3.textContent = feed.title;

    const p = document.createElement('p');
    p.classList.add('m-0', 'small', 'text-black-50');
    p.textContent = feed.description;

    listGroupItem.append(h3, p);
    listGroup.append(listGroupItem);
  });
  element.append(listGroup);
};

const i18nInstance = i18n.createInstance();
  i18nInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  })

function validation (url, state) {
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
    console.log("ERRROR: " + translator.t(e));
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
  parsing(state.form.data.url);
  state.form.data.links.map((link) =>{
  setTimeout(parsing(link), 5000);
  
})
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
    state.form.data.posts = arr;
    let descript = Array.from(desc);
    let l = Array.from(link);

    const feed = document.querySelector('.feeds');
    const feeds = document.createElement('div');
    feeds.innerHTML = arr[0].textContent;
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
      element.setAttribute('href', l[i].textContent);
      element.setAttribute('id', i);
      
      

      const button = document.createElement('button');
      button.setAttribute('class', 'btnRead');
      button.innerHTML = translator.t('readButton');;
      element.innerHTML = arr[i].textContent;
      parent.appendChild(p).appendChild(element);
      parent.appendChild(button);
      button.addEventListener('click',(e) =>{
       const result = confirm(descript[i].textContent);
       if(result){
          window.location.replace(l[i].textContent);
        }
      })
    }
  });
}



