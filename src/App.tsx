import './App.css'
import {ReactKeycloakProvider} from "@react-keycloak/web";
import {initOptions, keycloak} from "./config/keycloak.tsx";
import MainRouter from "./route/MainRoute.tsx";
function App() {

    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={initOptions}
        >
                <MainRouter />
        </ReactKeycloakProvider>
    )
}


export default App
