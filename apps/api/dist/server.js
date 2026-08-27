import { createApp } from './app.js';
const DEFAULT_PORT = 4000;
const parsedPort = Number(process.env.API_PORT ?? DEFAULT_PORT);
const port = Number.isInteger(parsedPort) && parsedPort > 0 ? parsedPort : DEFAULT_PORT;
const app = createApp();
const server = app.listen(port, () => {
    process.stdout.write(`SkillGraph API listening on port ${port}\n`);
});
function shutdown(signal) {
    process.stdout.write(`${signal} received; shutting down SkillGraph API\n`);
    server.close((error) => {
        if (error) {
            process.stderr.write('SkillGraph API did not shut down cleanly\n');
            process.exitCode = 1;
        }
    });
}
process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
//# sourceMappingURL=server.js.map