import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Section from '../components/Section';
import cattleEmblem from '../assets/cattle-emblem-green.png';
import './HomePage.css';

const features = [
  { icon: '◈', title: 'Vision intelligence', text: 'An EfficientNet-powered classifier built to recognise 41 Indian cattle and buffalo breeds.' },
  { icon: '↗', title: 'Instant analysis', text: 'Bring a clear photo and receive a ranked, confidence-scored prediction in seconds.' },
  { icon: '◎', title: 'Breed context', text: 'Go beyond a label with practical origin, purpose, milk yield, and breed information.' },
];

function HomePage() {
  return <div className="page-shell home-page">
    <section className="hero-panel">
      <div className="hero-copy reveal">
        <span className="eyebrow"><i />AI-powered breed recognition</span>
        <h1>See the breed.<br /><em>Know the story.</em></h1>
        <p>CattleAI helps identify Indian cattle and buffalo breeds through the clarity of computer vision—made for researchers, farmers, and curious minds.</p>
        <div className="hero-actions"><Link to="/predict" className="btn btn-primary">Identify a breed <span>→</span></Link><Link to="/about" className="text-button">Explore the project <span>↗</span></Link></div>
        <div className="hero-metrics"><div><strong>41</strong><span>Breed classes</span></div><div><strong>3</strong><span>Ways to predict</span></div><div><strong>AI</strong><span>Vision driven</span></div></div>
      </div>
      <div className="hero-visual" aria-label="AI cattle classification illustration">
        <div className="visual-grid" /><div className="scan-line" />
        <div className="cattle-silhouette" aria-hidden="true"><img src={cattleEmblem} alt="" /></div>
        <div className="floating-result"><span className="result-dot" /><div><small>MODEL OUTPUT</small><strong>Breed detected</strong></div><b>98.4%</b></div>
        <div className="vision-tag tag-one">◎ Visual feature map</div><div className="vision-tag tag-two">◌ 224 × 224 input</div>
      </div>
    </section>
    <section className="trust-strip"><span className="pulse-status"><i /> System online</span></section>
    <Section eyebrow="Designed for discovery" title="A clearer way to understand every breed" align="center"><p className="section-intro">Advanced recognition, distilled into an intuitive field-ready experience.</p><div className="feature-grid">{features.map((feature, index) => <Card key={feature.title} className="feature-card" hover><span className="feature-number">0{index + 1}</span><div className="feature-icon">{feature.icon}</div><h3>{feature.title}</h3><p>{feature.text}</p><span className="feature-arrow">→</span></Card>)}</div></Section>
    <section className="workflow-banner"><div><span className="eyebrow"><i /> Simple by design</span><h2>From image to insight<br />in three focused steps.</h2></div><div className="workflow-steps"><div><span>01</span><p>Upload<br />a clear image</p></div><div><span>02</span><p>Let the model<br />analyse it</p></div><div><span>03</span><p>Explore your<br />breed result</p></div></div><Link className="round-arrow" to="/predict" aria-label="Start a prediction">→</Link></section>
  </div>;
}
export default HomePage;
