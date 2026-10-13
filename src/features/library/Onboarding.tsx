import { appConfig } from '../../config/appConfig';
import { Button } from '../../components/ui/Button';
import './onboarding.css';
export function Onboarding({onStart}:{onStart:()=>void}){return <main className="onboarding"><div className="onboarding-mark"><i>i</i></div><span className="eyebrow">{appConfig.extensionName}</span><h1>Your inspiration stays yours.</h1><p>We don’t collect your data, track you, or upload your screenshots. Everything is stored locally in your browser.</p><ul><li>Local-only storage</li><li>No account required</li><li>No tracking or analytics</li><li>Screenshots remain on-device</li></ul><Button onClick={onStart}>Start collecting</Button></main>}
