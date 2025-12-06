import { useEffect, useRef, useState } from 'react';

export function useClickTracking() {
  const [totalClicks, setTotalClicks] = useState<number | null>(null);
  const pendingClicksRef = useRef(0); // Use as value ref

  // Fetch total clicks on mount (auto calls GET)
  useEffect(() => {
    fetch('/api/increment-clicks')
      .then(res => res.json())
      .then(data => setTotalClicks(data.clicks))
      .catch(console.error);
  }, []);

  // Sync pending clicks every second
  useEffect(() => {
    const syncInterval = setInterval(async () => {
      if (pendingClicksRef.current === 0) return;

      const clicksToSync = pendingClicksRef.current;
      pendingClicksRef.current = 0;

      try {
        // Update batch of clicks
        await fetch('/api/increment-clicks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ count: clicksToSync }),
        });
      } catch (error) {
        // If sync fails, don't rollback -> just try again behind the scenes
        pendingClicksRef.current += clicksToSync;
        console.error('Failed to sync clicks:', error);
      }
    }, 1000);

    return () => clearInterval(syncInterval);
  }, []);

  // Sync remaining clicks on page close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pendingClicksRef.current > 0) {
        // Create package of data with blob
        const blob = new Blob(
          [JSON.stringify({ count: pendingClicksRef.current })],
          { type: 'application/json' }
        );
        // Send with beacon (works even after unload)
        navigator.sendBeacon('/api/increment-clicks', blob);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload); // Add a listener for user unloading on load
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  // Update for local display
  const handleClick = () => {
    pendingClicksRef.current++;
    setTotalClicks(prev => (prev ?? 0) + 1); 
  };

  return {
    handleClick,
    totalClicks,
  };
}