import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import './ui.css';
export function Button({ children, className = '', ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) { return <button className={`button ${className}`} {...props}>{children}</button>; }
export function IconButton({ label, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) { return <button className="icon-button" aria-label={label} title={label} {...props} />; }
