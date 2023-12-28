import { useEffect, useCallback } from 'react';

const useOutsideClick = (ref, ignoredRef, callback) => {
  const handleClickOutside = useCallback(
    (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        (ignoredRef ? !ignoredRef.current.contains(event.target) : true) &&
        !event.target.getAttribute('data-testid')
      ) {
        callback();
      }
    },
    [ref, callback, ignoredRef],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);
};

export default useOutsideClick;
