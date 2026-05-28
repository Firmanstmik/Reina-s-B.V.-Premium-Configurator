import { ConfiguratorOfficial } from "./ConfiguratorOfficial";
import { ConfiguratorPresentation } from "./ConfiguratorPresentation";
import { CONFIGURATOR_MODE } from "./configurator-mode";

export function Configurator() {
  if (CONFIGURATOR_MODE === "presentation") {
    return <ConfiguratorPresentation />;
  }

  return <ConfiguratorOfficial />;
}
