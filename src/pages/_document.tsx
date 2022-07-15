import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='ko'>
        <Head>
          <link
            rel='stylesheet'
            href='//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css'
          />
          <link
            rel='stylesheet'
            href='https://use.fontawesome.com/releases/v5.15.4/css/all.css'
            integrity='sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm'
            crossOrigin='anonymous'
          />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='anonymous'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap'
            rel='stylesheet'
          />
          <script
            type='text/javascript'
            src='//dapi.kakao.com/v2/maps/sdk.js?appkey=33278a561e2ff3c0c117fcf4698ee381&libraries=services,clusterer'
          ></script>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.min.css' crossOrigin='anonymous'/>
          <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.3.1/swiper-bundle.css' crossOrigin='anonymous'/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
