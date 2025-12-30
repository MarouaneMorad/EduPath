export default {
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  // ...existing code...
  // extensionsToTreatAsEsm: ['.js'],
};
