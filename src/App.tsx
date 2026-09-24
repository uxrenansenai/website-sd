import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Services } from './components/Services/Services';
import { Aws } from './components/Aws/Aws';
import { About } from './components/About/About';
import { Testimonials } from './components/Testimonials/Testimonials';
import { Faq } from './components/Faq/Faq';
import { Contact } from './components/Contact/Contact';
import { Footer } from './components/Footer/Footer';

export default function App() {
  return <><Header /><main><Hero /><Portfolio /><Services /><Aws /><About /><Testimonials /><Faq /><Contact /></main><Footer /></>;
}
