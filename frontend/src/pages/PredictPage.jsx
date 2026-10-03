import { useCallback, useEffect, useRef, useState } from 'react';
import breeds from '../data/breeds.json';
import { predictFromBase64, predictFromFile, predictFromURL } from '../services/api';
import { usePredictionHistory } from '../hooks/usePredictionHistory';
import BreedInformationPanel from '../components/BreedInformationPanel';
import Card from '../components/Card';
import Section from '../components/Section';
import './PredictPage.css';

const percent = (value) => `${((value || 0) * 100).toFixed(1)}%`;
const normalise = (name = '') => name.toLowerCase().replace(/\b(cow|buffalo)\b/g, '').replace(/[^a-z]/g, '');
const findBreed = (name) => breeds.find((breed) => normalise(breed.name) === normalise(name));

function PredictPage({ notify }) {
  const [tab, setTab] = useState('upload');
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const [cameraOn, setCameraOn] = useState(false);
  const inputRef = useRef(null); const videoRef = useRef(null); const canvasRef = useRef(null); const streamRef = useRef(null);
  const { history, addPrediction } = usePredictionHistory();

  const stopCamera = useCallback(() => { streamRef.current?.getTracks().forEach((track) => track.stop()); streamRef.current = null; setCameraOn(false); }, []);
  useEffect(() => () => stopCamera(), [stopCamera]);
  const selectFile = (candidate) => { if (!candidate?.type.startsWith('image/')) { const message = 'Please choose a valid image file.'; setError(message); notify(message, 'error'); return; } setFile(candidate); setResult(null); setError(''); const reader = new FileReader(); reader.onload = (event) => setPreview(event.target.result); reader.readAsDataURL(candidate); };
  const removeImage = () => { setPreview(null); setFile(null); setResult(null); if (inputRef.current) inputRef.current.value = ''; };
  const startCamera = async () => { try { const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment', width: { ideal: 960 }, height: { ideal: 720 } } }); streamRef.current = stream; if (videoRef.current) { videoRef.current.srcObject = stream; await videoRef.current.play(); } setCameraOn(true); setError(''); } catch { const message = 'Camera access was not available. Please check permissions.'; setError(message); notify(message, 'error'); } };
  const capture = () => { const video = videoRef.current; const canvas = canvasRef.current; if (!video?.videoWidth || !canvas) return; canvas.width = video.videoWidth; canvas.height = video.videoHeight; canvas.getContext('2d').drawImage(video, 0, 0); setPreview(canvas.toDataURL('image/jpeg', 0.9)); setFile(null); stopCamera(); };
  const predict = useCallback(async () => { setError(''); setResult(null); setLoading(true); try { let response; if (tab === 'upload' && file) response = await predictFromFile(file); else if (tab === 'url' && url.trim()) response = await predictFromURL(url.trim()); else if (tab === 'camera' && preview) response = await predictFromBase64(preview); else throw new Error('Please provide an image first.'); setResult(response); addPrediction(response, preview); notify('Analysis complete — your detailed breed profile is ready.'); } catch (reason) { const message = reason.message || 'Prediction failed. Please try again.'; setError(message); notify(message, 'error'); } finally { setLoading(false); } }, [addPrediction, file, notify, preview, tab, url]);
  const hasInput = (tab === 'upload' && file) || (tab === 'url' && url.trim()) || (tab === 'camera' && preview);
  const breed = result ? findBreed(result.predicted_breed) : null;

  return <div className="page-shell predict-page"><Section eyebrow="Live AI analysis" title="Identify a breed from a single image" align="center"><p className="section-intro">For best results, use a well-lit photo with one animal clearly visible.</p></Section><div className="predict-layout"><Card className="upload-card" hover={false}><div className="input-tabs">{[['upload', 'Upload image'], ['url', 'Image URL'], ['camera', 'Camera image']].map(([key, label]) => <button key={key} className={`input-tab ${tab === key ? 'active' : ''}`} onClick={() => { if (key !== 'camera') stopCamera(); setTab(key); setError(''); }}>{key === 'upload' ? '↥' : key === 'url' ? '⌁' : '◉'} {label}</button>)}</div>
      {tab === 'upload' && <><div className={`upload-zone ${dragging ? 'drag-over' : ''}`} role="button" tabIndex="0" onClick={() => inputRef.current?.click()} onKeyDown={(event) => event.key === 'Enter' && inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); selectFile(event.dataTransfer.files?.[0]); }}><div className="upload-icon">↑</div><strong>Drop your image here</strong><p>or <u>browse from your device</u></p><small>JPG, PNG or WEBP · Maximum 10 MB</small></div><input ref={inputRef} type="file" accept="image/*" hidden onChange={(event) => selectFile(event.target.files?.[0])} /></>}
      {tab === 'url' && <div className="url-panel"><label>Paste a public image URL<input type="url" placeholder="https://example.com/cattle.jpg" value={url} onChange={(event) => { setUrl(event.target.value); setPreview(event.target.value); }} /></label></div>}
      {tab === 'camera' && <><div className="camera-placeholder">{cameraOn ? <video className="camera-feed" ref={videoRef} playsInline muted /> : <><span>◉</span><strong>Camera capture</strong><p>Use your device camera to take a clear photo for analysis.</p><button className="text-button" onClick={startCamera}>Open camera →</button></>}{cameraOn && <div className="camera-controls"><button className="btn btn-primary" onClick={capture}>Capture photo</button><button className="text-button" onClick={stopCamera}>Cancel</button></div>}</div><canvas ref={canvasRef} hidden /></>}
      {preview && <div className="image-preview"><img src={preview} alt="Selected cattle" /><button className="remove-btn" onClick={removeImage} aria-label="Remove image">×</button></div>}
      {error && <p className="inline-error">! {error}</p>}<button className="btn btn-primary predict-btn" disabled={!hasInput || loading} onClick={predict}>{loading ? <><span className="button-loader" /> Analysing image…</> : <>Analyse breed <span>→</span></>}</button><p className="privacy-note">⌁ Your image is used only for this prediction.</p></Card>
      <div className="results-column">{loading && <Card className="analysis-skeleton" hover={false}><div className="skeleton visual" /><div className="skeleton line wide" /><div className="skeleton line" /><div className="skeleton stats" /><p>Our model is examining visual features…</p></Card>}{result && !loading && <Card className="result-card" hover={false}><div className="result-kicker"><span className="result-dot" /> ANALYSIS COMPLETE <span>{result.inference_time_ms ? `${result.inference_time_ms} ms` : 'Live inference'}</span></div><div className="result-header"><div><p>Your likely match</p><h3>{result.predicted_breed}</h3></div><div className="score-ring" style={{ '--score': `${Math.round((result.confidence || 0) * 360)}deg` }}><strong>{percent(result.confidence)}</strong><small>confidence</small></div></div><div className="confidence-bar-container"><div className="confidence-bar-label"><span>Model confidence</span><b>{percent(result.confidence)}</b></div><div className="confidence-bar"><div className="confidence-bar-fill" style={{ width: percent(result.confidence) }} /></div></div>{result.top_k?.length > 1 && <div className="alternatives"><h4>Alternative matches</h4>{result.top_k.slice(1).map((item, index) => <div className="topk-item" key={item.breed}><span>0{index + 2}</span><b>{item.breed}</b><em>{percent(item.confidence)}</em></div>)}</div>}</Card>}{!loading && !result && <Card className="empty-result" hover={false}><div>✦</div><h3>Ready when you are</h3><p>Upload an image to reveal a detailed AI-powered breed profile.</p>{history.length > 0 && <small>Recent: {history[0].predictedBreed} · {percent(history[0].confidence)}</small>}</Card>}</div></div>{result && !loading && <BreedInformationPanel result={result} breed={breed} image={preview} notify={notify} />}</div>;
}
export default PredictPage;
