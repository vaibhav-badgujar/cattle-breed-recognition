import { Link } from 'react-router-dom';

function Footer() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <div><Link to="/" className="footer-brand">Cattle<span>AI</span></Link><p>Computer vision for India&apos;s indigenous cattle heritage.</p></div>
      <div className="footer-links"><Link to="/predict">Predict breed</Link><Link to="/about">Project overview</Link><Link to="/contact">Contact</Link></div>
      <p className="footer-copy">© {new Date().getFullYear()} CattleAI</p>
    </div>
  </footer>;
}

export default Footer;
