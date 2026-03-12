import './App.css'
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { initOptions, keycloak } from "./config/keycloak.tsx";
import MainRouter from "./route/MainRoute.tsx";

function App() {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
            onTokens={(tokens) => {
                if (tokens.token) {
                    localStorage.setItem('access_token', tokens.token);
                } else {
                    localStorage.removeItem('access_token');
                }
            }}
        >
            <MainRouter />
        </ReactKeycloakProvider>
    )
}

export default App
