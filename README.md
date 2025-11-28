# 🚀 Angular API Explorer – Mini Postman

Un mini outil façon **Postman**, développé en **Angular**, permettant de tester rapidement des API REST (GET, POST, PUT, DELETE).
Idéal pour les développeurs qui veulent un testeur simple, léger et rapide directement dans un navigateur.

---

## ✨ Fonctionnalités

* 🔗 **Saisir une URL**
* 🧭 **Choisir la méthode HTTP :** GET, POST, PUT, DELETE
* 📤 **Envoyer une requête** avec ou sans body (JSON)
* 📥 **Voir la réponse formatée** (JSON)
* 🕓 **Historique des requêtes**
* 💾 (Optionnel) Sauvegarde de l’historique dans `localStorage`
* 🖥 UI moderne avec **Angular Material**

---

## 🛠️ Technologies utilisées

* **Angular** 20+
* **TypeScript**
* **Angular Material**
* **HttpClientModule**

---

## 📦 Installation & Lancement

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/NARIHY/ApiExplorer.git
cd ApiExplorer
```

### 2️⃣ Installer les dépendances

```bash
npm install
```

### 3️⃣ Lancer l'application

```bash
ng serve
```

L’application sera disponible sur :

➡️ [http://localhost:4200/](http://localhost:4200/)

---

## 📁 Structure du projet

```
src/
 └── app/
      ├── api-explorer/
      │     ├── api-explorer.ts
      │     ├── api-explorer.html
      │     ├── api-explorer.scss
      ├── services/
      │     └── api.service.ts
      └── app.module.ts
```

---

## 🧩 Aperçu du fonctionnement

Le composant principal permet :

### 🔧 1. Sélection de la méthode HTTP

`GET / POST / PUT / DELETE`

### ✍️ 2. Saisie de l’URL

Exemple :
`https://jsonplaceholder.typicode.com/posts/1`

### 📝 3. Body JSON (pour POST / PUT)

Exemple :

```json
{
  "title": "Hello world",
  "body": "Message de test",
  "userId": 1
}
```

### ✔ 4. Affichage formaté de la réponse

Affichage automatique grâce au `json` pipe Angular.

### 🧠 5. Historique des requêtes

Stocké côté client, rafraîchi automatiquement.

---

## 📸 Capture d’écran (à ajouter)

Tu peux ajouter une capture une fois l'app terminée :

```
![API Explorer Screenshot](./screenshot.png)
```


## 👨‍💻 Auteur

**Mahenina RANDRIANARISOA / NARIHY**
⭐ N’hésite pas à laisser une étoile au repo si tu trouves l’outil utile !

---

## 📄 Licence

Ce projet est sous licence MIT.

