🌊 DeepSea Archives
Plateforme microservices de gestion des créatures abyssales imaginaires
<p align="center"> <img src="https://img.shields.io/badge/Node.js-18+-green?style=flat-square" /> <img src="https://img.shields.io/badge/Express.js-Microservices-blue?style=flat-square" /> <img src="https://img.shields.io/badge/Prisma-ORM-purple?style=flat-square" /> <img src="https://img.shields.io/badge/MySQL-Database-orange?style=flat-square" /> </p>
📖 Sommaire

📦 Aperçu du projet

🧊 Architecture microservices

🚀 Installation & Lancement

🔐 Auth-Service

🟩 Observation-Service

🟫 Taxonomy-Service

🔗 Communication entre services

📁 Structure du repo

📄 Licence

📦 Aperçu du projet

DeepSea Archives est une plateforme permettant aux utilisateurs de :

Créer et répertorier des espèces abyssales imaginaires

Soumettre des observations

Faire valider ces observations par des experts

Gérer la rareté, la modération, l’historique

Générer une classification scientifique automatique via un microservice externe

🔥 Le projet est entièrement basé sur une architecture microservices + REST + JWT.

🧊 Architecture Microservices
┌──────────────────┐
│   Auth-Service    │  → utilisateurs, rôles, JWT, réputation
└──────────────────┘
           ▲
           │ JWT
           ▼
┌────────────────────────┐
│  Observation-Service    │ → espèces, observations, validations, modération
└────────────────────────┘
           ▲
           │ API REST
           ▼
┌────────────────────────┐
│   Taxonomy-Service      │ → statistiques & classification
└────────────────────────┘


Chaque service possède :
✔ sa propre base de données
✔ sa propre logique métier
✔ une API REST indépendante

🚀 Installation & Lancement
1. Cloner le projet
git clone https://github.com/your-repo/deepsea-archives.git
cd deepsea-archives

2. Installer & lancer chaque microservice
Auth-Service
cd auth-service
npm install
npx prisma migrate dev
npm start

Observation-Service
cd observation-service
npm install
npx prisma migrate dev
npm start

Taxonomy-Service
cd taxonomy-service
npm install
npm start

🔐 Auth-Service
📌 Fonctionnalités principales

Authentification (register / login)

Rôles : USER, EXPERT, ADMIN

Gestion de la réputation

Promotion automatique → user devient EXPERT

📘 Endpoints
Méthode	Endpoint	Description
POST	/auth/register	Créer un user
POST	/auth/login	Connexion + JWT
GET	/auth/me	User connecté
GET	/users	(ADMIN) Tous les users
GET	/users/:id	(ADMIN) User précis
PATCH	/users/:id/role	(ADMIN) Modifier rôle
PATCH	/users/:id/reputation	(ADMIN/EXPERT) Modifier réputation
🟩 Observation-Service
📌 Fonctionnalités principales

Gestion des espèces

Création & validation d’observations

Soft delete + restauration

Historique complet

Calcul automatique du rarityScore

📘 Endpoints Species
POST   /species
GET    /species
GET    /species/:id
GET    /species/:id/observations

📘 Endpoints Observations
POST   /observations
POST   /observations/:id/validate  (EXPERT/ADMIN)
POST   /observations/:id/reject    (EXPERT/ADMIN)
DELETE /observations/:id           (ADMIN)
POST   /observations/:id/restore   (ADMIN)

📘 Historique
GET /admin/user/:id/history        (ADMIN)
GET /expert/species/:id/history    (EXPERT/ADMIN)

🟫 Taxonomy-Service

Service de lecture uniquement.
Il récupère species + observations depuis Observation-Service pour générer :

✔ statistiques globales
✔ familles générées
✔ sous-espèces
✔ branches évolutives
✔ keywords utiles

📘 Endpoint
GET /taxonomy/stats

🔗 Communication entre services

Les services se parlent via HTTP

Le Taxonomy-Service envoie le JWT reçu au backend observation

Auth-Service délivre les rôles et gère la réputation

Observation-Service stocke l’historique et applique les règles métier

Taxonomy ne stocke rien → lecture + analyse seulement

📁 Structure du Repo
/auth-service
  ├── src/
  ├── prisma/
  └── package.json

/observation-service
  ├── src/
  ├── prisma/
  └── package.json

/taxonomy-service
  ├── src/
  └── package.json