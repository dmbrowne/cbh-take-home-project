const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.maxPartitionKeyLength = MAX_PARTITION_KEY_LENGTH;

exports.getEventPartitionKey = (ev) => {
  if (!ev) throw new Error("Event is required to get a partiion key");
  if (ev.partitionKey) return ev.partitionKey.toString();
  return crypto.createHash("sha3-512").update(JSON.stringify(ev)).digest("hex");
};

exports.minimisePartitionKeyLength = (partitionKey) => {
  if (!partitionKey) throw new Error("Cannot reduce partiion key if partition key is undefined");
  if (partitionKey.length > MAX_PARTITION_KEY_LENGTH) {
    return crypto.createHash("sha3-512").update(partitionKey).digest("hex");
  } else {
    return partitionKey;
  }
};

exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;
  const partitionKey = getEventPartitionKey(event);
  return minimisePartitionKeyLength(partitionKey);
};
