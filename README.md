# Haystack DYnamic Replication

### Clone the Source Code
```bash
git clone https://github.com/vilalali/36-Project-Team-ID-45.git
```

### Configure the Frontend
``` bash
cd 36-Project-Team-ID-45/client

npm i

npm start

```

### Configure the Backend
``` bash
cd 36-Project-Team-ID-45/server

npm i

node src/server.js

```

### redirect to the:
Link: http://localhost:3000/

Result Screen:

Directory Structure:
# Project Structure

```plaintext
36-Project-Team-45
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── README.md
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── components
│   │   │   ├── FileList.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormatBytes.jsx
│   │   │   ├── Metrics.jsx
│   │   │   └── Navbar.jsx
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── metadata.json
│   │   ├── reportWebVitals.js
│   │   ├── services
│   │   │   └── api.js
│   │   ├── setupTests.js
│   │   └── views
│   │       └── Dashboard.jsx
│   └── text.txt
├── README.md
└── server
    ├── package.json
    ├── package-lock.json
    ├── proto
    ├── replicas
    ├── src
    │   ├── app.js
    │   ├── config
    │   │   └── replicationConfig.js
    │   ├── controllers
    │   │   └── fileController.js
    │   ├── models
    │   ├── routes
    │   │   ├── configDetailsRouts.js
    │   │   ├── fileRoutes.js
    │   │   └── index.js
    │   ├── server.js
    │   ├── services
    │   │   └── storageService.js
    │   └── utils
    │       └── logger.js
    ├── text.txt
    └── uploads
        └── 1732307168695.md
