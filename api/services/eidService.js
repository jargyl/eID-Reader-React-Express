const CardReader = require("eid-lib");

module.exports.getCardData = async function () {
  const cardReader = new CardReader("beidpkcs11.dll");
  const result = { data: {}, status: "" };
  try {
    if (cardReader.HasCard()) {
      const firstName = cardReader.GetFirstName();
      const lastName = cardReader.GetSurname();
      const sex = cardReader.GetGender();
      let dateOfBirth = cardReader.GetDateOfBirth();
      if (dateOfBirth.includes("MRT")) {
        dateOfBirth = dateOfBirth.replace("MRT", "MAR");
      } else if (dateOfBirth.includes("MEI")) {
        dateOfBirth = dateOfBirth.replace("MEI", "MAY");
      } else if (dateOfBirth.includes("OKT")) {
        dateOfBirth = dateOfBirth.replace("OKT", "OCT");
      }
      const street = cardReader.GetStreetAndNumber();
      const zipcode = cardReader.GetAddressZip();
      const city = cardReader.GetAddressMunicipality();
      const country = cardReader.GetNationality();
      const nationalNumber = cardReader.GetNationalNumber();
      const locationOfBirth = cardReader.GetLocationOfBirth();
      const imageFile = cardReader.GetPhotoFile();
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(imageFile))
      );
      const documentType = cardReader.GetData("document_type");
      result.data = {
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        dateOfBirth: dateOfBirth,
        street: street,
        zipcode: zipcode,
        city: city,
        country: country,
        nationalNumber: nationalNumber,
        locationOfBirth: locationOfBirth,
        imageFile: base64String,
        documentType: documentType,
      };
      result.status = "success";

      console.log("DATA: " + result);
      return result;
    } else {
      result.data = "No card detected";
      result.status = "failed";
      return result;
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
