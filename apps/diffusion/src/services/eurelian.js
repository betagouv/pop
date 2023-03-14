import { eurelian } from '../config';

const _EATag = (host) => {
    const script = () => {
      const script = document.createElement("script");
      script.innerHTML = EAnalytics._snippet(host);
      return script;
    };
    return { script };
};
  
const EAnalytics = {
    _snippet: (host) =>
        `(function(e,a){var i=e.length,y=5381,k='script',s=window,v=document,o=v.createElement(k);for(;i;){i-=1;y=(y*33)^e.charCodeAt(i)}y='_EA_'+(y>>>=0);(function(e,a,s,y){s[a]=s[a]||function(){(s[y]=s[y]||[]).push(arguments);s[y].eah=e;};}(e,a,s,y));i=new Date/1E7|0;o.ea=y;y=i%26;o.async=1;o.src='//'+e+'/'+String.fromCharCode(97+y,122-y,65+y)+(i%1E3)+'.js?2';s=v.getElementsByTagName(k)[0];s.parentNode.insertBefore(o,s);})('${host}','EA_push');`,

    /**
     * Insert Eulerian Analytics tag in the <head> of the current document.
     * @param host The host provided by Eulerian.
     */
    initialize: () => {
        const host = eurelian;
        const script = _EATag(host).script();
        document.head.insertBefore(script, document.head.firstElementChild);
    },

    /**
     * Call EA_collector with the given data param.
     * @param data The data to collect. Example ["path", "NOM_DE_LA_PAGE", "uid", "IDENTIFIANT_DE_L_INTERNAUTE"].
     */
    track: (data) => {
        const dataLayer = [
            'domaine', eurelian,
        ];
        window.EA_push([...dataLayer, ...data]);
    },

    pushEvent: (key, data) => {
        window.EA_push(key, data);
    }
};

export default EAnalytics;