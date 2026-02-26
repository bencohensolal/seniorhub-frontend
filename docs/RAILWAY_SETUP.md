# Guide de Configuration Railway - Variables d'Environnement

## Option 1 : Via l'Interface Web Railway (Plus Simple)

1. **Accédez à votre projet Railway** :
   - Allez sur [railway.app](https://railway.app)
   - Connectez-vous à votre compte
   - Sélectionnez votre projet `seniorhub-frontend`

2. **Ajoutez les variables** :
   - Dans le projet, sélectionnez votre service frontend
   - Cliquez sur l'onglet **"Variables"**
   - Cliquez sur **"New Variable"** ou **"Raw Editor"**

3. **Copiez-collez ces variables** :

```env
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
VITE_GOOGLE_REDIRECT_URI=https://your-railway-domain.railway.app/auth-callback.html
VITE_API_URL=https://your-backend-railway-domain.railway.app
VITE_API_VERSION=v1
VITE_APP_ENV=production
```

4. **Remplacez les valeurs** :
   - `YOUR_GOOGLE_CLIENT_ID_HERE` : Votre Google OAuth Client ID (voir ci-dessous)
   - `your-railway-domain.railway.app` : Le domaine de votre frontend Railway
   - `your-backend-railway-domain.railway.app` : Le domaine de votre backend Railway

5. **Déployez** :
   - Cliquez sur **"Add"** ou **"Save"**
   - Railway va automatiquement redéployer avec les nouvelles variables

---

## Option 2 : Via Railway CLI (Après Login)

Si vous voulez utiliser le CLI, vous devez d'abord vous connecter :

1. **Connectez-vous à Railway** :
   ```bash
   railway login --browserless
   ```
   Suivez le lien affiché et entrez le code de pairing : `black-hospitable-creation`

2. **Liez le projet** :
   ```bash
   cd /Users/benjamincohensolal/workspaces/seniorhub/frontend/seniorhub-frontend
   railway link
   ```

3. **Ajoutez les variables une par une** :
   ```bash
   # Variable 1
   railway variables set VITE_GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID_HERE"
   
   # Variable 2
   railway variables set VITE_GOOGLE_REDIRECT_URI="https://your-railway-domain.railway.app/auth-callback.html"
   
   # Variable 3
   railway variables set VITE_API_URL="https://your-backend-railway-domain.railway.app"
   
   # Variable 4
   railway variables set VITE_API_VERSION="v1"
   
   # Variable 5
   railway variables set VITE_APP_ENV="production"
   ```

---

## Comment Obtenir le Google Client ID

1. **Accédez à Google Cloud Console** :
   - Allez sur https://console.cloud.google.com/

2. **Créez ou sélectionnez un projet** :
   - Créez un nouveau projet "SeniorHub" ou sélectionnez un existant

3. **Activez l'API Google+** :
   - Dans le menu, allez à "APIs & Services" > "Library"
   - Cherchez "Google+ API"
   - Cliquez sur "Enable"

4. **Créez des identifiants OAuth** :
   - Allez à "APIs & Services" > "Credentials"
   - Cliquez sur "Create Credentials" > "OAuth client ID"
   - Type d'application : **Web application**
   - Nom : `SeniorHub Frontend`

5. **Configurez les URIs autorisées** :
   
   **JavaScript origins autorisées** :
   ```
   https://your-railway-domain.railway.app
   ```
   
   **URIs de redirection autorisées** :
   ```
   https://your-railway-domain.railway.app/auth-callback.html
   ```

6. **Copiez le Client ID** :
   - Une fois créé, copiez le "Client ID" (commence par un nombre suivi de .apps.googleusercontent.com)
   - **NE copiez PAS** le Client Secret (non nécessaire pour le frontend)

---

## Exemple de Configuration Complète

Voici un exemple avec des valeurs fictives :

```env
VITE_GOOGLE_CLIENT_ID=123456789-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com
VITE_GOOGLE_REDIRECT_URI=https://seniorhub-frontend-production.up.railway.app/auth-callback.html
VITE_API_URL=https://seniorhub-backend-production.up.railway.app
VITE_API_VERSION=v1
VITE_APP_ENV=production
```

---

## Vérification

Une fois les variables configurées :

1. **Vérifiez le déploiement** :
   - Allez dans l'onglet "Deployments" de Railway
   - Attendez que le déploiement soit terminé (status "Success")

2. **Testez l'authentification** :
   - Ouvrez votre frontend : `https://your-railway-domain.railway.app`
   - Cliquez sur "Sign In with Google"
   - Vérifiez que la popup Google OAuth s'ouvre correctement
   - Connectez-vous et vérifiez que vous êtes redirigé vers l'application

3. **En cas d'erreur** :
   - Consultez les logs Railway : `railway logs`
   - Vérifiez la console du navigateur (F12 > Console)
   - Vérifiez que les URIs configurées dans Google Cloud Console correspondent exactement à votre domaine Railway

---

## Commandes Utiles

```bash
# Voir toutes les variables
railway variables

# Voir les logs en temps réel
railway logs

# Forcer un redéploiement
railway up

# Ouvrir l'interface web du projet
railway open
```

---

## Notes Importantes

- Les variables `VITE_*` sont exposées côté client (visibles dans le code JavaScript)
- Le Google Client ID est considéré comme **public** (c'est normal)
- **Ne mettez JAMAIS** de Client Secret dans le frontend
- Après chaque modification de variable, Railway redéploie automatiquement
- Les variables sont injectées au moment du build Vite
