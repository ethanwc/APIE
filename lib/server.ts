// lib/server.ts
import app from "./app";
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log('APIE Express server running on port ' + PORT);
})

