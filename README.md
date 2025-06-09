
  <img src="images/extension_icon.png" width="128" alt="React Snippets Pro Logo" />

# 📦 Blessed’s React + TypeScript VS Code Snippets
A collection of clean, dynamic, reusable VS Code snippets for React, TypeScript, and Axios-based service management.
Designed to speed up development, enforce consistency, and reduce boilerplate.

## 📑 Available Snippets
## 🟢 React State Snippets
Prefix	Description
st_	Dynamic useState with inferred type (e.g., st_count_number → useState<number>(0))
st	Basic useState hook
st_loading	Boolean loading state (useState<boolean>(false))
st_error	Error state (useState<string | null>(null))
## 🟣 React Hook Snippets
Prefix	Description
hook	Creates a custom React hook file (auto-named)
ue	useEffect hook skeleton
hclk	Click event handler
hcg	Input change event handler
🟡 React Context Snippets
Prefix	Description
ctx	Generates a full React Context (Provider + custom hook) based on filename (e.g., UserContext.tsx).
🔵 Axios API Service Snippets
Prefix	Description
svc	Axios service instance with interceptors + CRUD methods (get, post, put, delete).
svc_auth	AuthClient class with methods like loginWithCredentials, signUp, refreshToken, etc.
svc_mgmt	Dynamic CRUD service class (e.g., products.ts → ProductsService with /products endpoints).
## 📦 Example Usage
🔸 State Hook
Trigger: st_user_string →

ts
const [user, setUser] = useState<string>('');
🔸 React Context
Trigger: ctx in UserContext.tsx →

Generates:

UserContext

UserProvider

useUser() custom hook

🔸 Axios API Service
Trigger: svc →

Creates a pre-configured Axios instance with interceptors.

🔸 Auth Service
Trigger: svc_auth →

ts
class AuthClient {
  loginWithCredentials = (credentials) => { ... };
  signOut = () => { ... };
  // ...etc.
}
🔸 Dynamic Management Service
Trigger: svc_mgmt in products.ts →

ts
class ProductsService {
  getAll() { return apiService.get("/products"); }
  getById(id) { return apiService.get(`/products/${id}`); }
  // ...CRUD methods
}
export const productsService = new ProductsService();
#📌 Installation
Copy the JSON snippet definitions into your VS Code snippets file (react-ts.code-snippets).

Restart VS Code.

Type a prefix (e.g., st_, ctx) and press Tab/Enter to expand.

#💾 Pro Tips
Dynamic Naming: Files like products.ts auto-generate ProductsService with /products endpoints.

State Types: Use st_count_number for typed states (useState<number>).

Separation of Concerns: Use svc_auth (auth) and svc_mgmt (CRUD) for clean service layers.

# ✅ Why This Setup?
DRY Code: Less boilerplate, more consistency.

Scalable: Auto-generated services/hooks.

Fast Development: Snippets for 90% of React/TS patterns.

# ✨ Author: Blessed Raj P
(Front-End Developer | React • TypeScript • Clean Code Specialist)

# 🔗 License
MIT © Blessed Raj P