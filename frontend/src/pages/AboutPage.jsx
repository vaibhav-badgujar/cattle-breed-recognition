import Card from '../components/Card';
import Section from '../components/Section';

function AboutPage() {
    const stack = ['Python', 'PyTorch + timm', 'FastAPI', 'React + Vite', 'REST API', 'Google Colab'];
    const features = ['Image-based breed recognition', 'Top-3 predictions', 'Confidence scoring', 'Responsive UI', 'Breed metadata', 'Live demo readiness'];

    return (
        <div className="page-shell">
            <Section title="About CattleAI" eyebrow="Major project overview" align="center">
                <Card className="about-hero-card">
                    <p>
                        CattleAI is a full-stack AI application for recognizing Indian cattle and buffalo breeds from images. It combines modern computer vision, a production-friendly API, and a premium frontend experience for academic and portfolio presentation.
                    </p>
                </Card>
            </Section>

            <div className="about-grid">
                <Card className="about-card">
                    <h3>Project vision</h3>
                    <p>The system helps users identify breeds quickly through visual input while presenting rich context around each prediction.</p>
                </Card>
                <Card className="about-card">
                    <h3>Model details</h3>
                    <p>EfficientNet-B0 powers the image classifier, with a 224 × 224 input pipeline and multi-class prediction output.</p>
                </Card>
                <Card className="about-card">
                    <h3>Technology stack</h3>
                    <ul>
                        {stack.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </Card>
                <Card className="about-card">
                    <h3>Key capabilities</h3>
                    <ul>
                        {features.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                </Card>
                <Card className="about-card">
                    <h3>Development context</h3>
                    <p>Designed for a final-year engineering major project, this interface emphasizes clarity, visual polish, and presentation readiness.</p>
                </Card>
                <Card className="about-card">
                    <h3>Team & scope</h3>
                    <p>Vaibhav Chandrakant Badgujar, Kishor Dhangar, Akash Patil, and Himanshu Khalane built this end-to-end solution.</p>
                </Card>
            </div>
        </div>
    );
}

export default AboutPage;