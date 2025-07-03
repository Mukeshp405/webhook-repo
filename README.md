
# 🛠️ Developer Assessment Task – GitHub Webhooks + Flask UI


This project is part of a developer assessment. The goal is to demonstrate how GitHub webhooks can be used to send repository events to a backend server, store the data, and reflect changes in a minimal frontend UI.

---

## 📁 Repositories

- 🔗 [`action-repo`](https://github.com/your-username/action-repo) – GitHub repo that triggers webhook events on Push, Pull Request, and Merge.
- 🔗 [`webhook-repo`](https://github.com/your-username/webhook-repo) – Flask-based server that receives events and displays them on a UI.

---

## 📦 Tech Stack

- **Backend**: Python, Flask 
- **Frontend**: HTML + JavaScript
- **Storage**: JSON file
- **Other Tools**: Ngrok (for local webhook testing), GitHub webhooks

---

## 🧠 Features

- ✅ Receives GitHub webhook events (Push, Pull Request)
- ✅ Stores events in a local `events.json` file
- ✅ Frontend polls every 15 seconds to display latest events
- ✅ Clean and minimal UI
- 🌟 Merge events support

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Mukeshp405/webhook-repo.git
cd webhook-repo
```

### 2. Install Requirements

```bash
pip install -r requirements.txt
```

### 3. Run Flask Server

```bash
python app.py
```
Server runs on: `http://localhost:5000/`

### 4. Expose to Internet using Ngrok (for GitHub webhook)

```bash
ngrok http 5000
```
Copy the `https://xxxxx.ngrok.io` URL and open on browser.

## 🔗 Setting up Webhook on action-repo

- Go to GitHub → Settings > Webhooks > Add Webhook
- Payload URL: `https://xxxxx.ngrok.io/webhook`
- Content type: `application/json`
- Select events:
  - ✅ Push
  - ✅ Pull Request
  - ✅ Merge (optional)
- Save

### ✍️ Author
Made with 💻 by Mukesh Prajapati for the Developer Assessment Task.

> “Webhook. Watch. Wow.” 🚀
