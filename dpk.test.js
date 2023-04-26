const {
  deterministicPartitionKey,
  getEventPartitionKey,
  maxPartitionKeyLength,
  minimisePartitionKeyLength,
} = require("./dpk");

describe("getEventPartitionKey", () => {
  it("Returns the partition key as string if it already exists", () => {
    const ev = { partitionKey: 1234 };
    expect(getEventPartitionKey(ev)).toBe("1234");
  });
  it("Returns a hex as the partition key if it does not exists on the event", () => {
    const ev = { hello: "hi" };
    expect(typeof getEventPartitionKey(ev)).toBe("string");
  });
});

describe("minimisePartitionKeyLength", () => {
  it("Reduces the length of the key if the key longer than the MAX_PARTITION_KEY_LENGTH", () => {
    const veryLongPartitionKey = new Array(maxPartitionKeyLength + 5).join("1");
    expect(minimisePartitionKeyLength(veryLongPartitionKey).length).toBeLessThan(maxPartitionKeyLength);
  });
  it("Returns the same key if the length is less than the MAX_PARTITION_KEY_LENGTH", () => {
    const partitionKey = "29d02af0-2b9f-470c-a777-3aff8766ef5c";
    expect(minimisePartitionKeyLength(partitionKey).length).toBe(partitionKey.length);
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});
