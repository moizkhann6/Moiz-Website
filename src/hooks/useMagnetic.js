import { useRef, useEffect } from 'react';

/**
 * Reusable React Hook for magnetic cursor attraction effects.
 * Calculates center distance and moves elements smoothly towards the pointer.
 */
export function useMagnetic(enabled = true) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) {
      if (ref.current) {
        ref.current.style.transform = '';
      }
      return;
    }

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);

      // Applies a 25% pull vector to subtly attract the button to the cursor coordinates
      el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };

    const handleMouseLeave = () => {
      el.style.transform = 'translate(0px, 0px)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
      if (el) el.style.transform = '';
    };
  }, [enabled]);

  return ref;
}
