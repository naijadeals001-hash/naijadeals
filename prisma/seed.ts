export const seed = async (): Promise<void> => {
  console.info('Platform foundation seed intentionally empty.');
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
