import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Services } from './components/Services/Services';
import { Aws } from './components/Aws/Aws';
import { About } from './components/About/About';
import { Press } from './components/Press/Press';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';
import { SmoothScroll } from './components/SmoothScroll/SmoothScroll';

export default function App() {
  return <><SmoothScroll /><Header /><main><Hero /><Portfolio /><Services /><Aws /><About /><Press /><Contact /></main><Footer /></>;
}
