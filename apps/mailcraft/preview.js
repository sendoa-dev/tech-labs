// const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')

// const chokidar = require('chokidar')
const express = require('express')
const nodemailer = require('nodemailer')
const WebSocket = require('ws')

const app = express()
const port = 3000

// app.use('/public', express.static(path.join(__dirname, 'dist', 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const wss = new WebSocket.Server({ noServer: true })

app.server = app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`)
})

app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request)
  })
})

wss.on('connection', (ws) => {
  console.info('Client connected')
  ws.on('close', () => {
    console.info('Client disconnected')
  })
})

let previewsHtml = ''

const generatePreviewsHtml = () => {
  const basePath = path.join(__dirname, 'dist')
  previewsHtml = generateFileTree(basePath)
}

generatePreviewsHtml()

app.post('/send-email', (req, res) => {
  const { fromUser, fromPassword, toUser, subjectPath, emailPath } = req.body
  const subject = fs.readFileSync(subjectPath, 'utf8').trim()
  const html = fs.readFileSync(emailPath, 'utf8')

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: fromUser, pass: fromPassword },
  })

  const mailOptions = { from: fromUser, to: toUser, subject, html }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString())
    }
    res.status(200).send('Email sent: ' + info.response)
  })
})

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Previews</title>
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      <style>
        body {
          background-color: #f8f9fa;
          padding: 20px;
        }
        .container {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 16px;
        }
        h2 {
          color: #007bff;
          margin-bottom: 20px;
        }
        iframe {
          width: 100%;
          height: 600px;
          border: 0;
          margin-bottom: 20px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 20px;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
        .chevron {
          font-size: 16px;
        }
        .collapse {
          display: none;
        }
        .collapse.show {
          display: block;
        }
        .preview-group {
          margin-bottom: 40px;
        }
        .credentials-display {
          margin-bottom: 20px;
        }
        .form-inline .form-group {
          margin-right: 15px;
        }
        .form-inline .form-group label {
          display: none;
        }
        .form-control {
          padding: 10px 15px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          outline: none;
        }
        .form-control:focus {
          border-color: #66afe9;
          box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
        }
        .btn-primary {
          padding: 10px 15px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .btn-primary:hover {
          background-color: #0056b3;
        }
        .btn-red-500 {
          padding: 10px 15px;
          font-size: 16px;
          color: #fff;
          background-color: #dc3545;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: background-color 0.3s;
        }
        .btn-red-500:hover {
          background-color: #c82333;
        }
        .logout-btn {
          display: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Email Credentials</h2>
        <div id="credentials" class="form-inline mb-4"></div>
        <form id="loginForm" class="form-inline mb-4">
          <div class="form-group mr-3">
            <label for="fromUser" class="sr-only">From Email:</label>
            <input type="email" class="form-control" id="fromUser" name="fromUser" placeholder="From Email" required>
          </div>
          <div class="form-group mr-3">
            <label for="fromPassword" class="sr-only">Password:</label>
            <input type="password" class="form-control" id="fromPassword" name="fromPassword" placeholder="Password" required>
          </div>
          <div class="form-group mr-3">
            <label for="toUser" class="sr-only">To Email:</label>
            <input type="email" class="form-control" id="toUser" name="toUser" placeholder="To Email" required>
          </div>
          <button type="submit" class="btn btn-primary">Save Credentials</button>
        </form>
        <button id="logoutButton" class="btn btn-red-500 logout-btn mb-4">Logout</button>
      </div>

      <div class="container">
        <h2>Email Previews</h2>

        ${previewsHtml}
      </div>

      <script>
        const ws = new WebSocket('ws://' + window.location.host);
        ws.onmessage = function(event) {
          if (event.data === 'reload') {
            window.location.reload();
          }
        };

        document.getElementById('loginForm').addEventListener('submit', function(event) {
          event.preventDefault();
          const fromUser = document.getElementById('fromUser').value;
          const fromPassword = document.getElementById('fromPassword').value;
          const toUser = document.getElementById('toUser').value;

          sessionStorage.setItem('from-user', fromUser);
          sessionStorage.setItem('from-password', fromPassword);
          sessionStorage.setItem('to-user', toUser);

          console.info('Credentials saved');
          updateCredentialsDisplay();
        });

        document.getElementById('logoutButton').addEventListener('click', function() {
          sessionStorage.removeItem('from-user');
          sessionStorage.removeItem('from-password');
          sessionStorage.removeItem('to-user');
          console.info('Credentials cleared');
          updateCredentialsDisplay();
        });

        function updateCredentialsDisplay() {
          const fromUser = sessionStorage.getItem('from-user');
          const fromPassword = sessionStorage.getItem('from-password');
          const toUser = sessionStorage.getItem('to-user');

          if (fromUser && fromPassword && toUser) {
            document.getElementById('credentials').innerHTML = \`
              <div class="form-group mr-3"><label>From:</label><span class="ml-2">\${fromUser}</span></div>
              <div class="form-group mr-3"><label>Password:</label><span class="ml-2">****</span></div>
              <div class="form-group mr-3"><label>To:</label><span class="ml-2">\${toUser}</span></div>
            \`;
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('logoutButton').style.display = 'block';
          } else {
            document.getElementById('credentials').innerHTML = '';
            document.getElementById('loginForm').style.display = 'flex';
            document.getElementById('logoutButton').style.display = 'none';
          }
        }

        function sendEmail(subjectPath, emailPath) {
          const fromUser = sessionStorage.getItem('from-user');
          const fromPassword = sessionStorage.getItem('from-password');
          const toUser = sessionStorage.getItem('to-user');

          fetch('/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fromUser, fromPassword, toUser, subjectPath, emailPath })
          })
          .then(response => response.text())
          .then(result => console.info(result))
          .catch(error => console.info('Error: ' + error));
        }

        function toggleCollapse (id) {
          const element = document.getElementById(id)
          const chevron = document.getElementById(id + '-chevron')
          if (element.classList.contains('show')) {
            element.classList.remove('show')
            chevron.innerHTML = '&#x25BC;' // Right pointing chevron
          } else {
            element.classList.add('show')
            chevron.innerHTML = '&#x25B2;' // Down pointing chevron
          }
        }

        updateCredentialsDisplay();
      </script>
    </body>
    </html>
  `)
})

