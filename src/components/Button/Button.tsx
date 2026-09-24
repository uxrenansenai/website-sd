import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './Button.module.css';

type SharedProps = {
  variant: 'primary' | 'secondary';
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

type LinkProps = SharedProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; type?: never };
type NativeProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

export type ButtonProps = LinkProps | NativeProps;

export function Button(props: ButtonProps) {
  const { variant, children, className = '', showArrow = true, ...rest } = props;
  const classes = [styles.button, styles[variant], 'button', className].filter(Boolean).join(' ');
  const content = <><span className={styles.label}>{children}</span>{showArrow && <ArrowRight className={styles.arrow} size={18} strokeWidth={1.8} aria-hidden="true" />}</>;

  if ('href' in props && props.href) {
    return <a {...rest as AnchorHTMLAttributes<HTMLAnchorElement>} className={classes}>{content}</a>;
  }

  return <button {...rest as ButtonHTMLAttributes<HTMLButtonElement>} className={classes}>{content}</button>;
}
