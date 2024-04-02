import { SSTConfig } from "sst";
import { SvelteKitSSTAuth } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      name: "sveltekit-sst-auth",
      region: "ap-southeast-2",
    };
  },
  stacks(app) {
    app.stack(SvelteKitSSTAuth);
  }
} satisfies SSTConfig;
