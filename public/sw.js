if (!self.define) {
  const e = e => {
      'require' !== e && (e += '.js');
      let s = Promise.resolve();
      return (
        c[e] ||
          (s = new Promise(async s => {
            if ('document' in self) {
              const c = document.createElement('script');
              (c.src = e), document.head.appendChild(c), (c.onload = s);
            } else importScripts(e), s();
          })),
        s.then(() => {
          if (!c[e]) throw new Error(`Module ${e} didn’t register its module`);
          return c[e];
        })
      );
    },
    s = (s, c) => {
      Promise.all(s.map(e)).then(e => c(1 === e.length ? e[0] : e));
    },
    c = { require: Promise.resolve(s) };
  self.define = (s, n, a) => {
    c[s] ||
      (c[s] = Promise.resolve().then(() => {
        let c = {};
        const i = { uri: location.origin + s.slice(1) };
        return Promise.all(
          n.map(s => {
            switch (s) {
              case 'exports':
                return c;
              case 'module':
                return i;
              default:
                return e(s);
            }
          }),
        ).then(e => {
          const s = a(...e);
          return c.default || (c.default = s), c;
        });
      }));
  };
}
define('./sw.js', ['./workbox-1ca495a9'], function(e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/10082c35b60c92c67aafeca24983f7aa333130c9.9d979d2a3b24295dde4c.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/3ea71dfcf056eabc96c847e98bb7f33e22a394f0.5af936bd885603860ac2.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/930f67921a2a26a9b21a25ac85b40f98f5f1f871.aff6bb090563ba8203aa.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/a72aa899d6cbc9a6a913ee38e67dc35c620ef2c1.347352de6da8852592b0.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/af28e2fc7272a14e3080c67ff230bb8d53901f5e.6c15a2eb798aea03adcd.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/b0351f65344f19ef5560717c17dadeaf81dc3e38.ca97217c14ef22a8ec7c.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/b7f2f365211a8c7121067320b51b7c040a1e7158.457254ce1c532321728c.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        { url: '/_next/static/chunks/commons.42b2244646281bff1030.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/chunks/framework.e11a39d82107473709eb.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/chunks/main-820a84b767cb255d3bb4.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/chunks/pages/_app-72971728fa07a509c3d7.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/chunks/pages/_error-312391484139e0b429ea.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        {
          url: '/_next/static/chunks/pages/_error/ErrorPage-8806f778f6a647c48f2f.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/pages/activity-918312b86bb4af1ba6f9.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/pages/activity/Activity-6fae6ef776ac674c26cb.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/pages/formExamples-4060157706c08af37e7b.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/pages/formExamples/FormExamples-db15a0a4c070792f08cc.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        { url: '/_next/static/chunks/pages/index-c212c8328fabd59b29b6.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/chunks/pages/logIn-4e2abed483d1ef5786fe.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        {
          url: '/_next/static/chunks/pages/logIn/logIn-0218e0e828b00039d084.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        { url: '/_next/static/chunks/pages/profile-2377fbe2ee802a063117.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        {
          url: '/_next/static/chunks/pages/profile/Profile-34aad98590158b8db60a.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/pages/staticPage-184cfe01c9f1e362ccde.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        {
          url: '/_next/static/chunks/pages/staticPage/StaticPage-d5dbe72a0d58017677ed.module.js',
          revision: 'jWcjMng_68mmJr8pXz3OK',
        },
        { url: '/_next/static/chunks/polyfills-08c52e9b0920dbad6282.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/chunks/webpack-4f62264144580cc42db7.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/css/5477e6560a51a6ade2cd.css', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/jWcjMng_68mmJr8pXz3OK/_buildManifest.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/_next/static/jWcjMng_68mmJr8pXz3OK/_ssgManifest.module.js', revision: 'jWcjMng_68mmJr8pXz3OK' },
        { url: '/fonts/Montserrat-Regular.ttf', revision: 'ee6539921d713482b8ccd4d0d23961bb' },
        { url: '/images/avatar-placeholder.png', revision: '3befb746081132f1ad20cb7da0f3299e' },
        { url: '/images/icons/favicon.ico', revision: '9fecc5fc1ee880313e4b5aee530aac21' },
        { url: '/images/icons/icon-150x150.png', revision: 'f1d16fa0c714ab475a7d88ad9fd945a0' },
        { url: '/images/icons/icon-16x16.png', revision: '49a0f876a8cc410d8520829fe532d8a0' },
        { url: '/images/icons/icon-180x180.png', revision: '606120a11cfb356f7ffc56196e139480' },
        { url: '/images/icons/icon-192x192.png', revision: '6bdb0bd20897e92cd86e48ec83d48935' },
        { url: '/images/icons/icon-310x150.png', revision: '6566a256a2ef61fe6dc8ffa5bcb51dfd' },
        { url: '/images/icons/icon-310x310.png', revision: '917275887188e1adf73fd31123bc4840' },
        { url: '/images/icons/icon-32x32.png', revision: 'da043bfe3b4e821dbcabde699d22a14f' },
        { url: '/images/icons/icon-512x512.png', revision: '929a2c2d7d9d622ac24b7f4370a742af' },
        { url: '/images/icons/icon-70x70.png', revision: 'df925b1e92ce32b25058ffa0f0b74bdb' },
        { url: '/images/icons/left-pointer.svg', revision: '6a5804675dfb248cf660a2eed7171df8' },
        { url: '/images/icons/right-pointer.svg', revision: '31d977f43d527f395314d1cbc9714542' },
        { url: '/images/logo.svg', revision: '3c3bdb277f3cf778fecb4551614523a3' },
        { url: '/manifest.json', revision: 'e515a4a35e8c8f4d9d83a96ed66252fd' },
        { url: '/styles/bestPractiseForStyledComponents.md', revision: 'cf47efae0036e049872b97ce2bf1dc85' },
        { url: '/styles/custom.css', revision: '549e4bafc5231568d11dd3376124f869' },
        { url: '/styles/globalStyles.js', revision: '32171d2accfea0dbf472fdcc8a885241' },
        { url: '/styles/theme.js', revision: 'ad69a82bc2cdabe5bfab1604a2a44a78' },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [new e.ExpirationPlugin({ maxEntries: 1, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/api\/.*$/i,
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /.*/i,
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400, purgeOnQuotaError: !0 })],
      }),
      'GET',
    );
});
