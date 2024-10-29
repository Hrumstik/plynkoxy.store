export const checkLocale = () => {
  switch (navigator.language.split("-")[0]) {
    case "en":
      return "en";
    case "fr":
      return "fr";
    case "nl":
      return "nl";
    case "de":
    case "at":
    case "ch":
      return "de";
    case "es":
      return "es";
    case "it":
      return "it";
    case "pl":
      return "pl";
    case "br":
    case "pt":
      return "pt";
    case "dk":
      return "dk";
    default:
      return "en";
  }
};
