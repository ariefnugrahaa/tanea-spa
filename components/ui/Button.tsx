import { cn } from '@/lib/utils';
import { forwardRef, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-terracotta text-white hover:bg-terracotta-light focus:ring-terracotta shadow-md hover:shadow-lg',
      secondary: 'bg-cream text-deep-brown hover:bg-warm-beige focus:ring-cream',
      outline: 'border-2 border-cream text-cream hover:bg-cream hover:text-deep-brown focus:ring-cream',
      ghost: 'bg-transparent hover:bg-terracotta/10 text-deep-brown hover:text-terracotta',
    };

    const sizes = {
      xs: 'px-3 py-1.5 text-xs',
      sm: 'px-4 py-2 text-xs sm:text-sm',
      md: 'px-6 py-3 text-sm sm:text-base',
      lg: 'px-8 py-4 text-base sm:text-lg',
      xl: 'px-10 py-5 text-lg sm:text-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
