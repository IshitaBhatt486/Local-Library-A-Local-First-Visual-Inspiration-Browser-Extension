import type { InputHTMLAttributes } from 'react';
import './ui.css';
export function Input(props: InputHTMLAttributes<HTMLInputElement>) { return <input className="input" {...props} />; }
