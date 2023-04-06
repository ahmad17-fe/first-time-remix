const _TITLE = ENV.APP_TITLE;
const AppTitle = ({ subtitle }: { subtitle: string }) => {
  let title;
  if (subtitle) {
    title = `${subtitle} | ${_TITLE}`;
  } else {
    title = _TITLE;
  }
  return title;
};

export default AppTitle;
