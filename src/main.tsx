import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {CustomThemeProvider} from "./app/core/providers/customThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CustomThemeProvider>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </CustomThemeProvider>
)