function generateFileTree (basePath, relativePath = '') {
  const fullPath = path.join(basePath, relativePath)
  const items = fs.readdirSync(fullPath)
  let fileTree = '<div class="list-group">'

  const groupedFiles = {}

  items.forEach(item => {
    const itemRelativePath = path.join(relativePath, item)
    const itemPath = path.join(fullPath, item)
    const isDirectory = fs.statSync(itemPath).isDirectory()

    if (isDirectory) {
      const directoryId = `dir-${itemRelativePath.replace(/[\\/]/g, '-')}`
      fileTree += `
        <div class="list-group-item">
          <strong>${item}</strong>
          <button class="btn btn-link" onclick="toggleCollapse('${directoryId}')">
            <span id="${directoryId}-chevron" class="chevron">&#x25BC;</span>
          </button>
          <div id="${directoryId}" class="collapse">
            ${generateFileTree(basePath, itemRelativePath)}
          </div>
        </div>`
    } else {
      const match = item.match(/^(.*?)\.(en|es)\.(html|txt)$/)
      if (match) {
        const lang = match[2]
        const type = match[3]

        if (!groupedFiles[lang]) {
          groupedFiles[lang] = { content: {}, subject: {} }
        }

        if (type === 'html') {
          groupedFiles[lang].content = itemPath
        } else if (type === 'txt') {
          groupedFiles[lang].subject = itemPath
        }
      }
    }
  })

  Object.keys(groupedFiles).forEach(lang => {
    const group = groupedFiles[lang]
    fileTree += '<div class="list-group-item preview-group">'
    if (group.subject) {
      const subjectContent = fs.readFileSync(group.subject, 'utf8')
      fileTree += `
        <div class="card mb-3">
          <div class="card-header">
            <h5 class="card-title">${escapeHtml(subjectContent)}</h5>
          </div>
          <div class="card-body">
      `
    }
    if (group.content) {
      const emailContent = fs.readFileSync(group.content, 'utf8')
      fileTree += `
            <iframe id="${group.content}" class="mb-3" srcdoc="${escapeHtml(emailContent)}"></iframe>
            <button class="btn btn-primary" onclick="sendEmail('${group.subject}', '${group.content}')">Send this email</button>
          </div>
        </div>
      `
    }
    fileTree += '</div>'
  })

  fileTree += '</div>'
  return fileTree
}

function escapeHtml (unsafe) {
  return unsafe.replace(/[&<"']/g, function (m) {
    switch (m) {
      case '&':
        return '&amp;'
      case '<':
        return '&lt;'
      case '>':
        return '&gt;'
      case '"':
        return '&quot;'
      default:
        return '&#039;'
    }
  })
}

// chokidar.watch(path.join(__dirname, 'src')).on('all', (event, path) => {
//   exec('npm run build', (err, stdout, stderr) => {
//     if (err) {
//       console.error(`Error executing build: ${stderr}`)
//       return
//     }

//     generatePreviewsHtml()

//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send('reload')
//       }
//     })
//   })
// })
