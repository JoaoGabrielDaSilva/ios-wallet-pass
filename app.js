const { Template } = require("@walletpass/pass-js");
const fs = require("fs");

const init = async () => {
  const template = new Template("generic", {
    organizationName: "3035Tech",
    teamIdentifier: "7X74JSY374",
    passTypeIdentifier: "pass.com.3035tech",
    backgroundColor: "rgb(76, 22, 145)",
    labelColor: "#ffffff",
    foregroundColor: "#ffffff",
  });

  template.setPrivateKey(fs.readFileSync("passkey.pem"), "3035tech");
  await template.setCertificate(
    fs.readFileSync("passcertificate.pem"),
    "3035tech"
  );
  await template.images.load("./assets");

  const pass = template.createPass({
    serialNumber: "12312312",
    description: "3035Tech business card",
    barcodes: [
      {
        format: "PKBarcodeFormatQR",
        messageEncoding: "iso-8859-1",
        message: "https://www.3035tech.com",
        altText: "Adicionar à carteira",
      },
    ],
  });

  pass.primaryFields.add({ key: "name", label: "Nome", value: "João Gabriel" });

  pass.secondaryFields.add({
    key: "role",
    label: "Cargo",
    value: "Desenvolvedor Mobile",
  });

  const buf = await pass.asBuffer();

  fs.writeFileSync("pass.pkpass", buf);
};

init();
