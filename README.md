# Chen's-Blog

This is a personal blog system built on React and Node.js, with MySQL as the server.

There's already an admin account in the server with username: admin, and password: 123456.

Backend URL and Database auth info should be placed in `/blog/src/utils/request.js` and `/server/db.js`

As this for for **personal use ONLY**, so the user add/drop should be executed manually by SQL queries. You can get your encryped password by `genpwd.js`.

Also please take care that the MAX SIZE of a single update is 100kb of texts without modification, the errors thrown to the management panel when editting or submitting should be viewed manually in the browser console.
