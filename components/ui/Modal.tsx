'use client';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { forwardRef, HTMLAttributes, useEffect, useRef } from 'react';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showClose?: boolean;
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, title, showClose = true, className, children, ...props }, ref) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) onClose();
      };

      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
        {...props}
      >
        <div
          ref={(node) => {
            modalRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={cn(
            'relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-cream rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {showClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-terracotta/10 transition-colors"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>
          )}
          {title && (
            <div className="px-6 pt-6 pb-4 border-b border-terracotta/20">
              <h2 className="text-2xl font-display font-bold text-deep-brown">{title}</h2>
            </div>
          )}
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
