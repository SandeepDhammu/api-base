import configure from "./src/app.js";
import connect from "./src/database/index.js";

try {
    configure(); // app configure
    connect(); // database connect
} catch (err) {
    console.log(err);
}