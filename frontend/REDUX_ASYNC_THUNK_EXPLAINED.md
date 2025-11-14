# 📚 Redux AsyncThunk - Guide Complet

## 🤔 Pourquoi utiliser `createAsyncThunk` ?

`createAsyncThunk` est un outil de Redux Toolkit qui simplifie la gestion des **appels API asynchrones** dans Redux.

### Sans AsyncThunk (Approche traditionnelle) ❌

```javascript
// Vous devriez créer 3 actions manuellement :
const FETCH_START = 'crypto/fetchStart';
const FETCH_SUCCESS = 'crypto/fetchSuccess';
const FETCH_ERROR = 'crypto/fetchError';

// Puis un middleware complexe pour gérer l'async
function fetchCrypto() {
  return async (dispatch) => {
    dispatch({ type: FETCH_START });
    try {
      const response = await fetch('...');
      const data = await response.json();
      dispatch({ type: FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_ERROR, payload: error });
    }
  };
}
```

### Avec AsyncThunk (Approche moderne) ✅

```typescript
// UNE SEULE fonction qui gère tout automatiquement !
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets...');
      if (!response.ok) {
        throw new Error('Failed to fetch crypto data');
      }
      const data = await response.json();
      return data as CryptoData[];
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);
```

---

## 🎯 Comment fonctionne `createAsyncThunk` ?

### 1️⃣ Création de l'AsyncThunk

```typescript
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',  // ← Nom unique de l'action
  async (_, { rejectWithValue }) => {
    // ↑ paramètres d'entrée (ici aucun, donc _)
    // ↑ rejectWithValue pour gérer les erreurs
    
    try {
      const response = await fetch('URL_API');
      const data = await response.json();
      return data; // ← Résultat envoyé au reducer
    } catch (error) {
      return rejectWithValue(error.message); // ← Erreur envoyée au reducer
    }
  }
);
```

### 2️⃣ AsyncThunk génère automatiquement 3 actions

Quand vous créez un AsyncThunk, Redux crée automatiquement 3 états :

| État | Action générée | Quand ? |
|------|----------------|---------|
| 🕐 **Pending** | `crypto/fetchCryptoData/pending` | Appel API en cours |
| ✅ **Fulfilled** | `crypto/fetchCryptoData/fulfilled` | Appel API réussi |
| ❌ **Rejected** | `crypto/fetchCryptoData/rejected` | Appel API échoué |

---

## 🔗 Pourquoi créer un Slice avec `extraReducers` ?

### Le Slice est le **cerveau** qui gère l'état

```typescript
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    coins: [],
    loading: false,
    error: null,
    lastUpdated: null,
  },
  reducers: {
    // Actions synchrones (optionnelles)
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 🎯 ICI on écoute les 3 états de l'AsyncThunk
    builder
      // 🕐 PENDING : L'API est en train de charger
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      
      // ✅ FULFILLED : L'API a réussi
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.loading = false;
        state.coins = action.payload; // ← Données reçues
        state.lastUpdated = Date.now();
      })
      
      // ❌ REJECTED : L'API a échoué
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // ← Message d'erreur
      });
  },
});
```

---

## 🤝 Comment AsyncThunk et Slice travaillent ensemble

```
┌─────────────────────────────────────────────────────────┐
│  1. Composant appelle dispatch(fetchCryptoData())      │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  2. AsyncThunk envoie action PENDING                    │
│     → Slice met loading = true                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  3. AsyncThunk fait l'appel API (fetch)                 │
└────────────────────┬────────────────────────────────────┘
                     │
           ┌─────────┴─────────┐
           │                   │
           ▼                   ▼
    ✅ SUCCÈS              ❌ ERREUR
           │                   │
           ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│ Action FULFILLED │  │ Action REJECTED  │
│ → coins = data   │  │ → error = msg    │
│ → loading = false│  │ → loading = false│
└──────────────────┘  └──────────────────┘
```

---

## 💡 Pourquoi séparer AsyncThunk et Slice ?

### 🎭 Séparation des responsabilités

| Composant | Rôle |
|-----------|------|
| **AsyncThunk** | 🌐 Appels API et logique asynchrone |
| **Slice** | 📊 Gestion de l'état dans Redux |

**Exemple concret :**

```typescript
// ✅ AsyncThunk = QUOI faire (appeler l'API)
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async () => {
    const response = await fetch('API_URL');
    return response.json();
  }
);

// ✅ Slice = COMMENT réagir (mettre à jour l'état)
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        // Réaction : Afficher le loading
        state.loading = true;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        // Réaction : Sauvegarder les données
        state.coins = action.payload;
      });
  },
});
```

---

## 🎯 Utilisation dans un composant React

```typescript
export const CryptoTrackerPage = () => {
  const dispatch = useAppDispatch();
  const { coins, loading, error } = useAppSelector((state) => state.crypto);

  useEffect(() => {
    // 1. Lancer l'appel API
    dispatch(fetchCryptoData());
  }, [dispatch]);

  // 2. Afficher selon l'état
  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;
  
  // 3. Afficher les données
  return (
    <div>
      {coins.map(coin => (
        <div key={coin.id}>{coin.name}</div>
      ))}
    </div>
  );
};
```

---

## 🆚 Redux AsyncThunk vs React seul

### Avec React uniquement (useState + useEffect)

```typescript
// ❌ État local = perdu au démontage du composant
const [coins, setCoins] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
  setLoading(true);
  fetch('API_URL')
    .then(res => res.json())
    .then(data => {
      setCoins(data);
      setLoading(false);
    });
}, []);

// Problèmes :
// - Données perdues si on change de page
// - Pas de cache
// - Duplication de code sur chaque composant
```

### Avec Redux AsyncThunk

```typescript
// ✅ État global = conservé dans tout l'app
const { coins, loading } = useAppSelector((state) => state.crypto);

useEffect(() => {
  dispatch(fetchCryptoData());
}, []);

// Avantages :
// ✅ Données conservées entre les pages
// ✅ Cache automatique
// ✅ Un seul endroit pour gérer l'API
// ✅ Redux DevTools pour débugger
// ✅ Prévisibilité totale
```

---

## 📊 Résumé visuel

```
┌───────────────────────────────────────────────────────┐
│                 REDUX ASYNC THUNK                     │
├───────────────────────────────────────────────────────┤
│                                                       │
│  🎯 createAsyncThunk                                 │
│     └─ Gère les appels API                           │
│     └─ Génère 3 actions automatiques                 │
│                                                       │
│  📦 createSlice                                       │
│     └─ Définit l'état initial                        │
│     └─ Écoute les actions via extraReducers          │
│     └─ Met à jour l'état Redux                       │
│                                                       │
│  🎨 Composant React                                   │
│     └─ Dispatch l'AsyncThunk                         │
│     └─ Lit l'état via useSelector                    │
│     └─ Affiche loading/error/data                    │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 🚀 Avantages finaux

| Avantage | Explication |
|----------|-------------|
| 🎯 **Simplicité** | Une fonction = toute la logique async |
| 🔄 **Automatique** | 3 états gérés automatiquement |
| 📊 **État centralisé** | Données accessibles partout |
| 🐛 **Débogage facile** | Redux DevTools visualise tout |
| ♻️ **Réutilisable** | Un Thunk utilisé dans plusieurs composants |
| ⚡ **Performance** | Cache intégré, pas de re-fetch inutile |

---

## 🎓 Conclusion

**AsyncThunk** = Fonction qui appelle l'API  
**Slice** = Gestionnaire qui écoute et met à jour l'état  
**Ensemble** = Solution complète et élégante pour gérer les appels API dans Redux ! 🎉
