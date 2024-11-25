import { useState, useEffect, useRef } from 'react';

interface UseInViewportProps {
  threshold?: number;
  rootMargin?: string;
  selectRef: React.RefObject<HTMLElement>;
  optionsRef: React.RefObject<HTMLElement>;
  margin?: number;
  isOpen: boolean;
}

export const useInViewport = ({
  threshold = 0,
  rootMargin = '0px',
  selectRef,
  optionsRef,
  margin = 8,
  isOpen,
}: UseInViewportProps) => {
  const [isInViewport, setIsInViewport] = useState(true);
  const [distanceToBottom, setDistanceToBottom] = useState<number | null>(null);
  const [optionsHeight, setOptionsHeight] = useState<number>(0);
  const [position, setPosition] = useState<'top' | 'bottom'>('bottom');

  const resizeObserver = useRef<ResizeObserver | null>(null);

  // Function to update height
  const updateHeight = () => {
    if (optionsRef?.current) {
      const height = optionsRef.current.getBoundingClientRect().height;
      setOptionsHeight(height);
    } else {
      setOptionsHeight(0);
    }
  };

  // ResizeObserver initialization
  useEffect(() => {
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver.current = new ResizeObserver(() => {
        updateHeight();
      });
    }

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateHeight();

    const currentRef = optionsRef?.current;
    if (currentRef && resizeObserver.current) {
      resizeObserver.current.observe(currentRef);
    }

    return () => {
      if (currentRef && resizeObserver.current) {
        resizeObserver.current.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsRef?.current, isOpen, updateHeight]);

  useEffect(() => {
    const selectedElement = selectRef?.current;
    if (!selectedElement) return;

    const calculatePosition = () => {
      const selectedElementRect = selectedElement.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportBottom = window.scrollY + viewportHeight;
      const selectedElementBottom = selectedElementRect.bottom;

      const selectedToBottom = viewportBottom - selectedElementBottom;

      const distance = viewportHeight - (optionsHeight + 10);

      setDistanceToBottom(distance);
      setPosition(selectedToBottom < optionsHeight ? 'top' : 'bottom');
    };

    calculatePosition();

    if (typeof IntersectionObserver !== 'undefined') {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          setIsInViewport(entry.isIntersecting);
          calculatePosition();
        },
        {
          threshold,
          rootMargin,
        }
      );

      intersectionObserver.observe(selectedElement);

      window.addEventListener('resize', calculatePosition);
      window.addEventListener('scroll', calculatePosition);

      return () => {
        intersectionObserver.disconnect();
        window.removeEventListener('resize', calculatePosition);
        window.removeEventListener('scroll', calculatePosition);
      };
    }

    // Fallback if IntersectionObserver is not available
    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', calculatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin, margin, optionsHeight]);

  return { position, isInViewport, distanceToBottom };
};
