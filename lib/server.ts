// lib/server.ts
import app from "./app";
const PORT = 3000;

app.listen(PORT, () => {
    console.log('APIE Express server running on port ' + PORT);
})