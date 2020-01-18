# HAKNews
Simple application for HAK email notifications

## About
HAK - Croatian Automobile Club is the main Croatian automobile association – such as American AAA or British AA. With over 227,000 members, it is one of the largest non-profit associations in Croatia.
[HAK url](https://www.hak.hr/)

This app checks for road condition updates at [Hak - stanje na cestama](https://www.hak.hr/info/stanje-na-cestama/#prohodnost-cesta) and sends email notifications to users.

## How-to
### Run the application
App can be run directly from command line interface, using NodeJS:

    npm install
    node index.js

### Register email addresses
App exposes an API endpoint which is used for registering new email addresses. Http GET endpoint can be accessed at:

    baseurl(localhost)/mail/[user-email-address]

### Recieve emails
No additional work is needed to start recieving updates. Once an email address is registered, every HAK update gets sent. Also, webscraping for updates can be set to different interval by directly changing the code - set to **one minute** by default.
