import {validateLoginForms} from './js/form-validation';

validateLoginForms();

// Register Main ServiceWorker
if(navigator.serviceWorker) {
    console.log('Browser is compatible with Service Workers');
    window.addEventListener('load', async () => {
        try {
            const registration = await navigator.serviceWorker.register('./js/main-service-worker.js');
            console.log('Main ServiceWorker has been registered');
        }
        catch(err) { console.error(err); }
    })
}
else
    console.log('Browser is incompatible with Service Workers');