/**
 * Local mock contact endpoint for development testing only.
 * NOT shipped to production; test/dev utility.
 *
 * Usage: node tests/mock-endpoint.mjs [port]
 * POST / -> 200 { ok: true }
 * Any request with a body containing "fail" -> 500 { message: "Simulated server error" }
 */
import http from "node:http";

const port = Number(process.argv[2] || 4174);

http
  .createServer((req, res) => {
    if (req.method === "OPTIONS") {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Accept",
      });
      res.end();
      return;
    }
    if (req.method !== "POST") {
      res.writeHead(405, { "Access-Control-Allow-Origin": "*" }).end();
      return;
    }
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", () => {
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Access-Control-Allow-Origin", "*");
      if (body.includes("@fail.test")) {
        res.writeHead(500);
        res.end(JSON.stringify({ message: "Simulated server error" }));
      } else {
        try {
          body && JSON.parse(body);
          res.writeHead(200);
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.writeHead(400);
          res.end(JSON.stringify({ message: "Invalid JSON" }));
        }
      }
    });
  })
  .listen(port, () => console.log(`mock endpoint on :${port}`));
