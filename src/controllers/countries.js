import countrycitystatejson from "countrycitystatejson";

export const searchCountries = async function (req, res) {
  try {
    const { name } = req.query;

    let countries = countrycitystatejson.getCountries();

    if (name) {
      countries = countries.filter((country) =>
        country.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    res.page(countries);
  } catch (error) {
    res.failure(error);
  }
};

export const searchStates = async function (req, res) {
  try {
    const { name, countryShortName } = req.query;

    let states = countrycitystatejson.getStatesByShort(countryShortName);

    if (name) {
      states = states.filter((state) =>
        state.toLowerCase().includes(name.toLowerCase())
      );
    }

    res.page(states);
  } catch (error) {
    res.failure(error);
  }
};
