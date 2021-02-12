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
      f=false,d=document,code={use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){
      window.settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b=hide_element?hide_element+'{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}':'',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());return settings_timer; }};window._vwo_settings_timer = code.init(); return code; }());
    `;

    const gtmIframeSrc = `https://www.googletagmanager.com/ns.html?id={config.gtmId}`;
    return (
      <Html lang="en">
        <Head>
          <script dangerouslySetInnerHTML={{ __html: loadVWO }} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer', '${config.gtmId}');
                `,
            }}
          ></script>
        </Head>
        <body>
          <noscript>
            <iframe src={gtmIframeSrc} height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe>
          </noscript>
          <Main />
          <NextScript />
          <script
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
          <script src="/scripts/uts-service-uri-storage.js" async></script>
        </body>
      </Html>
    );
  }
}
