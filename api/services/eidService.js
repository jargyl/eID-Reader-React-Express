const CardReader = require("eid-lib");

module.exports.getCardData = async function () {
  const cardReader = new CardReader("beidpkcs11.dll");
  try {
    if (cardReader.HasCard()) {
      const name = cardReader.GetFullName();
      const sex = cardReader.GetGender();
      const dateOfBirth = cardReader.GetDateOfBirth();
      const street = cardReader.GetStreetAndNumber();
      const zipcode = cardReader.GetAddressZip();
      const city = cardReader.GetAddressMunicipality();
      const country = cardReader.GetNationality();
      const nationalNumber = cardReader.GetNationalNumber();
      const locationOfBirth = cardReader.GetLocationOfBirth();
      const imageFile = cardReader.GetPhotoFile();
      const documentType = cardReader.GetData("document_type");
      const data = {
        name: name,
        sex: sex,
        dateOfBirth: dateOfBirth,
        street: street,
        zipcode: zipcode,
        city: city,
        country: country,
        nationalNumber: nationalNumber,
        locationOfBirth: locationOfBirth,
        imageFile: imageFile,
        documentType: documentType,
      };

      console.log("DATA: " + data);
      return data;
    } else {
      return {
        message: "No card detected",
      };
    }
  } catch (e) {
    console.error(e);
  } finally {
    cardReader.Finalize();
  }
};

module.exports.RequirePin = async function () {
  const cardReader = new CardReader("beidpkcs11.dll");
  try {
    const testdata = Buffer.from(["0", "1", "2", "3", "4", "5", "6", "7", "8"]);
    if (cardReader.HasCard()) {
      try {
        cardReader.EncrypteData(testdata);
        return true;
      } catch (error) {
        return false;
      }
    } else {
      return {
        message: "No card detected",
      };
    }
  } catch (e) {
    console.error(e);
  } finally {
    cardReader.Finalize();
  }
};
