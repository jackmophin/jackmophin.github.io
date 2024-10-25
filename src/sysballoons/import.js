function load(url) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.async = true;
    document.head.appendChild(script);
}

load('https://jackmophin.github.io/src/sysballoons/code.js');
