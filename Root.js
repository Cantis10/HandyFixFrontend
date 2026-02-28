// index.js
import { AppProvider } from "./contexts/appContext";
import App from "./components/App";

export default function Root() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
