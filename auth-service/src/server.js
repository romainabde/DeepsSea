const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 API Express + Prisma + MySQL + JWT listening on http://localhost:${PORT}`);
});