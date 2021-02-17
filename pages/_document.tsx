import Document, { Html, Head, Main, NextScript, DocumentContext } from "next/document";
import { ServerStyleSheet } from "styled-components";
import { config } from "@/util/config";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const loadVWO = `
      window._vwo_code = window._vwo_code || (function(){
      var account_id=428746,
      settings_tolerance=2000,
      library_tolerance=2500,
      use_existing_jquery=false,
      is_spa=1,
      hide_element='body',

      /* DO NOT EDIT BELOW THIS LINE */
      f=false,d=document,code={use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.defer=true;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){
      window.settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b=hide_element?hide_element+'{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());return settings_timer; }};window._vwo_settings_timer = code.init(); return code; }());
    `;

    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: loadVWO }} defer />
          <script
            defer
            dangerouslySetInnerHTML={{
              __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.defer=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${config.gtmId}');
                `,
            }}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            (function(){if(window.BOOMR&&(window.BOOMR.version||window.BOOMR.snippetExecuted)){return}window.BOOMR=window.BOOMR||{};window.BOOMR.snippetStart=(new Date).getTime();window.BOOMR.snippetExecuted=true;window.BOOMR.snippetVersion=14;window.BOOMR.url="//c.go-mpulse.net/boomerang/FKWH3-LQ6P9-8MAVB-JQPCQ-HTNYE";var e=document.currentScript||document.getElementsByTagName("script")[0],a=e.parentNode,s=false,t=3e3;function n(){if(s){return}var e=document.createElement("script");e.id="boomr-scr-as";e.src=window.BOOMR.url;e.async=true;a.appendChild(e);s=true}function o(e){s=true;var t,o=document,n,i,d,r=window;window.BOOMR.snippetMethod=e?"if":"i";n=function(e,t){var n=o.createElement("script");n.id=t||"boomr-if-as";n.src=window.BOOMR.url;BOOMR_lstart=(new Date).getTime();e=e||o.body;e.appendChild(n)};if(!window.addEventListener&&window.attachEvent&&navigator.userAgent.match(/MSIE [67]\./)){window.BOOMR.snippetMethod="s";n(a,"boomr-async");return}i=document.createElement("IFRAME");i.src="about:blank";i.title="";i.role="presentation";i.loading="eager";d=(i.frameElement||i).style;d.width=0;d.height=0;d.border=0;d.display="none";a.appendChild(i);try{r=i.contentWindow;o=r.document.open()}catch(e){t=document.domain;i.src="javascript:var d=document.open();d.domain='"+t+"';void 0;";r=i.contentWindow;o=r.document.open()}if(t){o._boomrl=function(){this.domain=t;n()};o.write("<bo"+"dy onload='document._boomrl();'>")}else{r._boomrl=function(){n()};if(r.addEventListener){r.addEventListener("load",r._boomrl,false)}else if(r.attachEvent){r.attachEvent("onload",r._boomrl)}}o.close()}var i=document.createElement("link");if(i.relList&&typeof i.relList.supports==="function"&&i.relList.supports("preload")&&"as"in i){window.BOOMR.snippetMethod="p";i.href=window.BOOMR.url;i.rel="preload";i.as="script";i.addEventListener("load",n);i.addEventListener("error",function(){o(true)});setTimeout(function(){if(!s){o(true)}},t);BOOMR_lstart=(new Date).getTime();a.appendChild(i)}else{o(false)}function d(e){window.BOOMR_onload=e&&e.timeStamp||(new Date).getTime()}if(window.addEventListener){window.addEventListener("load",d,false)}else if(window.attachEvent){window.attachEvent("onload",d)}})();
            `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            defer
            type="text/javascript"
            aw-page-data=""
            dangerouslySetInnerHTML={{
              __html: `
                var model = {
                  trackingConfig: { 
                    applicationId: ${config.UTSConfig.applicationId}, 
                    trackingApi: "${config.UTSConfig.trackingApi}", 
                    utsUrl: "${config.UTSConfig.utsUrl}"
                  },
                };
              `,
            }}
          ></script>
          <script src="/scripts/uts-service-uri-storage.js" defer></script>
        </body>
      </Html>
    );
  }
}
