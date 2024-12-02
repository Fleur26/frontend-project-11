import i18next from 'i18next';
import en from '../locales/en';
import ru from '../locales/ru';

const promise = i18next.init({
    lng: 'ru', // if you're using a language detector, do not define the lng option
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

  
  const renderPosts = (state, element, translate) => {
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  
    state.content.posts.forEach((post) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  
      const a = document.createElement('a');
      a.classList.add(state.uiState.visitedLinksIds.has(post.id) ? ('fw-normal', 'link-secondary') : 'fw-bold');
      a.href = post.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('data-id', post.id);
      a.textContent = post.title;
  
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.type = 'button';
      button.setAttribute('data-id', post.id);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = translate('preview');
  
      listGroupItem.append(a, button);
      listGroup.append(listGroupItem);
    });
    element.append(listGroup);
  };

  const renderPosts = (state, element, translate) => {
    const listGroup = document.createElement('ul');
    listGroup.classList.add('list-group', 'border-0', 'rounded-0');
  
    state.content.posts.forEach((post) => {
      const listGroupItem = document.createElement('li');
      listGroupItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
  
      const a = document.createElement('a');
      a.classList.add(state.uiState.visitedLinksIds.has(post.id) ? ('fw-normal', 'link-secondary') : 'fw-bold');
      a.href = post.link;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('data-id', post.id);
      a.textContent = post.title;
  
      const button = document.createElement('button');
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.type = 'button';
      button.setAttribute('data-id', post.id);
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = translate('preview');
  
      listGroupItem.append(a, button);
      listGroup.append(listGroupItem);
    });
    element.append(listGroup);
  };