import { promisify } from "util";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";
import electron, { ProcessManagerState } from "electron-connect";

import mainConfig from "./webpack.main.config";
import preloadConfig from "./webpack.preload.config";
import rendererConfig from "./webpack.renderer.config";

const mainBuild = webpack([mainConfig, preloadConfig]);
const server = new WebpackDevServer(webpack(rendererConfig), {
  hot: true,
  publicPath: "/",
});

function cb(state: ProcessManagerState) {
  if (state === "stopped") {
    process.exit();
  }
}

(async () => {
  try {
    await promisify<number, string>(server.listen.bind(server))(
      8080,
      "localhost"
    );
    const electronServer = electron.server.create({ stopOnClose: true });
    mainBuild.watch(
      {
        aggregateTimeout: 300,
        poll: undefined,
        ignored: ["**/.yarn"],
      },
      (err, stats) => {
        if (err) {
          electronServer.stop();
          process.exit();
        }
        if (stats) {
          const mainStats = stats.stats[0];
          const bundle = `${mainStats.compilation.outputOptions.path}/${mainStats.compilation.outputOptions.filename}`;
          if (electronServer.electronState === "init") {
            electronServer.start(bundle, cb);
          } else {
            electronServer.restart(bundle, cb);
          }
        }
      }
    );
  } catch (e) {
    console.error(e);
    process.exit();
  }
})();
