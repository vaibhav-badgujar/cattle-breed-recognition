import { useState } from 'react';
import { downloadPredictionReport } from '../utils/predictionReport';
import './BreedInformationPanel.css';

const fieldGroups = [
  { title: 'Origin & distribution', fields: [['⌖', 'Origin state(s)', 'originStates'], ['◎', 'Native region', 'nativeRegion'], ['◌', 'Conservation status', 'conservationStatus']] },
  { title: 'Breed characteristics', fields: [['◒', 'Coat colour', 'coatColour'], ['⌁', 'Horn shape', 'hornShape'], ['◈', 'Body characteristics', 'bodyCharacteristics'], ['☼', 'Climate adaptability', 'climateAdaptability'], ['♡', 'Temperament', 'temperament'], ['✦', 'Disease resistance', 'diseaseResistance']] },
];

function BreedInformationPanel({ result, breed, image, notify }) {
  const [downloading, setDownloading] = useState(false);
  if (!breed) return <div className="breed-panel unavailable"><h3>Breed profile is being expanded</h3><p>We received the prediction, but a detailed local profile is not yet available for this exact label.</p></div>;
  const confidence = (result.confidence || 0) * 100;
  const download = async () => { setDownloading(true); try { await downloadPredictionReport({ result, breed, image }); notify('Your A4 prediction report has been downloaded.'); } catch { notify('The report could not be generated. Please try again.', 'error'); } finally { setDownloading(false); } };
  return <section className="breed-panel"><div className="panel-title"><div><span className="eyebrow"><i /> Comprehensive breed profile</span><h2>{breed.name}</h2><p>{breed.scientificName} · {breed.category} · {breed.type}</p></div><button className="btn btn-report" onClick={download} disabled={downloading}>{downloading ? 'Preparing report…' : '⇩ Download Prediction Report'}</button></div>
    {confidence < 60 && <div className="low-confidence">! This prediction has low confidence. Please upload a clearer side-view image for better accuracy.</div>}
    <div className="profile-hero">{image && <img src={image} alt={`Uploaded ${breed.name}`} />}<div className="profile-summary"><span>AI prediction</span><strong>{result.predicted_breed}</strong><div className="profile-score"><b>{confidence.toFixed(1)}%</b><small>confidence score</small></div><p>{breed.bodyCharacteristics}. Best suited to {breed.suitableFarmingConditions.toLowerCase()}.</p></div></div>
    <div className="facts-grid"><Property icon="◫" label="Milk yield" value={breed.milkYield} /><Property icon="⚖" label="Average weight" value={breed.weight} /><Property icon="◌" label="Life span" value={breed.lifeSpan} /><Property icon="↗" label="Primary uses" value={breed.primaryUses} /></div>
    <div className="interesting-fact"><span>✦</span><div><small>INTERESTING FACT</small><p>{breed.interestingFacts}</p></div></div>
    {fieldGroups.map((group) => <div className="profile-group" key={group.title}><h3>{group.title}</h3><div className="property-grid">{group.fields.map(([icon, label, key]) => <Property key={key} icon={icon} label={label} value={breed[key]} />)}</div></div>)}
  </section>;
}
function Property({ icon, label, value }) { return <div className="property"><span>{icon}</span><div><small>{label}</small><strong>{value}</strong></div></div>; }
export default BreedInformationPanel;
