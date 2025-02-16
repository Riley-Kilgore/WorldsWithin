const metadata = require("./metadata.json"); // TODO - We can replace this with koios calls.
const initialOrder = require("./order.json"); // 

const getSpacebudz = () => { // TODO we actually don't want to use koios, it's too much let's try and keep things as similar as we can to as they are.
  return Object.keys(metadata).map((id) => {
    const type = metadata[id].type;
    const gadgets = metadata[id].traits;
    const image =
      "https://ipfs.blockfrost.dev/ipfs/" +
      metadata[id].image.split("ipfs://")[1];
    return {
      id,
      image,
      type,
      gadgets,
    };
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    experiments: {
      asyncWebAssembly: true,
    },
  });
};

exports.createPages = async ({ actions: { createPage } }) => {
  const spacebudz = getSpacebudz();
  createPage({
    path: `/explore/`,
    component: require.resolve("./src/templates/explore.js"),
    context: { spacebudz, initialOrder },
  });
  spacebudz.forEach((spacebud) => {
    createPage({
      path: `/explore/spacebud/${spacebud.id}/`,
      component: require.resolve("./src/templates/spacebud.js"),
      context: { spacebud },
    });
  });
  createPage({
    path: `/profile`,
    component: require.resolve("./src/templates/profile.js"),
    context: { spacebudz },
  });
};
