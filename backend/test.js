import dns from "dns";

dns.resolveSrv(
  "_mongodb._tcp.cluster0.bzvk3nu.mongodb.net",
  (err, records) => {
    console.log("ERR:", err);
    console.log("RECORDS:", records);
  }
);