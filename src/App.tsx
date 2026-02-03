import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./domain/router/router";
import { ThemeProvider } from "./domain/context/ThemeContext";
import "./assets/styles/themes.css";

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
