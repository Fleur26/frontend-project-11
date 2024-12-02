import i18next from 'i18next';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

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

