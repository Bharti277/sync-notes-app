import React from "react";
import useOnlineStatus from "../hooks/useOnlineStatus";

const SyncStatus = ({ synced }) => {
  const isOnline = useOnlineStatus();
  console.log(isOnline, "isonline?");
  console.log(synced, "synced?");

  const finalSynced = isOnline ? true : false;
  // const finalSynced = isOnline ? synced : false;
  const statusColor = finalSynced ? "text-green-600" : "text-red-600";
  const statusText = finalSynced ? "Synced" : "Unsynced";

  return <span className={`text-sm ${statusColor}`}>{statusText}</span>;
};

export default SyncStatus;
