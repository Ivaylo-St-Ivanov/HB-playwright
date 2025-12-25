import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Plays from './pages/Plays';
import Contact from './pages/Contact';
import Biography from './pages/Biography';
import Staging from './pages/Staging';
import FestivalsAndPrizes from './pages/FestivalsAndPrizes';
import Review from './pages/Review';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="plays" element={<Plays />} />
              <Route path="contact" element={<Contact />} />
              <Route path="biography" element={<Biography />} />
              <Route path="staging" element={<Staging />} />
              <Route path="festivals-and-prizes" element={<FestivalsAndPrizes />} />
              <Route path="review" element={<Review />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
