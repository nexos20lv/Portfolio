(function(){
    const available = ['en','fr','es','de','it','pt','ru','zh-CN','ar'];
    function fetchTranslations(lang){
        return fetch(`./assets/lang/${lang}.json`).then(r=>{ if(!r.ok) throw new Error('no file'); return r.json(); });
    }
    function applyTranslations(map){
        document.querySelectorAll('[data-i18n]').forEach(el=>{
            const key = el.getAttribute('data-i18n');
            const val = key.split('.').reduce((o,k)=> o && o[k], map);
            if(val !== undefined && val !== null){
                if(el.placeholder !== undefined && (el.tagName==='INPUT' || el.tagName==='TEXTAREA')){
                    el.placeholder = val;
                } else {
                    el.innerHTML = val;
                }
            }
        });
    }
    function setLang(lang){
        if(lang === 'auto'){
            lang = navigator.language || navigator.userLanguage || 'en';
        }
        // prefer exact match (e.g. zh-CN), otherwise fallback to primary subtag, otherwise en
        let chosen = 'en';
        if(available.includes(lang)) chosen = lang;
        else if(lang.indexOf('-')!==-1){
            const primary = lang.split('-')[0];
            if(available.includes(primary)) chosen = primary;
        } else if(available.includes(lang)) chosen = lang;
        fetchTranslations(chosen).then(map=>{
            applyTranslations(map);
            document.documentElement.lang = chosen;
            try{ localStorage.setItem('site-lang', chosen); }catch(e){}
            // update UI button if present
            updateLangButton(chosen);
        }).catch(()=>{
            fetchTranslations('en').then(map=>{ applyTranslations(map); document.documentElement.lang = 'en'; updateLangButton('en'); });
        });
    }

    function updateLangButton(code){
        const btn = document.getElementById('lang-btn');
        if(!btn) return;
        const menu = document.getElementById('lang-menu');
        if(menu){
            const item = menu.querySelector(`[data-lang="${code}"]`);
            if(item) btn.textContent = item.textContent.split(' ')[0];
            else btn.textContent = '🌐';
        }
    }

    // init
    document.addEventListener('DOMContentLoaded', ()=>{
        const sel = document.getElementById('language-select');
        const btn = document.getElementById('lang-btn');
        const menu = document.getElementById('lang-menu');
        let saved = null;
        try{ saved = localStorage.getItem('site-lang'); }catch(e){}

        if(sel){
            if(saved) sel.value = saved;
            sel.addEventListener('change', ()=> setLang(sel.value));
            const start = sel.value === 'auto' && saved ? saved : sel.value || (saved||'auto');
            setLang(start);
            return;
        }

        // button+menu flow
        if(btn && menu){
            // set initial label
            if(saved){
                const item = menu.querySelector(`[data-lang="${saved}"]`);
                if(item) btn.textContent = item.textContent.split(' ')[0];
            }

            btn.addEventListener('click', (e)=>{
                const expanded = btn.getAttribute('aria-expanded') === 'true';
                btn.setAttribute('aria-expanded', String(!expanded));
                menu.style.display = expanded ? 'none' : 'block';
            });

            menu.querySelectorAll('[data-lang]').forEach(li=>{
                li.addEventListener('click', ()=>{
                    const lang = li.getAttribute('data-lang');
                    setLang(lang);
                    menu.style.display = 'none';
                    btn.setAttribute('aria-expanded','false');
                });
            });

            // click outside to close
            document.addEventListener('click',(e)=>{
                if(!btn.contains(e.target) && !menu.contains(e.target)){
                    menu.style.display = 'none';
                    btn.setAttribute('aria-expanded','false');
                }
            });

            // initial pick
            const start = saved || 'auto';
            setLang(start);
        }
    });

    window.__i18n = { setLang };
})();
