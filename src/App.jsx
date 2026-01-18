import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Themes from "./pages/Themes";
import Start from "./pages/Start";
import EditThemes from "./pages/EditThemes";
import CreateTheme from "./pages/CreateTheme";
import Words from "./pages/Words";
import EditWord from "./pages/EditWord";
import NewWord from "./pages/CreateWord";
import LayoutHeader from "./component/Layout-Header";
import RenameTheme from "./pages/RenameTheme";
import Search from "./pages/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutHeader />}>
          <Route index path="/" element={<Dashboard />} />
          <Route path="/themes" element={<Themes />} />
          <Route path="/edit-themes" element={<EditThemes />} />
          <Route path="/create-theme" element={<CreateTheme />} />
          <Route path="/words/:themeName" element={<Words />} />
          <Route path="/edit-word/:wordId" element={<EditWord />} />
          <Route path="/create-word/:themeName" element={<NewWord />} />
          <Route path="/rename-theme/:themeName" element={<RenameTheme />} />
          <Route path="/search" element={<Search />} />
        </Route>
          <Route path="/start" element={<Start />} />
      </Routes>
    </BrowserRouter>
  );
}
