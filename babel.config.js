module.exports = {
    presets: [
      [
        "babel-preset-expo",
        {
          unstable_transformImportMeta: true,  // ¡Esta línea es clave!
          jsxRuntime: "automatic"             // Recomendado para SDK 53
        }
      ]
    ]
  };