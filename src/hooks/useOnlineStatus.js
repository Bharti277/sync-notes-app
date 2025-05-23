import { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const updateOnlineStatus = async () => {
      try {
        const online = await fetch("https://www.gstatic.com/generate_204", {
          method: "GET",
          mode: "no-cors",
        });
        setIsOnline(true);
      } catch (err) {
        console.log(err, "err");

        setIsOnline(false);
      }
    };

    updateOnlineStatus();

    const handleOnline = () => updateOnlineStatus();
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const interval = setInterval(updateOnlineStatus, 5000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      clearInterval(interval);
    };
  }, []);

  return isOnline;
};

export default useOnlineStatus;
