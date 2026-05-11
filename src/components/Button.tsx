import React, { ButtonHTMLAttributes, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'inverted' | 'outlined';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.6,
        ease: 'power3.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const handleMouseDown = () => {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    const handleMouseUp = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);
    button.addEventListener('mousedown', handleMouseDown);
    button.addEventListener('mouseup', handleMouseUp);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
      button.removeEventListener('mousedown', handleMouseDown);
      button.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const baseStyles =
    'px-6 py-3 font-label font-medium transition-colors duration-300 ease-in-out flex items-center justify-center gap-2 cursor-pointer';

  const variants = {
    primary: 'bg-primary text-white hover:bg-secondary',
    secondary: 'bg-[#E5E5E5] text-secondary hover:bg-[#D4D4D4]',
    inverted: 'bg-neutral text-white hover:bg-black',
    outlined: 'border border-primary text-primary hover:bg-primary hover:text-white',
  };

  return (
    <button
      ref={buttonRef}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
